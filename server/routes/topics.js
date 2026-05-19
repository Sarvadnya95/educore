const express = require('express')
const router = express.Router()
const { addTopic, getTopics, deleteTopic } = require('../controllers/topicController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// Admin only
router.post('/', authMiddleware, adminMiddleware, addTopic)
router.delete('/:id', authMiddleware, adminMiddleware, deleteTopic)

// Students can access
router.get('/:unitId', authMiddleware, getTopics)

module.exports = router