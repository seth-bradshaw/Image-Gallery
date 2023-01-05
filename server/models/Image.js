

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Image Schema
const ImageSchema = new Schema({
  handle: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.Now
  },
  date_last_modified: {
    type: Date,
    default: Date.Now
  }
  // TODO add tags *stretch*
});

module.exports = Image = mongoose.model('images', ImageSchema);