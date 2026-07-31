const express = require('express')
const router = express.Router()
const {
  getAllRates,
  getRateByPurity,
  createRate,
  updateRate,
  deleteRate,
  seedRates,
} = require('../controllers/goldRateController')

// Seed route (place before :purityId to avoid conflict)
router.post('/seed', seedRates)

// CRUD routes
router.route('/').get(getAllRates).post(createRate)
router.route('/:purityId').get(getRateByPurity).put(updateRate).delete(deleteRate)

module.exports = router
