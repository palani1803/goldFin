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

const GoldRate = require('../models/GoldRate')
const { recordPriceHistoryUpdate } = require('../services/goldPriceService')

const PURITY_METADATA = {
  '24k': { name: 'GOLD 24K', karat: '24K (99.9% Pure)' },
  '22k': { name: 'GOLD 22K', karat: '22K (91.6% Pure)' },
  '20k': { name: 'GOLD 20K', karat: '20K (83.3% Pure)' },
  '18k': { name: 'GOLD 18K', karat: '18K (75.0% Pure)' },
  'silver': { name: 'SILVER 999', karat: '99.9% Fine Silver' },
}

// @desc    Update a shop gold rate manually
// @route   PUT /api/shop-rates/:purityId
// @access  Public / Admin
const updateShopRate = async (req, res, next) => {
  try {
    const { pricePerGram } = req.body

    if (pricePerGram === undefined || pricePerGram === null) {
      res.status(400)
      throw new Error('Please provide pricePerGram')
    }

    const purityId = req.params.purityId
    const numPrice = Number(pricePerGram)
    const meta = PURITY_METADATA[purityId] || { name: purityId.toUpperCase(), karat: purityId.toUpperCase() }

    // 1. Update ShopGoldRate document in MongoDB
    const rate = await ShopGoldRate.findOneAndUpdate(
      { purityId: purityId },
      {
        $set: {
          pricePerGram: numPrice,
          updatedBy: req.admin?._id || null,
        },
        $setOnInsert: {
          purityId: purityId,
          name: meta.name,
          karat: meta.karat,
          unit: 'per gram',
        },
      },
      { new: true, runValidators: true, upsert: true }
    )

    if (!rate) {
      res.status(404)
      throw new Error(`Shop rate not found for purity: ${purityId}`)
    }

    res.status(200).json({
      success: true,
      message: 'Shop rate updated successfully in database',
      data: rate,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Sync shop rates automatically to 75% of current market benchmark price
// @route   POST /api/shop-rates/sync-75
// @access  Public / Admin
const syncShopRatesWithMarket = async (req, res, next) => {
  try {
    const marketRates = await GoldRate.find({})

    if (!marketRates || marketRates.length === 0) {
      res.status(400)
      throw new Error('No market gold rates available to calculate 75% shop price')
    }

    const updatedShopRates = []
    const now = new Date()

    for (const mRate of marketRates) {
      const meta = PURITY_METADATA[mRate.purityId] || { name: mRate.name, karat: mRate.karat }
      const shopPrice = mRate.purityId === 'silver'
        ? parseFloat((mRate.pricePerGram * 0.75).toFixed(2))
        : Math.round(mRate.pricePerGram * 0.75)

      const updated = await ShopGoldRate.findOneAndUpdate(
        { purityId: mRate.purityId },
        {
          purityId: mRate.purityId,
          name: meta.name,
          karat: meta.karat,
          pricePerGram: shopPrice,
          unit: 'per gram',
          updatedAt: now,
          updatedBy: req.admin?._id || null,
        },
        { upsert: true, new: true, runValidators: true }
      )
      updatedShopRates.push(updated)
      console.log(`🏷️  [Shop Rate 75%] ${mRate.purityId.toUpperCase()}: ₹${shopPrice}/g (75% of ₹${mRate.pricePerGram}/g)`)
    }

    res.status(200).json({
      success: true,
      message: 'Shop rates successfully synchronized to 75% of live market price',
      count: updatedShopRates.length,
      data: updatedShopRates,
    })
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
  syncShopRatesWithMarket,
  seedShopRates,
}
