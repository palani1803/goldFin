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
const settingsRoutes = require('./routes/settingsRoutes')

// Load environment variables
dotenv.config()

// Initialize Express
const app = express()

// --------------- Middleware ---------------
app.use(cors())
app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true, limit: '15mb' }))

// --------------- API Routes ---------------
app.use('/api/gold-rates', goldRateRoutes)
app.use('/api/users', userRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/admin', adminAuthRoutes)
app.use('/api/branches', branchRoutes)
app.use('/api/shop-rates', shopGoldRateRoutes)
app.use('/api/settings', settingsRoutes)

// Root API endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    name: 'GoldFin Backend API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/api/health',
      goldRates: '/api/gold-rates',
      goldHistory: '/api/gold-rates/history',
      news: '/api/news',
      branches: '/api/branches',
      shopRates: '/api/shop-rates',
      admin: '/api/admin',
      users: '/api/users',
    },
    timestamp: new Date().toISOString(),
  })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GoldFin API is running smoothly',
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

    // Auto-seed default admin into database if not present
    const { seedDefaultAdmin } = require('./controllers/adminAuthController')
    await seedDefaultAdmin()

    const server = app.listen(PORT, () => {
      console.log(`\n🚀 GoldFin API Server running on port ${PORT}`)
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
      console.log(`💰 Gold Rates:   http://localhost:${PORT}/api/gold-rates`)
      console.log(`👤 Users:        http://localhost:${PORT}/api/users`)
      console.log(`🔐 Admin:        http://localhost:${PORT}/api/admin`)
      console.log(`🏢 Branches:     http://localhost:${PORT}/api/branches`)
      console.log(`🏷️  Shop Rates:   http://localhost:${PORT}/api/shop-rates\n`)
    })

    // --------------- Automatic Daily & Intraday Gold Price Cron Jobs ---------------
    // 1. Intraday Market Sync: Every 30 minutes from 9:00 AM to 6:30 PM IST (Mon-Sat)
    cron.schedule('*/30 9-18 * * 1-6', async () => {
      console.log('\n⏰ [CRON] Intraday Indian Market live gold price sync triggered...')
      try {
        await fetchAndUpdateGoldPrices()
      } catch (cronErr) {
        console.error('⚠️ [CRON Error]:', cronErr.message)
      }
    }, {
      timezone: 'Asia/Kolkata',
    })

    // 2. Daily Morning Benchmark Opening Sync (6:00 AM & 10:00 AM IST every day)
    cron.schedule('0 6,10 * * *', async () => {
      console.log('\n⏰ [CRON] Daily Morning Gold Benchmark sync triggered...')
      try {
        await fetchAndUpdateGoldPrices()
      } catch (cronErr) {
        console.error('⚠️ [CRON Error]:', cronErr.message)
      }
    }, {
      timezone: 'Asia/Kolkata',
    })

    console.log('⏰ Automated Cron Schedule: Daily at 6:00 AM, 10:00 AM & every 30 mins during market hours (IST)')

    // Fetch on startup in background so server starts immediately without blocking
    console.log('📡 Syncing live gold prices in background on startup...')
    fetchAndUpdateGoldPrices().catch((priceErr) => {
      console.warn('⚠️ Initial gold price sync notice:', priceErr.message)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM received. Shutting down gracefully...')
      server.close(() => {
        console.log('Server closed.')
        process.exit(0)
      })
    })

  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('⚠️ Unhandled Rejection:', err.message)
})

startServer()
