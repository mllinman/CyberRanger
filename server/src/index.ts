import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import next from 'next'
import path from 'path'
import fs from 'fs'

// Import routes
import productRoutes from './routes/products'
import authRoutes from './routes/auth'
import orderRoutes from './routes/orders'
import paymentRoutes from './routes/payments'
import userRoutes from './routes/users'
import fileRoutes from './routes/files'
import logRoutes from './routes/logs'

dotenv.config()

const dev = process.env.NODE_ENV !== 'production'

// Path resolution logic
// In Railway deployments, the directory structure can vary:
// - Build creates .next at /app/server/dist/.next
// - Runtime might access it from /app/dist/.next (if Railway maps server to /app)
// - Or from current working directory
const potentialPaths = [
  __dirname,                             // dist directory itself (e.g., /app/dist or /app/server/dist)
  process.cwd(),                         // Current working directory
  path.join(process.cwd(), 'dist'),      // dist relative to cwd
  path.join(__dirname, '..'),            // Parent of dist (e.g., /app or /app/server)
  path.join(__dirname, '../..'),         // Grandparent of dist (e.g., / or /app)
  path.join(__dirname, '../../client'),  // Client directory in local dev
  path.join(__dirname, '../client'),     // Client directory if flattened
  '/app/dist',                           // Absolute Railway dist path (when directory is flattened)
  '/app',                                // Absolute Railway path
  '/app/server',                         // Absolute server path  
  '/app/server/dist',                    // Absolute dist path
  path.resolve(__dirname, '..', '..', 'client'), // Resolved client path
]

console.log('🔍 Searching for client directory...')
console.log(`  __dirname: ${__dirname}`)
console.log(`  process.cwd(): ${process.cwd()}`)
console.log(`  NODE_ENV: ${process.env.NODE_ENV}`)
potentialPaths.forEach(p => {
  const hasNextBuild = fs.existsSync(path.join(p, '.next'))
  console.log(`  Checking: ${p} - exists: ${fs.existsSync(p)}, has .next: ${hasNextBuild}`)
})

// Find a directory that either has .next (production) or is a valid Next.js project (dev)
const clientDir = potentialPaths.find(p => {
  if (!fs.existsSync(p)) return false
  // In production, check for .next directory
  if (!dev && fs.existsSync(path.join(p, '.next'))) return true
  // In dev mode, check for package.json with Next.js
  if (dev) {
    const pkgPath = path.join(p, 'package.json')
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
        return pkg.dependencies?.next || pkg.devDependencies?.next
      } catch {
        return false
      }
    }
  }
  return false
})

if (!clientDir) {
  console.error('❌ Could not find .next build directory!')
  console.error('Searched paths:', potentialPaths)
  throw new Error('Next.js build not found. Please ensure the client is built before starting the server.')
}

console.log(`✅ Selected client dir: ${clientDir}`)
const nextApp = next({ dev, dir: clientDir })
const handle = nextApp.getRequestHandler()

const app = express()
const PORT = process.env.PORT || 8000

// Security middleware
app.use(helmet())

// CORS configuration - Allow multiple origins for deployment
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://*.railway.app',
  'https://*.up.railway.app'
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true)

    // Check if origin is in allowed list or matches Railway pattern
    if (allowedOrigins.some(allowed =>
      allowed && (allowed === origin ||
        (allowed.includes('*') && origin.includes('railway.app')))
    )) {
      callback(null, true)
    } else {
      console.warn(`CORS blocked origin: ${origin}`)
      callback(null, true) // Allow all origins for now, can be stricter in production
    }
  },
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware
app.use(compression())

// Logging middleware
app.use(morgan('combined'))

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI

    if (!mongoURI) {
      console.warn('⚠️  MONGODB_URI not configured - running without database')
      return false
    }

    await mongoose.connect(mongoURI)
    console.log('✅ MongoDB connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection error:', error)
    console.warn('⚠️  Continuing without database connection')
    return false
  }
}

// Routes
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/logs', logRoutes)

// Root endpoint handled by Next.js
// app.get('/', (req, res) => { ... })

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  res.status(200).json({
    status: 'OK',
    message: 'CyberStore API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
    stripe: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured'
  })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

// Next.js request handler for all non-API routes
app.all('*', (req, res) => {
  return handle(req, res)
})

const startServer = async () => {
  try {
    const dbConnected = await connectDB()

    console.log('----------------------------------------')
    console.log('🔍 Debugging Paths:')
    console.log(`Current __dirname: ${__dirname}`)
    console.log(`Computed client dir: ${clientDir}`)
    console.log(`Checking if client dir exists: ${fs.existsSync(clientDir)}`)
    console.log(`Checking if .next exists: ${fs.existsSync(path.join(clientDir, '.next'))}`)

    // List what's actually in /app
    console.log('\n=== RUNTIME: /app contents ===')
    if (fs.existsSync('/app')) {
      console.log(fs.readdirSync('/app'))
    } else {
      console.log('/app does not exist!')
    }

    // List what's in current directory
    console.log('\n=== RUNTIME: Current directory contents ===')
    console.log(`CWD: ${process.cwd()}`)
    console.log(fs.readdirSync(process.cwd()))
    // Check files in the resolved client directory
    if (fs.existsSync(clientDir)) {
      console.log('Contents of client dir:', fs.readdirSync(clientDir))
    }
    console.log('----------------------------------------')

    await nextApp.prepare()
    console.log('✅ Next.js app prepared')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📱 API Health: http://localhost:${PORT}/api/health`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
      if (dbConnected) {
        console.log(`💾 Database: Connected`)
      } else {
        console.log(`⚠️  Database: Not connected`)
      }
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app