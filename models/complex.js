const { Schema, model } = require('mongoose');

const complexSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = model('Complex', complexSchema);
