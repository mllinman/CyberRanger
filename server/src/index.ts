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

dotenv.config()

const dev = process.env.NODE_ENV !== 'production'

// Path resolution logic
const potentialPaths = [
  __dirname,                             // dist directory itself (e.g., /app/server/dist)
  process.cwd(),                         // Current working directory (/app)
  path.join(process.cwd(), 'dist'),      // dist relative to cwd
  path.join(__dirname, '..'),            // Parent of dist (e.g., /app/server)
  path.join(__dirname, '../..'),         // Grandparent of dist (e.g., /app)
  path.join(__dirname, '../../client'),  // Client directory in local dev
  path.join(__dirname, '../client'),     // Client directory if flattened
  '/app/dist',                           // Legacy: Absolute Railway dist path
  '/app',                                // Absolute Railway path
  '/app/server',                         // Absolute server path  
  '/app/server/dist',                    // Absolute dist path
  path.resolve(__dirname, '..', '..', 'client'), // Resolved client path for local dev
]

console.log('🔍 Searching for client directory...')
let clientDir: string | undefined = potentialPaths.find(p => {
  if (!fs.existsSync(p)) return false
  if (!dev && fs.existsSync(path.join(p, '.next'))) return true
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
  console.warn('⚠️  Could not find .next build directory! UI may fail to load.')
  clientDir = potentialPaths.length > 0 ? potentialPaths[0] : process.cwd()
}

console.log(`✅ Selected client dir: ${clientDir}`)
const nextApp = next({ dev, dir: clientDir })
const handle = nextApp.getRequestHandler()

const app = express()
const PORT = process.env.PORT || 8000

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
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))

// Compression middleware
app.use(compression())

// Logging
app.use(morgan('dev'))

// Routes
app.use('/api/scan', scannerRoutes)

// Health check endpoint - Log access
app.get('/api/health', (req, res) => {
  console.log('💓 Health check ping received')
  res.status(200).json({
    status: 'OK',
    message: 'CyberRanger API is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Middleware Error:', err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

// Next.js request handler
app.all('*', (req, res) => {
  return handle(req, res)
})

const startServer = async () => {
  // Ensure PORT is an integer and fallback to 8000
  const portEnv = process.env.PORT
  const PORT = portEnv ? parseInt(portEnv, 10) : 8000

  console.log(`🔧 Starting server configuration...`)
  console.log(`   - PORT env: ${portEnv}`)
  console.log(`   - Selected PORT: ${PORT}`)
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV}`)

  try {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 CyberRanger Server listening exclusively on 0.0.0.0:${PORT}`)
    })

    server.on('error', (err: any) => {
      console.error('❌ Server failed to start:', err)
      process.exit(1)
    })

    console.log('⏳ Preparing Next.js application...')
    await nextApp.prepare()
    console.log('✅ Next.js app prepared successfully')
  } catch (error) {
    console.error('❌ Critical startup error:', error)
    // Don't exit here, so the express server might still serve the health check
    // if the error was just Next.js related
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
