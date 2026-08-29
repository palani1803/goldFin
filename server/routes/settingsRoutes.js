const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const {
  getSettings,
  updateSettings,
  changeAdminPassword,
} = require('../controllers/settingsController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// Optional auth helper to attach admin if token exists without hard-failing
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const secret = process.env.JWT_SECRET || 'goldfin_admin_jwt_secret_2026'
      const decoded = jwt.verify(token, secret)
      req.admin = await Admin.findById(decoded.id).select('-password')
    } catch {}
  }
  next()
}

// Settings routes
router.get('/', getSettings)
router.put('/', optionalAuth, updateSettings)
router.put('/password', protect, adminOnly, changeAdminPassword)

module.exports = router
