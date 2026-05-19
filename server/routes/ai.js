const express = require('express')
const router = express.Router()
const { solveDoubt, generateQuiz, generateSummary } = require('../controllers/aiController')
const authMiddleware = require('../middleware/authMiddleware')

// All AI routes — logged in students only
router.post('/doubt', authMiddleware, solveDoubt)
router.post('/quiz', authMiddleware, generateQuiz)
router.post('/summary', authMiddleware, generateSummary)

module.exports = router