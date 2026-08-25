const express = require('express')
const router = express.Router()
const {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  seedBranches,
} = require('../controllers/branchController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// Public routes
router.route('/').get(getAllBranches)
router.post('/seed', seedBranches)
router.route('/:id').get(getBranchById)

// Protected routes (admin only)
router.post('/', protect, adminOnly, createBranch)
router.put('/:id', protect, adminOnly, updateBranch)
router.delete('/:id', protect, adminOnly, deleteBranch)

module.exports = router
