const {
  Schema,
  model
} = require('mongoose');

const modelPms = new Schema({

  method: {
    type: String,
    required: true,
  },
  source: [{
    url: {
      type: String,
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
    }
  }],
  translate: {
    type: Boolean,
    required: false,
  },
  date: {
    from: {
      type: Date,
      required: false,
    },
    to: {
      type: Date,
      required: false,
    }
  },
  id: {
    type: String,
    required: false,
  }

});

module.exports = model('Pms', modelPms);