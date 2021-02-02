// const { request } = require('https');
// function openModal() {
//   $('#init').modal();
//   //   const modal = document.querySelector('#init');
//   //   alert(modal);
// }

// module.exports.openModal = openModal;

// const User = require('../models/user');

// async function find() {
//   const { login, password } = request.body;
//   const candidate = await User.findOne({ login });
//   console.log(candidate);
// }

// find();

function openModal() {
  const checkModal = $('#init');
  // console.log(checkModal);
  checkModal.modal();
}
openModal();
