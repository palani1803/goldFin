const express = require('express')
const router = express.Router()
const {
  registerUser,
  getUsers,
  getUserById,
} = require('../controllers/userController')

router.route('/').get(getUsers)
router.post('/register', registerUser)
router.route('/:id').get(getUserById)

module.exports = router
