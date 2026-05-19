const express = require('express')
const router = express.Router()
const { register, login, updateYearSem } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.put('/update-year-sem', authMiddleware, updateYearSem)

module.exports = router