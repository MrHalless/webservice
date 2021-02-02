const {
  Schema,
  model
} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  patronymic: {
    type: String,
    required: true,
  },
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
  city: {
    type: String,
    required: true,
  },
  complex: {
    type: String,
    required: true,
  },
  subdiv: {
    type: String,
    required: true,
  },
  settings: {
    type: Boolean,
    require: false,
    default: false,
  },
  servers: [{
    name: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      require: false,
      default: false,
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

module.exports = model('User', userSchema);