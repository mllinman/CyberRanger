import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../models/User'
import { authenticateToken } from '../middleware/auth'

interface AuthRequest extends express.Request {
  user?: any
}

const router = express.Router()

// Admin configuration - centralized to avoid duplication
const getAdminConfig = () => ({
  email: process.env.ADMIN_EMAIL || 'admin@cyberstore.local',
  password: process.env.ADMIN_PASSWORD || 'Detroit1977!!'
})

// Timing-safe string comparison to prevent timing attacks
const timingSafeStringCompare = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a, 'utf8')
  const bufB = Buffer.from(b, 'utf8')
  
  // Pad shorter buffer to match length for constant-time comparison
  const maxLength = Math.max(bufA.length, bufB.length)
  const paddedA = Buffer.alloc(maxLength, 0)
  const paddedB = Buffer.alloc(maxLength, 0)
  bufA.copy(paddedA)
  bufB.copy(paddedB)
  
  // Perform timing-safe comparison and also check original lengths match
  return crypto.timingSafeEqual(paddedA, paddedB) && bufA.length === bufB.length
}

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email, password, firstName, and lastName are required'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
        message: 'An account with this email already exists'
      })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      role: 'customer',
      subscriptionTier: 'free',
      subscriptionStatus: 'active'
    })

    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      error: 'Registration failed',
      message: 'Internal server error'
    })
  }
})

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing credentials',
        message: 'Email and password are required'
      })
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      })
    }

    // Check if account is active
    if (!user.active) {
      return res.status(401).json({
        error: 'Account disabled',
        message: 'Your account has been disabled'
      })
    }

    // Get admin configuration
    const adminConfig = getAdminConfig()
    const isAdminEmail = email.toLowerCase() === adminConfig.email.toLowerCase()

    // For admin users, verify password against the environment variable
    // This ensures admin can always log in with the configured ADMIN_PASSWORD
    if (isAdminEmail) {
      // Admin must have admin role
      if (user.role !== 'admin') {
        return res.status(401).json({
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        })
      }

      // Verify admin password against environment variable using timing-safe comparison
      if (!timingSafeStringCompare(password, adminConfig.password)) {
        return res.status(401).json({
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        })
      }
    } else {
      // For regular users, verify password using bcrypt against database hash
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Invalid credentials',
          message: 'Email or password is incorrect'
        })
      }
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Login failed',
      message: 'Internal server error'
    })
  }
})

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password')
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile not found'
      })
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({
      error: 'Failed to fetch profile',
      message: 'Internal server error'
    })
  }
})

// Update user profile
router.put('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'address', 'dateOfBirth']
    const updates: any = {}
    
    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key]
      }
    })

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile not found'
      })
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({
      error: 'Failed to update profile',
      message: 'Internal server error'
    })
  }
})

// Change password
router.put('/change-password', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Missing passwords',
        message: 'Current password and new password are required'
      })
    }

    const user = await User.findById(req.user.userId).select('+password')
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User not found'
      })
    }

    // Prevent admin user from changing password through API
    const adminConfig = getAdminConfig()
    if (user.email.toLowerCase() === adminConfig.email.toLowerCase()) {
      return res.status(403).json({
        error: 'Operation not permitted',
        message: 'Admin password cannot be changed through this endpoint. Please update the ADMIN_PASSWORD environment variable.'
      })
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid password',
        message: 'Current password is incorrect'
      })
    }

    // Hash new password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
    
    user.password = hashedPassword
    await user.save()

    res.json({
      success: true,
      message: 'Password changed successfully'
    })
  } catch (error) {
    console.error('Password change error:', error)
    res.status(500).json({
      error: 'Failed to change password',
      message: 'Internal server error'
    })
  }
})

// OAuth login/register
router.post('/oauth-login', async (req, res) => {
  try {
    const { provider, providerId, email, name, avatar } = req.body

    if (!provider || !providerId || !email) {
      return res.status(400).json({
        error: 'Missing OAuth data',
        message: 'Provider, provider ID, and email are required'
      })
    }

    // Parse name
    const [firstName = '', lastName = ''] = (name || '').split(' ')

    // Check if user exists by provider ID
    let user = await User.findOne({
      $or: [
        { googleId: provider === 'google' ? providerId : undefined },
        { githubId: provider === 'github' ? providerId : undefined },
        { email: email.toLowerCase() }
      ]
    })

    if (user) {
      // Update OAuth ID if not set
      if (provider === 'google' && !user.googleId) {
        user.googleId = providerId
      } else if (provider === 'github' && !user.githubId) {
        user.githubId = providerId
      }
      
      // Update avatar and last login
      if (avatar) user.avatar = avatar
      user.lastLogin = new Date()
      await user.save()
    } else {
      // Create new user
      user = new User({
        email: email.toLowerCase(),
        firstName: firstName || 'User',
        lastName: lastName || '',
        role: 'customer',
        subscriptionTier: 'free',
        subscriptionStatus: 'active',
        avatar,
        googleId: provider === 'google' ? providerId : undefined,
        githubId: provider === 'github' ? providerId : undefined,
        lastLogin: new Date()
      })
      await user.save()
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role,
        subscriptionTier: user.subscriptionTier
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      message: 'OAuth login successful',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        subscriptionTier: user.subscriptionTier,
        subscriptionStatus: user.subscriptionStatus,
        avatar: user.avatar
      },
      token
    })
  } catch (error) {
    console.error('OAuth login error:', error)
    res.status(500).json({
      error: 'OAuth login failed',
      message: 'Internal server error'
    })
  }
})

export default router