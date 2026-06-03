const Subject = require('../models/subject')
const Unit = require('../models/unit')
const Topic = require('../models/topic')

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

// GLOBAL SEARCH
const globalSearch = async (req, res) => {
  const { query, year, semester } = req.query
  try {
    if (!query) return res.json([])

    const Subject = require('../models/Subject')
    const Unit = require('../models/Unit')
    const Topic = require('../models/Topic')

    // Search subjects
    const subjects = await Subject.find({
      year,
      semester,
      name: { $regex: query, $options: 'i' }
    })

    // Search units
    const units = await Unit.find({
      name: { $regex: query, $options: 'i' }
    }).populate('subjectId')

    // Filter units by year/sem
    const filteredUnits = units.filter(u =>
      u.subjectId?.year == year && u.subjectId?.semester == semester
    )

    // Search topics
    const topics = await Topic.find({
      title: { $regex: query, $options: 'i' }
    }).populate({
      path: 'unitId',
      populate: { path: 'subjectId' }
    })

    // Filter topics by year/sem
    const filteredTopics = topics.filter(t =>
      t.unitId?.subjectId?.year == year &&
      t.unitId?.subjectId?.semester == semester
    )

    // Build results
    const results = [
      ...subjects.map(s => ({
        type: 'subject',
        title: s.name,
        subtitle: `Subject — Year ${s.year} Sem ${s.semester}`,
        subjectId: s._id
      })),
      ...filteredUnits.map(u => ({
        type: 'unit',
        title: u.name,
        subtitle: `Unit in ${u.subjectId?.name}`,
        subjectId: u.subjectId?._id
      })),
      ...filteredTopics.map(t => ({
        type: 'topic',
        title: t.title,
        subtitle: `Topic in ${t.unitId?.subjectId?.name}`,
        subjectId: t.unitId?.subjectId?._id
      }))
    ]

    res.json(results)
  } catch (error) {
    console.log('Search error:', error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = { addSubject, getSubjects, deleteSubject, globalSearch }