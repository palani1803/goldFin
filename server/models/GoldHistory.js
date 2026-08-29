const mongoose = require('mongoose')

const intradayPointSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: Date.now,
    },
    label: {
      type: String,
      required: true,
    },
    price24k: {
      type: Number,
      required: true,
    },
    price22k: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      default: 'admin',
    },
  },
  { _id: false }
)

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
    intradayPoints: [intradayPointSchema],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('GoldHistory', goldHistorySchema)
