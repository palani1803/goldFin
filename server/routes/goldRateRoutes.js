const express = require('express')
const router = express.Router()
const {
  getAllRates,
  getHistory,
  getRateByPurity,
  createRate,
  updateRate,
  deleteRate,
  seedRates,
  refreshRates,
} = require('../controllers/goldRateController')

// Seed route (place before :purityId to avoid conflict)
router.post('/seed', seedRates)

// Historical price data for charts
router.get('/history', getHistory)

// Manual refresh from live API
router.post('/refresh', refreshRates)

// CRUD routes
router.route('/').get(getAllRates).post(createRate)
router.route('/:purityId').get(getRateByPurity).put(updateRate).delete(deleteRate)

module.exports = router
