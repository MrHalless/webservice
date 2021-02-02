const { Schema, model } = require('mongoose');

//
// В данной схеме мы отображаем страницу
// в зависимости от доступа, выбранного админом
//
const typeView = new Schema({
  name: {
    type: String,
    required: true,
  },
  view: {
    views: [
      {
        viewServer: {
          type: Boolean,
          required: false,
          default: true,
        },
      },
      {
        viewChat: {
          type: Boolean,
          required: false,
          default: true,
        },
      },
    ],
  },
});

module.exports = model('TypeView', typeView);
