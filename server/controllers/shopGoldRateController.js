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

    // 2. Derive 24K & 22K values to record in GoldHistory movements
    let p24 = 0
    let p22 = 0

    if (purityId === '24k') {
      p24 = numPrice
      p22 = Math.round(numPrice * (22 / 24))
    } else if (purityId === '22k') {
      p22 = numPrice
      p24 = Math.round(numPrice * (24 / 22))
    } else if (purityId === '20k') {
      p24 = Math.round(numPrice * (24 / 20))
      p22 = Math.round(numPrice * (22 / 20))
    } else if (purityId === '18k') {
      p24 = Math.round(numPrice * (24 / 18))
      p22 = Math.round(numPrice * (22 / 18))
    }

    // 3. Persist movement in GoldHistory collection in MongoDB
    if (p24 > 0) {
      await recordPriceHistoryUpdate(p24, p22, 'admin_update')
    }

    // 4. Update GoldRate live benchmark in MongoDB as well
    const existingGoldRate = await GoldRate.findOne({ purityId })
    const prevPrice = existingGoldRate ? existingGoldRate.pricePerGram : numPrice
    const changePct = prevPrice > 0 ? parseFloat((((numPrice - prevPrice) / prevPrice) * 100).toFixed(2)) : 0

    await GoldRate.findOneAndUpdate(
      { purityId },
      {
        purityId,
        name: meta.name,
        karat: meta.karat,
        pricePerGram: numPrice,
        previousPrice: prevPrice,
        unit: 'per gram',
        changePercent: Math.abs(changePct),
        isUp: changePct >= 0,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      message: 'Rate & price history movement updated successfully in database',
      data: rate,
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
  seedShopRates,
}
