import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export interface AuthRequest extends NextApiRequest {
  user?: {
    userId: string
    email: string
    role: string
    subscriptionTier: string
    subscriptionStatus: string
  }
}

export const authenticateToken = async (req: AuthRequest, res: NextApiResponse, next: Function) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied',
      message: 'No token provided' 
    })
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    
    // Fetch fresh user data to get current subscription status
    const user = await User.findById(decoded.userId).select('-password')
    if (!user || !user.active) {
      return res.status(401).json({ 
        error: 'Access denied',
        message: 'User not found or inactive' 
      })
    }

    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      subscriptionTier: user.subscriptionTier,
      subscriptionStatus: user.subscriptionStatus
    }
    next()
  } catch (error) {
    return res.status(403).json({ 
      error: 'Invalid token',
      message: 'Token verification failed' 
    })
  }
}

export const requireSubscriptionTier = (minTier: 'free' | 'indy' | 'pro') => {
  const tierLevels = { free: 0, indy: 1, pro: 2 }
  
  return (req: AuthRequest, res: NextApiResponse, next: Function) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please authenticate first' 
      })
    }

    const userTierLevel = tierLevels[req.user.subscriptionTier as keyof typeof tierLevels] || 0
    const requiredTierLevel = tierLevels[minTier]

    if (userTierLevel < requiredTierLevel) {
      return res.status(403).json({ 
        error: 'Subscription upgrade required',
        message: `This feature requires ${minTier} tier or higher. Your current tier: ${req.user.subscriptionTier}`,
        currentTier: req.user.subscriptionTier,
        requiredTier: minTier
      })
    }

    // Check if subscription is active
    if (req.user.subscriptionStatus !== 'active') {
      return res.status(403).json({ 
        error: 'Subscription inactive',
        message: 'Your subscription is not active. Please update your payment method.',
        subscriptionStatus: req.user.subscriptionStatus
      })
    }

    next()
  }
}

// Check daily scan limits
export const checkScanLimits = async (req: AuthRequest, res: NextApiResponse, next: Function) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'Please authenticate first' 
    })
  }

  const { subscriptionTier } = req.user
  
  // Define scan limits per tier
  const scanLimits = {
    free: 3,
    indy: 50,
    pro: -1 // unlimited
  }

  const limit = scanLimits[subscriptionTier as keyof typeof scanLimits] || 0

  if (limit === -1) {
    // Unlimited for pro tier
    return next()
  }

  // Here you would check daily usage from a usage tracking system
  // For now, we'll just allow the request to continue
  // In a real implementation, you'd query a usage database/cache
  
  // TODO: Implement actual usage tracking
  // const todayUsage = await getUserDailyUsage(req.user.userId)
  // if (todayUsage >= limit) {
  //   return res.status(429).json({
  //     error: 'Daily limit exceeded',
  //     message: `You have exceeded your daily scan limit of ${limit} scans.`,
  //     currentUsage: todayUsage,
  //     limit: limit,
  //     resetTime: 'midnight UTC'
  //   })
  // }

  next()
}