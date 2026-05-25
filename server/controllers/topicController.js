const Topic = require('../models/topic')

// ADD TOPIC
const addTopic = async (req, res) => {
  const { title, unitId, youtubeLink, order } = req.body
  try {
    const topic = await Topic.create({ title, unitId, youtubeLink, order })
    res.status(201).json({ message: 'Topic added successfully', topic })
  } catch (error) {
    console.log('AddTopic error:', error)
    res.status(500).json({ message: error.message })
  }
}

// GET TOPICS BY UNIT
const getTopics = async (req, res) => {
  const { unitId } = req.params
  try {
    const topics = await Topic.find({ unitId }).sort({ order: 1 })
    res.json(topics)
  } catch (error) {
    console.log('GetTopics error:', error)
    res.status(500).json({ message: error.message })
  }
}

// DELETE TOPIC
const deleteTopic = async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id)
    res.json({ message: 'Topic deleted successfully' })
  } catch (error) {
    console.log('DeleteTopic error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { addTopic, getTopics, deleteTopic }
