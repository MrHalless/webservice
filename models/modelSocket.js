const {
  Schema,
  model
} = require('mongoose');

const modelSocket = new Schema({
  name: {
    type: String,
    required: true,
  },
  socket: {
    type: String,
    required: true,

  }

});

module.exports = model('ModelSocket', modelSocket);