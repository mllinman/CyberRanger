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
// In Railway deployments, the directory structure is:
// - Build phase: /app/client/.next is created and copied to /app/server/dist/.next
// - Runtime: Application runs from /app with `node server/dist/index.js`
// - This means __dirname = /app/server/dist and process.cwd() = /app
const potentialPaths = [
  __dirname,                             // dist directory itself (e.g., /app/server/dist)
  process.cwd(),                         // Current working directory (/app)
  path.join(process.cwd(), 'dist'),      // dist relative to cwd
  path.join(__dirname, '..'),            // Parent of dist (e.g., /app/server)
  path.join(__dirname, '../..'),         // Grandparent of dist (e.g., /app)
  path.join(__dirname, '../../client'),  // Client directory in local dev
  path.join(__dirname, '../client'),     // Client directory if flattened
  '/app/dist',                           // Legacy: Absolute Railway dist path (if structure changes)
  '/app',                                // Absolute Railway path
  '/app/server',                         // Absolute server path  
  '/app/server/dist',                    // Absolute dist path (should match __dirname)
  path.resolve(__dirname, '..', '..', 'client'), // Resolved client path for local dev
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
let clientDir: string | undefined = potentialPaths.find(p => {
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
  console.warn('⚠️  Server will start but Next.js features will not be available')
  // Don't throw an error - let the server start anyway for healthchecks
  clientDir = potentialPaths[0] // Use a fallback
}

console.log(`✅ Selected client dir: ${clientDir}`)
const nextApp = next({ dev, dir: clientDir })
const handle = nextApp.getRequestHandler()

const app = express()
const PORT = process.env.PORT || 8000

// Application readiness flag
let isReady = false
let dbConnected = false

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

// Health check endpoint - responds immediately even during initialization
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  
  // Always return 200 OK so Railway knows the server is up
  // Include ready state for monitoring purposes
  res.status(200).json({
    status: 'OK',
    ready: isReady,
    message: isReady ? 'CyberStore API is running' : 'CyberStore API is starting up',
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

// Readiness check middleware for non-API routes
// This ensures Next.js routes wait until the app is fully initialized
app.use((req, res, next) => {
  // Skip readiness check for health endpoint and API routes
  if (req.path.startsWith('/api/')) {
    return next()
  }
  
  // If not ready, return a service unavailable response for Next.js routes
  if (!isReady) {
    return res.status(503).json({
      error: 'Service Unavailable',
      message: 'Application is still initializing. Please try again in a moment.',
      ready: false
    })
  }
  
  next()
})

// Next.js request handler for all non-API routes
app.all('*', (req, res) => {
  return handle(req, res)
})

const startServer = async () => {
  // Start HTTP server immediately so healthcheck endpoint responds
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`)
    console.log(`📱 Health check available at: http://localhost:${PORT}/api/health`)
    console.log(`⏳ Initializing application...`)
  })

  try {
    // Connect to database (async, non-blocking)
    dbConnected = await connectDB()

    console.log('----------------------------------------')
    console.log('🔍 Debugging Paths:')
    console.log(`Current __dirname: ${__dirname}`)
    console.log(`Computed client dir: ${clientDir}`)
    console.log(`Checking if client dir exists: ${fs.existsSync(clientDir)}`)
    console.log(`Checking if .next exists: ${fs.existsSync(path.join(clientDir, '.next'))}`)

    // Check for build marker
    console.log('\n=== BUILD MARKER CHECK ===')
    const markerPath = path.join(__dirname, '.next', 'BUILD_MARKER.txt')
    if (fs.existsSync(markerPath)) {
      console.log('✓ BUILD_MARKER found! This confirms .next directory was built and copied successfully.')
      console.log('Marker contents:')
      console.log(fs.readFileSync(markerPath, 'utf-8'))
    } else {
      console.log('✗ BUILD_MARKER not found at:', markerPath)
      console.log('This indicates either:')
      console.log('  1. The build process did not complete successfully')
      console.log('  2. The .next directory was not copied to the runtime environment')
      console.log('  3. The directory structure is different than expected')
    }

    // Check __dirname contents
    console.log('\n=== RUNTIME: __dirname contents ===')
    console.log(`__dirname: ${__dirname}`)
    if (fs.existsSync(__dirname)) {
      const files = fs.readdirSync(__dirname)
      console.log('Files in __dirname:', files)
      if (files.includes('.next')) {
        console.log('✓ .next found in __dirname!')
      } else {
        console.log('✗ .next NOT found in __dirname')
      }
    }

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
      console.log('\n=== RUNTIME: Client dir contents ===')
      console.log('Contents of client dir:', fs.readdirSync(clientDir))
    }
    console.log('----------------------------------------')

    // Prepare Next.js (this can take time, but server is already responding to health checks)
    console.log('⏳ Preparing Next.js application...')
    await nextApp.prepare()
    console.log('✅ Next.js app prepared')

    // Mark application as fully ready
    isReady = true
    
    console.log('')
    console.log('========================================')
    console.log('✅ Application is fully initialized and ready!')
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
    if (dbConnected) {
      console.log(`💾 Database: Connected`)
    } else {
      console.log(`⚠️  Database: Not connected`)
    }
    console.log('========================================')
  } catch (error) {
    console.error('Failed to initialize application:', error)
    console.error('Server will remain running but may not function properly')
    // Don't exit - keep the server running for health checks
    // This allows Railway to detect the issue without constant restarts
  }
}

startServer()

export default app