import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role: 'customer' | 'admin'
  active: boolean
  // Subscription fields
  subscriptionTier: 'free' | 'indy' | 'pro'
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'past_due'
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  subscriptionStartDate?: Date
  subscriptionEndDate?: Date
  // OAuth fields
  googleId?: string
  githubId?: string
  avatar?: string
  // Existing fields
  address?: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  dateOfBirth?: Date
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: function() {
      // Password is required only if no OAuth IDs are present
      return !this.googleId && !this.githubId
    },
    minlength: 6,
    select: false // Don't include password in queries by default
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  active: {
    type: Boolean,
    default: true
  },
  // Subscription fields
  subscriptionTier: {
    type: String,
    enum: ['free', 'indy', 'pro'],
    default: 'free'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'past_due'],
    default: 'active'
  },
  stripeCustomerId: {
    type: String,
    unique: true,
    sparse: true
  },
  stripeSubscriptionId: {
    type: String,
    unique: true,
    sparse: true
  },
  subscriptionStartDate: {
    type: Date,
    default: Date.now
  },
  subscriptionEndDate: {
    type: Date
  },
  // OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  avatar: {
    type: String
  },
  // Existing fields
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  dateOfBirth: {
    type: Date
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

// Indexes
UserSchema.index({ email: 1 })
UserSchema.index({ role: 1, active: 1 })

export default mongoose.model<IUser>('User', UserSchema)