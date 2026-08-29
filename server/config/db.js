const dns = require('dns')
const mongoose = require('mongoose')

// Fix SRV record resolution on Windows / local ISP networks
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
} catch (e) {
  // If setServers fails in restrictive environments, fallback to system default
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/goldfin'
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    throw error
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected.')
})

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected.')
})

module.exports = connectDB

