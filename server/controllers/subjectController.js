const Subject = require('../models/subject')

// ADD SUBJECT
const addSubject = async (req, res) => {
  const { name, description, year, semester } = req.body
  try {
    const subject = await Subject.create({ name, description, year, semester })
    res.status(201).json({ message: 'Subject added successfully', subject })
  } catch (error) {
    console.log('AddSubject error:', error)
    res.status(500).json({ message: error.message })
  }
}

// GET SUBJECTS BY YEAR & SEM
const getSubjects = async (req, res) => {
  const { year, semester } = req.query
  try {
    const subjects = await Subject.find({ year, semester })
    res.json(subjects)
  } catch (error) {
    console.log('GetSubjects error:', error)
    res.status(500).json({ message: error.message })
  }
}

// DELETE SUBJECT
const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id)
    res.json({ message: 'Subject deleted successfully' })
  } catch (error) {
    console.log('DeleteSubject error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { addSubject, getSubjects, deleteSubject }