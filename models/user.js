const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   surname: {
  //     type: String,
  //     required: true,
  //   },
  //   patronymic: {
  //     type: String,
  //     required: true,
  //   },
  //   code: {
  //     type: String,
  //     required: false,
  //   },
  //   server: {
  //     type: String,
  //     required: true,
  //   },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   access: {
  //     type: String,
  //     required: true,
  //   },
  //   language_form: {
  //     type: String,
  //     required: true,
  //   },
});

module.exports = model('User', userSchema);
