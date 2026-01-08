import mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import User from '../models/User'

dotenv.config()

// Constants
const SALT_ROUNDS = 12

const createAdminUser = async () => {
  try {
    // Connect to database
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cyberstore'
    await mongoose.connect(mongoURI)
    console.log('✅ Connected to MongoDB')

    // Admin credentials - use environment variables or defaults
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cyberstore.local'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Detroit1977!!'

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail }).select('+password')
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists')
      console.log(`Email: ${existingAdmin.email}`)
      console.log(`Role: ${existingAdmin.role}`)
      
      // Update role and status to ensure admin privileges
      const hashedPassword = await bcrypt.hash(adminPassword, SALT_ROUNDS)
      existingAdmin.password = hashedPassword
      existingAdmin.role = 'admin'
      existingAdmin.active = true
      existingAdmin.subscriptionTier = 'pro'
      existingAdmin.subscriptionStatus = 'active'
      await existingAdmin.save()
      console.log('✅ Admin user updated with admin privileges')
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(adminPassword, SALT_ROUNDS)

      // Create admin user
      const adminUser = new User({
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        subscriptionTier: 'pro', // Full access
        subscriptionStatus: 'active',
        active: true
      })

      await adminUser.save()
      console.log('✅ Admin user created successfully')
    }

    console.log('\n=== Admin User Created ===')
    console.log(`Email: ${adminEmail}`)
    console.log('Password: [CONFIGURED]')
    console.log('Role: admin')
    console.log('Full privileges: enabled')
    console.log('=========================\n')

    // Disconnect from database
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
