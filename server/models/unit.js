const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

unitSchema.index({ subjectId: 1, order: 1 })
module.exports = mongoose.model('Unit', unitSchema)