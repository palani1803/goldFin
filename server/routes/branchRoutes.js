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
router.route('/')
  .get(getAllBranches)
  .post(protect, adminOnly, createBranch)

router.post('/seed', seedBranches)

router.route('/:id')
  .get(getBranchById)
  .put(protect, adminOnly, updateBranch)
  .delete(protect, adminOnly, deleteBranch)

module.exports = router
