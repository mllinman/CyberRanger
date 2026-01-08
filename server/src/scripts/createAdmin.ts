import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User'

dotenv.config()

const createAdminUser = async () => {
  try {
    // Connect to database
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cyberstore'
    await mongoose.connect(mongoURI)
    console.log('✅ Connected to MongoDB')

    // Admin credentials
    const adminEmail = 'admin'
    const adminPassword = 'Detroit1977!!'

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists')
      console.log(`Email: ${existingAdmin.email}`)
      console.log(`Role: ${existingAdmin.role}`)
      
      // Update password if different
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(adminPassword, saltRounds)
      existingAdmin.password = hashedPassword
      existingAdmin.role = 'admin'
      existingAdmin.active = true
      await existingAdmin.save()
      console.log('✅ Admin user updated with new password')
    } else {
      // Hash password
      const saltRounds = 12
      const hashedPassword = await bcrypt.hash(adminPassword, saltRounds)

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

    console.log('\n=== Admin Credentials ===')
    console.log('Email: admin')
    console.log('Password: Detroit1977!!')
    console.log('Role: admin')
    console.log('Full privileges: enabled')
    console.log('========================\n')

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
