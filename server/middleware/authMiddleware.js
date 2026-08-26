const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// Protect routes — verify JWT token
const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const secret = process.env.JWT_SECRET || 'goldfin_admin_jwt_secret_2026'
      const decoded = jwt.verify(token, secret)

      // Attach admin to request (exclude password)
      req.admin = await Admin.findById(decoded.id).select('-password')

      if (!req.admin) {
        res.status(401)
        throw new Error('Admin account not found')
      }

      next()
    } catch (error) {
      console.error('⚠️ [Auth Middleware Error]:', error.message)
      res.status(401)
      next(new Error('Not authorized, token failed'))
    }
  } else {
    res.status(401)
    next(new Error('Not authorized, no token provided'))
  }
}

// Admin role check
const adminOnly = (req, res, next) => {
  if (req.admin && (req.admin.role === 'admin' || req.admin.role === 'superadmin')) {
    next()
  } else {
    res.status(403)
    next(new Error('Not authorized as admin'))
  }
}

module.exports = { protect, adminOnly }
