const { Schema, model } = require('mongoose');

const bindingSchema = new Schema({
  groupDomain: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
    default: '',
  },
});

module.exports = model('Binding', bindingSchema);
