// // const { openModal } = require('../js/app');

// var modal = document.getElementById('myModal');

// var btn = document.getElementById('myBtn');

// let activeUser = document.getElementById('activeUser');
// // var span = document.getElementsByClassName('close')[0];

// /* function qwerty() {
//     modal.style.display = "block";
// }
//  */

// // span.onclick = function () {
// //   modal.style.display = 'none';
// // };

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// };

// let timeout = 3000;
// let lastActiveTimestamp = 0;
// let userIsActive = false;

// // window.addEventListener('mousemove', active);
// window.addEventListener('keypress', active);
// window.addEventListener('click', active);

// // setInterval(checkUserIsActive, 2000);
// // active();

// function checkUserIsActive() {
//   if (userIsActive && new Date().getTime() - lastActiveTimestamp > timeout) {
//     modal.style.display = 'block';
//     console.log('user is not active');
//     // document.querySelector('div').textContent = 'user is inactive';
//     userIsActive = false;
//     setInterval(function () {
//       modal.style.display = 'none';
//       location.reload();
//     }, 60000);
//   }
// }

// function active() {
//   lastActiveTimestamp = new Date().getTime();
//   if (!userIsActive) {
//     userIsActive = true;
//     console.log('user is active');
//     //document.querySelector('div').textContent = 'user is active';
//   }
// }

// activeUser.addEventListener('click', () => {
//   location.reload();
// });
