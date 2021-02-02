const {
  Schema,
  model
} = require('mongoose');

const cmdSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  data: {
    action: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: false
    }
  },
});

module.exports = model('CmdSchema', cmdSchema);