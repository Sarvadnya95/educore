const express = require('express')
const router = express.Router()
const { addUnit, getUnits, deleteUnit } = require('../controllers/unitController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// Admin only
router.post('/', authMiddleware, adminMiddleware, addUnit)
router.delete('/:id', authMiddleware, adminMiddleware, deleteUnit)

// Students can access
router.get('/:subjectId', authMiddleware, getUnits)

module.exports = router