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
import scannerRoutes from './routes/scan'
import reconRoutes from './routes/recon'
import exploitRoutes from './routes/exploit'

dotenv.config()

const dev = process.env.NODE_ENV !== 'production'

// Deterministic Path Resolution
// In production (Railway), the app runs from /app/server/dist/index.js
// The .next folder is copied to /app/server/dist/.next by the build script.
const currentDir = __dirname
const clientDirProd = path.join(currentDir, '.next')
const clientDirDev = path.join(__dirname, '../../client') // Adjust if needed based on local structure

let clientDir = currentDir
if (dev) {
  clientDir = clientDirDev
  console.log(`🔧 [DEV] Using client directory: ${clientDir}`)
} else {
  // Production: Check if .next exists in current dir
  if (fs.existsSync(clientDirProd)) {
    clientDir = currentDir
    console.log(`✅ [PROD] Found .next in ${clientDir}`)
  } else {
    console.error(`❌ [PROD] CRITICAL: .next directory NOT found in ${currentDir}`)
    console.error('Contents of current directory:', fs.readdirSync(currentDir))
    // Fallback to current dir anyway to let Next try its own resolution or fail loudly
    clientDir = currentDir
  }
}

const nextApp = next({ dev, dir: clientDir })
const handle = nextApp.getRequestHandler()

const app = express()
const PORT = process.env.PORT || 8000

// Trust proxy for Railway/Load Balancers
app.set('trust proxy', 1)

// DEBUG: Log all requests
app.use((req, res, next) => {
  console.log(`📥 [${req.method}] ${req.url}`)
  next()
})

// Security middleware
app.use(helmet({
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))

// CORS configuration
app.use(cors({
  origin: true, // Allow all for now in this demo/tool context, simplify debugging
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Higher limit for scanner tool
  message: 'Too many requests from this IP.'
})
// Apply rate limiting to API routes EXCEPT health check
app.use('/api/', (req, res, next) => {
  if (req.path === '/health') return next()
  limiter(req, res, next)
})

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))

// Compression middleware
app.use(compression())

// Logging
app.use(morgan('dev'))

// Health check endpoint - MUST be defined first and respond immediately
// This endpoint must be accessible even if Next.js fails to prepare
app.get('/api/health', (req, res) => {
  console.log('💓 Health check ping received')
  res.status(200).json({
    status: 'OK',
    message: 'CyberRanger API is running',
    timestamp: new Date().toISOString()
  })
})

// Routes - API endpoints are registered before Next.js catch-all
app.use('/api/scan', scannerRoutes)
app.use('/api/recon', reconRoutes)
app.use('/api/exploit', exploitRoutes)

// Next.js handler for all remaining routes (non-API routes)
// This must come AFTER API routes to avoid intercepting them
app.all('*', (req, res) => {
  return handle(req, res)
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Middleware Error:', err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

const startServer = async () => {
  // Ensure PORT is an integer and fallback to 8000
  const portEnv = process.env.PORT
  const PORT = portEnv ? parseInt(portEnv, 10) : 8000

  console.log(`🔧 Starting server configuration...`)
  console.log(`   - PORT env: ${portEnv}`)
  console.log(`   - Selected PORT: ${PORT}`)
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`)

  // START SERVER IMMEDIATELY - don't wait for Next.js
  // This ensures health checks can connect and get a response right away
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CyberRanger Server listening exclusively on 0.0.0.0:${PORT}`)
    console.log(`✅ Health check endpoint ready at /api/health`)
    console.log(`⏳ Next.js preparation will continue in the background...`)
  })

  server.on('error', (err: any) => {
    console.error('❌ Server failed to start:', err)
    process.exit(1)
  })

  // Prepare Next.js AFTER server is listening
  // This allows health checks to pass immediately while Next.js prepares
  try {
    console.log('⏳ Preparing Next.js application...')
    await nextApp.prepare()
    console.log('✅ Next.js app prepared successfully - full site is now available')
  } catch (error) {
    console.error('❌ Next.js preparation error:', error)
    console.error('⚠️  Server will continue running with API-only functionality')
    // Don't exit - server can still handle API requests and health checks
  }
}

// Global error handlers
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason)
})

startServer()

export default app
