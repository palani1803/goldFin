const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cron = require('node-cron')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')
const { fetchAndUpdateGoldPrices } = require('./services/goldPriceService')

// Route imports
const goldRateRoutes = require('./routes/goldRateRoutes')
const userRoutes = require('./routes/userRoutes')
const newsRoutes = require('./routes/newsRoutes')
const adminAuthRoutes = require('./routes/adminAuthRoutes')
const branchRoutes = require('./routes/branchRoutes')
const shopGoldRateRoutes = require('./routes/shopGoldRateRoutes')

// Load environment variables
dotenv.config()

// Initialize Express
const app = express()

// --------------- Middleware ---------------
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// --------------- API Routes ---------------
app.use('/api/gold-rates', goldRateRoutes)
app.use('/api/users', userRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/admin', adminAuthRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api/shop-rates', shopGoldRateRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GoldFin API is running',
    timestamp: new Date().toISOString(),
  })
})

// --------------- Error Handler ---------------
app.use(errorHandler)

// --------------- Start Server ---------------
const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()

    // Auto-seed default admin and 5 branches into database if not present
    const { seedDefaultAdmin } = require('./controllers/adminAuthController')
    const { seedDefaultBranches } = require('./controllers/branchController')
    await seedDefaultAdmin()
    await seedDefaultBranches()

    app.listen(PORT, () => {
      console.log(`\n🚀 GoldFin API Server running on port ${PORT}`)
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
      console.log(`💰 Gold Rates:   http://localhost:${PORT}/api/gold-rates`)
      console.log(`👤 Users:        http://localhost:${PORT}/api/users`)
      console.log(`🔐 Admin:        http://localhost:${PORT}/api/admin`)
      console.log(`🏢 Branches:     http://localhost:${PORT}/api/branches`)
      console.log(`🏷️  Shop Rates:   http://localhost:${PORT}/api/shop-rates\n`)
    })

    // --------------- Live Gold Price Cron Job ---------------
    // Schedule: Every day at 10:00 AM IST (04:30 UTC)
    // IBJA publishes daily rates around this time
    cron.schedule('30 4 * * *', async () => {
      console.log('\n⏰ [CRON] Daily gold price update triggered...')
      await fetchAndUpdateGoldPrices()
    }, {
      timezone: 'Asia/Kolkata',
    })

    console.log('⏰ Cron job scheduled: Daily gold price update at 10:00 AM IST')

    // Also fetch on server startup (so first load gets fresh data)
    console.log('\n📡 Fetching latest gold prices on startup...')
    await fetchAndUpdateGoldPrices()

  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
