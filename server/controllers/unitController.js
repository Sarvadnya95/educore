const Unit = require('../models/Unit')

// ADD UNIT
const addUnit = async (req, res) => {
  const { name, subjectId, order } = req.body
  try {
    const unit = await Unit.create({ name, subjectId, order })
    res.status(201).json({ message: 'Unit added successfully', unit })
  } catch (error) {
    console.log('AddUnit error:', error)
    res.status(500).json({ message: error.message })
  }
}

// GET UNITS BY SUBJECT
const getUnits = async (req, res) => {
  const { subjectId } = req.params
  try {
    const units = await Unit.find({ subjectId }).sort({ order: 1 })
    res.json(units)
  } catch (error) {
    console.log('GetUnits error:', error)
    res.status(500).json({ message: error.message })
  }
}

// DELETE UNIT
const deleteUnit = async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id)
    res.json({ message: 'Unit deleted successfully' })
  } catch (error) {
    console.log('DeleteUnit error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { addUnit, getUnits, deleteUnit }