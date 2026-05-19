const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    required: true
  },
  semester: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Subject', subjectSchema)