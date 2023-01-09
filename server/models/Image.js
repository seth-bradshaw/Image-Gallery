

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tags = new Schema({
  scope: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

// Create Image Schema
const ImageSchema = new Schema({
  handle: {
    type: String,
    required: true,
  },
  tags: {
    type: Tags,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.Now
  },
  date_last_modified: {
    type: Date,
    default: Date.Now
  }
});

module.exports = Image = mongoose.model('images', ImageSchema);