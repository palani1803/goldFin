const express = require('express')
const router = express.Router()
const { fetchGoldMarketNews } = require('../services/newsService')

// @desc    Get live gold and financial market news
// @route   GET /api/news
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const news = await fetchGoldMarketNews()
    res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
