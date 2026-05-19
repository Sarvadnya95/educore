const mongoose = require('mongoose')

const paperSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  examYear: {
    type: Number,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('Paper', paperSchema)