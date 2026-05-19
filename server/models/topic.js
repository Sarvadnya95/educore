const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  unitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: true
  },
  youtubeLink: {
    type: String,
    default: ''
  },
  notesUrl: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model('Topic', topicSchema)