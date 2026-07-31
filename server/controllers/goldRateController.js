const GoldRate = require('../models/GoldRate')

// @desc    Get all gold/silver rates
// @route   GET /api/gold-rates
// @access  Public
const getAllRates = async (req, res, next) => {
  try {
    const rates = await GoldRate.find({}).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: rates.length, data: rates })
  } catch (error) {
    next(error)
  }
}

// @desc    Get rate by purity ID (e.g. "24k", "22k", "silver")
// @route   GET /api/gold-rates/:purityId
// @access  Public
const getRateByPurity = async (req, res, next) => {
  try {
    const rate = await GoldRate.findOne({ purityId: req.params.purityId })

    if (!rate) {
      res.status(404)
      throw new Error(`Rate not found for purity: ${req.params.purityId}`)
    }

    res.status(200).json({ success: true, data: rate })
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new rate entry
// @route   POST /api/gold-rates
// @access  Public
const createRate = async (req, res, next) => {
  try {
    const { purityId, name, karat, pricePerGram, unit, changePercent, isUp } = req.body

    const existingRate = await GoldRate.findOne({ purityId })
    if (existingRate) {
      res.status(400)
      throw new Error(`Rate with purity ID "${purityId}" already exists`)
    }

    const rate = await GoldRate.create({
      purityId,
      name,
      karat,
      pricePerGram,
      unit,
      changePercent,
      isUp,
    })

    res.status(201).json({ success: true, data: rate })
  } catch (error) {
    next(error)
  }
}

// @desc    Update an existing rate
// @route   PUT /api/gold-rates/:purityId
// @access  Public
const updateRate = async (req, res, next) => {
  try {
    const rate = await GoldRate.findOneAndUpdate(
      { purityId: req.params.purityId },
      req.body,
      { new: true, runValidators: true }
    )

    if (!rate) {
      res.status(404)
      throw new Error(`Rate not found for purity: ${req.params.purityId}`)
    }

    res.status(200).json({ success: true, data: rate })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a rate
// @route   DELETE /api/gold-rates/:purityId
// @access  Public
const deleteRate = async (req, res, next) => {
  try {
    const rate = await GoldRate.findOneAndDelete({ purityId: req.params.purityId })

    if (!rate) {
      res.status(404)
      throw new Error(`Rate not found for purity: ${req.params.purityId}`)
    }

    res.status(200).json({ success: true, message: 'Rate deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// @desc    Seed initial gold/silver rates (matches frontend hardcoded data)
// @route   POST /api/gold-rates/seed
// @access  Public
const seedRates = async (req, res, next) => {
  try {
    const seedData = [
      {
        purityId: '24k',
        name: 'GOLD 24K',
        karat: '24K (99.9% Pure)',
        pricePerGram: 6245,
        unit: 'per gram',
        changePercent: 0.45,
        isUp: true,
      },
      {
        purityId: '22k',
        name: 'GOLD 22K',
        karat: '22K (91.6% Pure)',
        pricePerGram: 5720,
        unit: 'per gram',
        changePercent: -0.12,
        isUp: false,
      },
      {
        purityId: '18k',
        name: 'GOLD 18K',
        karat: '18K (75.0% Pure)',
        pricePerGram: 4680,
        unit: 'per gram',
        changePercent: 0.28,
        isUp: true,
      },
      {
        purityId: 'silver',
        name: 'SILVER 999',
        karat: '99.9% Fine Silver',
        pricePerGram: 74.5,
        unit: 'per gram',
        changePercent: 1.10,
        isUp: true,
      },
    ]

    // Clear existing and insert fresh seed data
    await GoldRate.deleteMany({})
    const rates = await GoldRate.insertMany(seedData)

    res.status(201).json({
      success: true,
      message: 'Database seeded successfully',
      count: rates.length,
      data: rates,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllRates,
  getRateByPurity,
  createRate,
  updateRate,
  deleteRate,
  seedRates,
}
