const Branch = require('../models/Branch')

const DEFAULT_BRANCHES = [
  {
    name: 'Sivakasi Main Branch & Vault',
    address: 'No. 42/B, Kamarajar Road, Near Old Bus Stand, Opposite Town Hall',
    city: 'Sivakasi',
    state: 'Tamil Nadu',
    phone: '+91 90925 48347',
    email: 'sivakasi@maheshbankers.com',
    managerName: 'R. Senthil Kumar (Branch Head)',
    operatingHours: 'Mon–Sat: 9:00 AM – 6:30 PM',
    mapUrl: 'https://maps.google.com/maps?q=Sivakasi,+Tamil+Nadu,+India',
    isActive: true,
  },
  {
    name: 'Srivilliputhur Heritage Branch',
    address: 'No. 18, South Car Street, Near Andal Temple Arch',
    city: 'Srivilliputhur',
    state: 'Tamil Nadu',
    phone: '+91 98421 77390',
    email: 'srivilliputhur@maheshbankers.com',
    managerName: 'M. Soundarapandian (Senior Manager)',
    operatingHours: 'Mon–Sat: 9:00 AM – 6:30 PM',
    mapUrl: 'https://maps.google.com/maps?q=Srivilliputhur,+Tamil+Nadu,+India',
    isActive: true,
  },
  {
    name: 'M.Puthupatti Rural Gold Center',
    address: 'Main Road Junction, Near Bus Stop, M.Puthupatti',
    city: 'M.Puthupatti',
    state: 'Tamil Nadu',
    phone: '+91 94432 18902',
    email: 'puthupatti@maheshbankers.com',
    managerName: 'K. Marimuthu (Branch Head)',
    operatingHours: 'Mon–Sat: 9:00 AM – 6:30 PM',
    mapUrl: 'https://maps.google.com/maps?q=M.Puthupatti,+Tamil+Nadu,+India',
    isActive: true,
  },
  {
    name: 'Rajapalayam Cotton Market Branch',
    address: 'No. 88, Tenkasi Main Road, PACM Hospital Junction',
    city: 'Rajapalayam',
    state: 'Tamil Nadu',
    phone: '+91 97890 44123',
    email: 'rajapalayam@maheshbankers.com',
    managerName: 'A. Ramasamy (Branch Officer)',
    operatingHours: 'Mon–Sat: 9:00 AM – 6:30 PM',
    mapUrl: 'https://maps.google.com/maps?q=Rajapalayam,+Tamil+Nadu,+India',
    isActive: true,
  },
]

// Auto-seed default branches into database ONLY if initial setup is needed
const seedDefaultBranches = async () => {
  try {
    const count = await Branch.countDocuments()
    if (count === 0) {
      console.log('🏢 [DB] No branches found. Initializing official GoldFin regional branches...')
      await Branch.insertMany(DEFAULT_BRANCHES)
      console.log('✅ [DB] Initial GoldFin branches created.')
    }
  } catch (error) {
    console.error('⚠️ [DB] Error seeding default branches:', error.message)
  }
}

// @desc    Get all branches
// @route   GET /api/branches
// @access  Public
const getAllBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find({}).sort({ createdAt: 1 })
    res.status(200).json({ success: true, count: branches.length, data: branches })
  } catch (error) {
    next(error)
  }
}

// @desc    Get a single branch by ID
// @route   GET /api/branches/:id
// @access  Public
const getBranchById = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id)

    if (!branch) {
      res.status(404)
      throw new Error('Branch not found')
    }

    res.status(200).json({ success: true, data: branch })
  } catch (error) {
    next(error)
  }
}

// @desc    Create a new branch
// @route   POST /api/branches
// @access  Private (admin)
const createBranch = async (req, res, next) => {
  try {
    const {
      name, address, city, state, phone,
      email, managerName, operatingHours, mapUrl, isActive,
    } = req.body

    const branch = await Branch.create({
      name,
      address,
      city,
      state: state || 'Tamil Nadu',
      phone,
      email,
      managerName,
      operatingHours,
      mapUrl,
      isActive: isActive !== undefined ? isActive : true,
    })

    res.status(201).json({ success: true, data: branch })
  } catch (error) {
    next(error)
  }
}

// @desc    Update a branch
// @route   PUT /api/branches/:id
// @access  Private (admin)
const updateBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!branch) {
      res.status(404)
      throw new Error('Branch not found')
    }

    res.status(200).json({ success: true, data: branch })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete a branch
// @route   DELETE /api/branches/:id
// @access  Private (admin)
const deleteBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id)

    if (!branch) {
      res.status(404)
      throw new Error('Branch not found')
    }

    res.status(200).json({ success: true, message: 'Branch deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// @desc    Seed or reset default 5 branches
// @route   POST /api/branches/seed
// @access  Public / Admin
const seedBranches = async (req, res, next) => {
  try {
    const count = await Branch.countDocuments()
    if (count > 0 && !req.query.force) {
      const existing = await Branch.find({}).sort({ createdAt: 1 })
      return res.status(200).json({
        success: true,
        message: 'Branches already present in database',
        count: existing.length,
        data: existing,
      })
    }

    if (req.query.force) {
      await Branch.deleteMany({})
    }

    const seeded = await Branch.insertMany(DEFAULT_BRANCHES)
    res.status(201).json({
      success: true,
      message: 'Successfully seeded 4 Mahesh Bankers branches',
      count: seeded.length,
      data: seeded,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
  seedBranches,
  seedDefaultBranches,
}
