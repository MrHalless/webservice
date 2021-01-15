const { Schema, model } = require('mongoose');

const bindingUserSchema = new Schema({
  userDomain: {
    type: String,
    required: true,
  },
  userLocal: {
    type: String,
    required: true,
  },
});

module.exports = model('BindingUser', bindingUserSchema);
