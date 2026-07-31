const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

// Route imports
const goldRateRoutes = require('./routes/goldRateRoutes')
const userRoutes = require('./routes/userRoutes')

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
    app.listen(PORT, () => {
      console.log(`\n🚀 GoldFin API Server running on port ${PORT}`)
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`)
      console.log(`💰 Gold Rates:   http://localhost:${PORT}/api/gold-rates`)
      console.log(`👤 Users:        http://localhost:${PORT}/api/users\n`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
