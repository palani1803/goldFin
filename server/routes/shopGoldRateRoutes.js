const express = require('express')
const router = express.Router()
const {
  getAllShopRates,
  getShopRateByPurity,
  updateShopRate,
  seedShopRates,
} = require('../controllers/shopGoldRateController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// Public & Admin routes
router.route('/').get(getAllShopRates)
router.post('/seed', seedShopRates)
router.route('/:purityId').get(getShopRateByPurity)
router.put('/:purityId', updateShopRate)

module.exports = router
