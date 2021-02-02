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
<<<<<<< HEAD
=======
  military: {
    type: String,
    required: true,
  },
>>>>>>> master
});

module.exports = model('Complex', complexSchema);
