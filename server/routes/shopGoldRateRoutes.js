const express = require('express')
const router = express.Router()
const {
  getAllShopRates,
  getShopRateByPurity,
  updateShopRate,
  syncShopRatesWithMarket,
  seedShopRates,
} = require('../controllers/shopGoldRateController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

// Public & Admin routes
router.route('/').get(getAllShopRates)
router.post('/seed', seedShopRates)
router.post('/sync-75', syncShopRatesWithMarket)
router.route('/:purityId').get(getShopRateByPurity)
router.put('/:purityId', updateShopRate)

module.exports = router
