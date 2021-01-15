const { io } = require('../index');
const User = require('../models/user');

io.on('connection', (socket) => {
  console.log('connect');

  socket.on('disconnect', function () {
    console.log('disconnect');
  });
  const messageToastr = 'Test';
  // client.emit('user', messageToastr);

  // io.sockets.on('connection', function (socket) {
  //   // const user = 122222224;
  //   // const user = await User.find().lean();
  //   const messageToastr = 'Test';
  //   // console.log(user);
  //   // let userJSON = JSON.stringify(user);
  //   socket.emit('user', messageToastr);
  // setInterval(() => {
  //   socket.emit('user', messageToastr);
  // }, 3000);
});
