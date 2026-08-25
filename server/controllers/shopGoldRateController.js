const ShopGoldRate = require('../models/ShopGoldRate')

// @desc    Get all shop gold rates
// @route   GET /api/shop-rates
// @access  Public
const getAllShopRates = async (req, res, next) => {
  try {
    const rates = await ShopGoldRate.find({}).sort({ purityId: 1 })
    res.status(200).json({ success: true, count: rates.length, data: rates })
  } catch (error) {
    next(error)
  }
}

// @desc    Get a single shop rate by purityId
// @route   GET /api/shop-rates/:purityId
// @access  Public
const getShopRateByPurity = async (req, res, next) => {
  try {
    const rate = await ShopGoldRate.findOne({ purityId: req.params.purityId })

    if (!rate) {
      res.status(404)
      throw new Error(`Shop rate not found for purity: ${req.params.purityId}`)
    }

    res.status(200).json({ success: true, data: rate })
  } catch (error) {
    next(error)
  }
}

// @desc    Update a shop gold rate
// @route   PUT /api/shop-rates/:purityId
// @access  Public / Admin
const updateShopRate = async (req, res, next) => {
  try {
    const { pricePerGram } = req.body

    if (pricePerGram === undefined || pricePerGram === null) {
      res.status(400)
      throw new Error('Please provide pricePerGram')
    }

    const rate = await ShopGoldRate.findOneAndUpdate(
      { purityId: req.params.purityId },
      {
        pricePerGram: Number(pricePerGram),
        updatedBy: req.admin?._id || null,
      },
      { new: true, runValidators: true, upsert: true }
    )

    if (!rate) {
      res.status(404)
      throw new Error(`Shop rate not found for purity: ${req.params.purityId}`)
    }

    res.status(200).json({ success: true, message: 'Rate updated successfully', data: rate })
  } catch (error) {
    next(error)
  }
}

// @desc    Seed initial shop gold rates
// @route   POST /api/shop-rates/seed
// @access  Public (should be disabled in production)
const seedShopRates = async (req, res, next) => {
  try {
    const existingRates = await ShopGoldRate.countDocuments()

    if (existingRates > 0) {
      return res.status(200).json({
        success: true,
        message: 'Shop rates already seeded',
        count: existingRates,
      })
    }

    const seedData = [
      {
        purityId: '24k',
        name: 'GOLD 24K',
        karat: '24K (99.9% Pure)',
        pricePerGram: 0,
        unit: 'per gram',
      },
      {
        purityId: '22k',
        name: 'GOLD 22K',
        karat: '22K (91.6% Pure)',
        pricePerGram: 0,
        unit: 'per gram',
      },
      {
        purityId: '20k',
        name: 'GOLD 20K',
        karat: '20K (83.3% Pure)',
        pricePerGram: 0,
        unit: 'per gram',
      },
      {
        purityId: '18k',
        name: 'GOLD 18K',
        karat: '18K (75.0% Pure)',
        pricePerGram: 0,
        unit: 'per gram',
      },
      {
        purityId: 'silver',
        name: 'SILVER 999',
        karat: '99.9% Fine Silver',
        pricePerGram: 0,
        unit: 'per gram',
      },
    ]

    const rates = await ShopGoldRate.insertMany(seedData)

    res.status(201).json({
      success: true,
      message: 'Shop rates seeded successfully — set your prices via admin panel',
      count: rates.length,
      data: rates,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllShopRates,
  getShopRateByPurity,
  updateShopRate,
  seedShopRates,
}
