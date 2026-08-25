const express = require('express')
const router = express.Router()
const {
  adminLogin,
  getAdminProfile,
  seedAdmin,
} = require('../controllers/adminAuthController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// Public routes
router.post('/login', adminLogin)
router.post('/seed', seedAdmin)

// Protected routes
router.get('/me', protect, adminOnly, getAdminProfile)

module.exports = router
