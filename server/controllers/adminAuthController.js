const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'goldfin_admin_jwt_secret_2026', {
    expiresIn: '7d',
  })
}

// Auto-seed default admin into database on server start
const seedDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      $or: [
        { email: 'admin@mahesbankers.com' },
        { email: 'admin@maheshbankers.com' },
        { email: 'admin@goldfin.com' },
      ]
    }).select('+password')

    if (!existingAdmin) {
      const createdAdmin = await Admin.create({
        name: 'Mahes Bankers Admin',
        email: 'admin@mahesbankers.com',
        password: 'admin123',
        role: 'admin',
      })
      console.log(`👤 [DB] Default Admin account saved to database: ${createdAdmin.email} / admin123`)
    } else {
      if (existingAdmin.name === 'Mahesh Bankers Admin') {
        existingAdmin.name = 'Mahes Bankers Admin'
        existingAdmin.email = 'admin@mahesbankers.com'
        await existingAdmin.save()
      }
      console.log(`👤 [DB] Admin account verified in database: ${existingAdmin.email}`)
    }
  } catch (error) {
    console.error('⚠️ [DB] Error seeding default admin:', error.message)
  }
}

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
      throw new Error('Please provide email and password')
    }

    const cleanEmail = email.trim().toLowerCase()

    // Find admin and include password for comparison
    let admin = await Admin.findOne({ email: cleanEmail }).select('+password')

    // If default demo admin does not exist in DB yet, create and save it now
    if (!admin && (cleanEmail === 'admin@mahesbankers.com' || cleanEmail === 'admin@maheshbankers.com' || cleanEmail === 'admin@goldfin.com')) {
      admin = await Admin.create({
        name: 'Mahes Bankers Admin',
        email: cleanEmail,
        password: password || 'admin123',
        role: 'admin',
      })
      admin = await Admin.findOne({ email: cleanEmail }).select('+password')
    }

    if (!admin) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    let isMatch = await admin.matchPassword(password)

    if (!isMatch) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get current admin profile
// @route   GET /api/admin/me
// @access  Private (admin)
const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id)

    if (!admin) {
      res.status(404)
      throw new Error('Admin not found')
    }

    res.status(200).json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Seed default admin account
// @route   POST /api/admin/seed
// @access  Public (should be disabled in production)
const seedAdmin = async (req, res, next) => {
  try {
    const SiteSettings = require('../models/SiteSettings')
    let existingAdmin = await Admin.findOne({
      $or: [
        { email: 'admin@mahesbankers.com' },
        { email: 'admin@maheshbankers.com' },
        { email: 'admin@goldfin.com' },
      ]
    })

    if (existingAdmin) {
      existingAdmin.password = 'admin123'
      existingAdmin.name = 'Mahes Bankers Admin'
      existingAdmin.email = 'admin@mahesbankers.com'
      await existingAdmin.save()
      await SiteSettings.findOneAndUpdate(
        {},
        { $set: { demoAdminPassword: 'admin123', demoAdminEmail: 'admin@mahesbankers.com' } }
      )
      return res.status(200).json({
        success: true,
        message: 'Default admin account refreshed in database',
        data: {
          email: existingAdmin.email,
          name: existingAdmin.name,
          defaultPassword: 'admin123',
        },
      })
    }

    const admin = await Admin.create({
      name: 'Mahes Bankers Admin',
      email: 'admin@mahesbankers.com',
      password: 'admin123',
      role: 'admin',
    })

    res.status(201).json({
      success: true,
      message: 'Default admin account created and saved in database successfully',
      data: {
        email: admin.email,
        name: admin.name,
        defaultPassword: 'admin123',
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  adminLogin,
  getAdminProfile,
  seedAdmin,
  seedDefaultAdmin,
}

