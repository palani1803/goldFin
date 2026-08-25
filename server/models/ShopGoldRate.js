const mongoose = require('mongoose')

const shopGoldRateSchema = new mongoose.Schema(
  {
    purityId: {
      type: String,
      required: [true, 'Please provide a purity ID'],
      unique: true,
      trim: true,
      enum: ['24k', '22k', '20k', '18k', 'silver'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    karat: {
      type: String,
      required: [true, 'Please provide karat/purity info'],
      trim: true,
    },
    pricePerGram: {
      type: Number,
      required: [true, 'Please provide a price per gram'],
      min: [0, 'Price cannot be negative'],
    },
    unit: {
      type: String,
      default: 'per gram',
      trim: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('ShopGoldRate', shopGoldRateSchema)
