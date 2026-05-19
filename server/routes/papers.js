const express = require('express')
const router = express.Router()
const { uploadPaper, getPapers, deletePaper } = require('../controllers/paperController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const { upload } = require('../config/cloudinary')

// Admin only
router.post('/', authMiddleware, adminMiddleware, upload.single('paper'), uploadPaper)
router.delete('/:id', authMiddleware, adminMiddleware, deletePaper)

// Students can access
router.get('/:subjectId', authMiddleware, getPapers)

module.exports = router