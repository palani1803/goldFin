const mongoose = require('mongoose')

const goldHistorySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
      index: true,
    },
    price24k: {
      type: Number,
      required: true,
    },
    price22k: {
      type: Number,
      required: true,
    },
    highPrice: {
      type: Number,
      required: true,
    },
    lowPrice: {
      type: Number,
      required: true,
    },
    openPrice: {
      type: Number,
      required: true,
    },
    closePrice: {
      type: Number,
      required: true,
    },
    changePercent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('GoldHistory', goldHistorySchema)
