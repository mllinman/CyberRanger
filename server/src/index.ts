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

dotenv.config()

const dev = process.env.NODE_ENV !== 'production'

// Path resolution logic
const potentialPaths = [
  path.join(__dirname, '../../client'), // Local structure (server/dist/ or server/src/)
  path.join(__dirname, '../client'),    // Flattened deployment structure (/app/dist/)
  '/app/client',                        // Absolute path in Railway container
  path.resolve(__dirname, '..', '..', 'client'), // Resolved path
]

console.log('🔍 Searching for client directory...')
potentialPaths.forEach(p => {
  console.log(`  Checking: ${p} - exists: ${fs.existsSync(p)}`)
})

const clientDir = potentialPaths.find(p => fs.existsSync(p)) || path.join(__dirname, '../../client')
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