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
  // isAuthenticated: {
  //   type: Boolean,
  //   required: true,
  // },
  typeUser: {
    type: String,
    required: false,
    enum: [
      'Админ АПК',
      'Админ комплекса',
      'Руководитель АПК',
      'Руководитель комплекса',
      'Руководитель подразделения',
      'Оператор',
    ],
  },
  templateName: {
    type: String,
    required: false,
  },
  typeAccount: {
    type: String,
    required: true,
    enum: ['Доменная', 'Локальная'],
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
