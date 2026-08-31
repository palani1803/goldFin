const SiteSettings = require('../models/SiteSettings')
const Admin = require('../models/Admin')

const DEFAULT_SETTINGS = {
  siteName: 'Mahes Bankers',
  bankPartnerName: 'RBI-Approved Scheduled Commercial Banks',
  tagline: 'Live Rates & Gold Loans',
  logoUrl: '',
  logoType: 'icon',
  whatsappNumber: '9092548347',
  contactPhone: '+91 90925 48347',
  contactEmail: 'contact@mahesbankers.com',
  headquartersAddress: 'No. 42/B, Kamarajar Road, Near Old Bus Stand, Sivakasi, Tamil Nadu',
  operatingHours: 'Mon–Sat: 9:00 AM – 6:30 PM',
  goldDutyFactor: 1.135,
  goldGstPercent: 3,
  maxLoanLtvPercent: 75,
  demoAdminEmail: 'admin@mahesbankers.com',
  demoAdminPassword: 'admin123',
}

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne({})

    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS)
    } else {
      let needsSave = false
      if (settings.siteName === 'GoldFin' || settings.siteName === 'Mahesh Bankers') {
        settings.siteName = 'Mahes Bankers'
        needsSave = true
      }
      if (settings.contactEmail && (settings.contactEmail.includes('goldfin') || settings.contactEmail.includes('mahesh'))) {
        settings.contactEmail = 'contact@mahesbankers.com'
        needsSave = true
      }
      if (settings.demoAdminEmail && (settings.demoAdminEmail.includes('goldfin') || settings.demoAdminEmail.includes('mahesh'))) {
        settings.demoAdminEmail = 'admin@mahesbankers.com'
        needsSave = true
      }
      if (needsSave) {
        await settings.save()
      }
    }

    res.status(200).json({
      success: true,
      data: settings,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private (Admin)
const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne({})

    const updateData = {
      ...req.body,
      updatedBy: req.admin?._id || null,
    }

    if (!settings) {
      settings = await SiteSettings.create(updateData)
    } else {
      settings = await SiteSettings.findOneAndUpdate(
        { _id: settings._id },
        { $set: updateData },
        { new: true, runValidators: true }
      )
    }

    // Keep Admin model name synchronized if siteName is updated
    if (updateData.siteName) {
      await Admin.updateMany(
        { role: 'admin' },
        { $set: { name: `${updateData.siteName} Admin` } }
      )
    }

    res.status(200).json({
      success: true,
      message: 'Site settings updated successfully',
      data: settings,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Change admin password
// @route   PUT /api/settings/password
// @access  Private (Admin)
const changeAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      res.status(400)
      throw new Error('Please provide both current password and new password')
    }

    if (newPassword.length < 6) {
      res.status(400)
      throw new Error('New password must be at least 6 characters long')
    }

    const admin = await Admin.findById(req.admin._id).select('+password')
    if (!admin) {
      res.status(404)
      throw new Error('Admin not found')
    }

    const isMatch = await admin.matchPassword(currentPassword)
    if (!isMatch) {
      res.status(401)
      throw new Error('Current password does not match')
    }

    admin.password = newPassword
    await admin.save()

    // Synchronize updated demo password and email to SiteSettings so demo credentials reflect the change
    const updatedSettings = await SiteSettings.findOneAndUpdate(
      {},
      {
        $set: {
          demoAdminPassword: newPassword,
          demoAdminEmail: admin.email || 'admin@mahesbankers.com',
        },
      },
      { new: true, upsert: true }
    )

    res.status(200).json({
      success: true,
      message: 'Admin password changed successfully and login demo credentials updated',
      data: {
        demoAdminEmail: admin.email || 'admin@mahesbankers.com',
        demoAdminPassword: newPassword,
        settings: updatedSettings,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getSettings,
  updateSettings,
  changeAdminPassword,
}
