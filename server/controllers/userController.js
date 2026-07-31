const User = require('../models/User')

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400)
      throw new Error('User with this email already exists')
    }

    // NOTE: In production, hash the password with bcrypt before saving
    const user = await User.create({ name, email, password })

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all users
// @route   GET /api/users
// @access  Public (should be protected in production)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: users.length, data: users })
  } catch (error) {
    next(error)
  }
}

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Public (should be protected in production)
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerUser,
  getUsers,
  getUserById,
}
