const mongoose = require('mongoose')

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'Mahesh Bankers',
      trim: true,
    },
    bankPartnerName: {
      type: String,
      default: 'RBI-Approved Scheduled Commercial Banks',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Live Rates & Gold Loans',
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '', // Empty means use default modern GoldFin SVG coins icon
    },
    logoType: {
      type: String,
      enum: ['icon', 'image', 'both'],
      default: 'icon',
    },
    whatsappNumber: {
      type: String,
      default: '9092548347',
      trim: true,
    },
    contactPhone: {
      type: String,
      default: '+91 90925 48347',
      trim: true,
    },
    contactEmail: {
      type: String,
      default: 'contact@maheshbankers.com',
      trim: true,
      lowercase: true,
    },
    headquartersAddress: {
      type: String,
      default: 'No. 42/B, Kamarajar Road, Near Old Bus Stand, Sivakasi, Tamil Nadu',
      trim: true,
    },
    operatingHours: {
      type: String,
      default: 'Mon–Sat: 9:00 AM – 6:30 PM',
      trim: true,
    },
    goldDutyFactor: {
      type: Number,
      default: 1.135,
    },
    goldGstPercent: {
      type: Number,
      default: 3,
    },
    maxLoanLtvPercent: {
      type: Number,
      default: 75,
    },
    demoAdminEmail: {
      type: String,
      default: 'admin@maheshbankers.com',
      trim: true,
      lowercase: true,
    },
    demoAdminPassword: {
      type: String,
      default: 'admin123',
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

module.exports = mongoose.model('SiteSettings', siteSettingsSchema)
