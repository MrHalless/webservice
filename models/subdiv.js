const {
  Schema,
  model
} = require('mongoose');

const subdivSchema = new Schema({





  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  complex: {
    type: String,
    required: true,
  },
  servers: [{
    name: {
      type: String,
      require: true,
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
  }]
});

module.exports = model('Subdiv', subdivSchema);