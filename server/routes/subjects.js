const express = require('express')
const router = express.Router()
const { addSubject, getSubjects, deleteSubject, globalSearch } = require('../controllers/subjectController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// Search — must be before /:id routes
router.get('/search', authMiddleware, globalSearch)

// Admin only
router.post('/', authMiddleware, adminMiddleware, addSubject)
router.delete('/:id', authMiddleware, adminMiddleware, deleteSubject)

// Students can access
router.get('/', authMiddleware, getSubjects)

module.exports = router