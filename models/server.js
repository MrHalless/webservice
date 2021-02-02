<<<<<<< HEAD
const {
  Schema,
  model
} = require('mongoose');
=======
const { Schema, model } = require('mongoose');
>>>>>>> master

const serverSchema = new Schema({
  complex: {
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
<<<<<<< HEAD
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
=======
  languages: {
    type: Object,
    required: true,
  },
});

module.exports = model('Server', serverSchema);
>>>>>>> master
