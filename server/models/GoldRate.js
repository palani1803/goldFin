const mongoose = require('mongoose')

const goldRateSchema = new mongoose.Schema(
  {
    purityId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    karat: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerGram: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: 'per gram',
    },
    changePercent: {
      type: Number,
      default: 0,
    },
    isUp: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('GoldRate', goldRateSchema)
