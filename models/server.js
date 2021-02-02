const {
  Schema,
  model
} = require('mongoose');

const serverSchema = new Schema({
  complex: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },



  name: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  port: {
    type: String,
    required: true,
  },
  languages: [{
    first: {
      type: String,
      required: true,
    },
    second: {
      type: String,
      required: true,
    },
    firstDescription: {
      type: String,
      required: true,
    },
    secondDescription: {
      type: String,
      required: true,
    }
  }],
});

module.exports = model('Server', serverSchema);