<<<<<<< HEAD
const User = require('../models/user');
const ModelSocket = require('../models/modelSocket');
const {
  findById,
  findByIdAndUpdate
} = require('../models/user');
const Complex = require('../models/complex');
const Server = require('../models/server');
const Subdiv = require('../models/subdiv')
const {
  MONGODB_URI
} = require('../keys/keys');

module.exports = async function (io) {
  io.on('connection', async (socket) => {
    // console.log('request', request.sessionID);;
    console.log('connect');
    // console.log('id', socket.handshake.session);
    // // console.log(socket.id);
    let saveSocket = new ModelSocket({
      name: socket.handshake.session.user,
      socket: socket.id,
    })
    try {
      await saveSocket.save();

    } catch (error) {

    }

    socket.on('disconnect', async function () {
      await ModelSocket.deleteOne({
        socket: socket.id
      });
      console.log('disconnect');
    });
    socket.on('hello', function () {

      console.log('тут хелло');
      socket.to().emit('user', '')
      socket.emit('user', 'TEXT');
    })
    socket.on('get_name_complex', async function (data) {

      let complex = await Complex.find({
        city: data
      }).lean();

      socket.emit('get_complex', complex);
    });
    socket.on('subdiv_get_name_complex', async function (data) {
      console.log('data', data);
      let complex = await Complex.find({
        city: data
      }).lean();

      socket.emit('subdiv_get_complex', complex);
    });
    socket.on('subdiv_get_name_servers', async function (data) {
      // console.log('data', data);
      let servers = await Server.find({
        complex: data
      }).lean();

      socket.emit('subdiv_get_servers', servers);
    });
    socket.on('subdiv_edit_get_name_servers', async function (data) {
      // console.log('data', data);
      let servers = await Server.find({
        complex: data
      }).lean();

      socket.emit('subdiv_edit_get_servers', servers);
    });

    socket.on('user_get_name_servers', async function (data) {

      let servers = await Subdiv.find({
        name: data
      }).lean();
      // console.log('servers', servers.servers);
      socket.emit('user_get_servers', servers);
    });

    socket.on('subdiv_edit_get_subdiv_for_Tree', async function (name) {

      const subdiv = await Subdiv.findOne({
        name
      })
      // console.log(subdiv);
      socket.emit('subdiv_edit_subdiv_for_Tree', subdiv);
    })
    socket.on('user_edit_get_subdiv_for_Tree', async function (name) {

      const subdiv = await Subdiv.findOne({
        name
      })
      // console.log(subdiv);
      socket.emit('user_edit_subdiv_for_Tree', subdiv);
    })
    socket.on('user_edit_get_tree_for_user', async function (login) {
      console.log(login);
      const user = await User.findOne({
        login
      })
      // console.log(subdiv);
      socket.emit('user_edit_tree_for_user', user);
    })
    socket.on('subdiv_get_name_servers_forTree', async function (data) {
      // console.log('data', data);
      // console.log('data1', data.length);

      // dataPush.push(2);
      // try {
      var dataPush = [];
      let counter = 0;
      // dataPush.splice(0, 1000);

      async function FindA() {

        try {
          for (let i = 0; i < data.length; i++) {
            let servers = await Server.findOne({
              name: data[i]
            }).lean();
            dataPush.push(servers);
          }
        } catch (error) {
          socket.emit('subdiv_add_name_servers_forTree', 0);
        }
        socket.emit('subdiv_add_name_servers_forTree', dataPush);
      }
      await FindA();

    });

    socket.on('user_get_name_servers_forTree', async function (data) {
      console.log('data', data);
      var dataPush = [];
      let counter = 0;
      // dataPush.splice(0, 1000);

      async function FindC() {

        try {
          for (let i = 0; i < data.servers.length; i++) {
            let findServers = await Subdiv.findOne({
              city: data.city,
              complex: data.complex,
              name: data.subdiv
            });
            // console.log('fS', findServers);
            let filterS = findServers.servers.find(item => item.name === data.servers[i])
            // console.log(filterS);
            // console.log('servers', findServers);
            dataPush.push(filterS);
          }
        } catch (error) {
          socket.emit('user_add_name_servers_forTree', 0);
        }
        socket.emit('user_add_name_servers_forTree', dataPush);
      }
      console.log(dataPush);
      await FindC();

    })

    socket.on('user_edit_get_servers_forTree', async function (data) {
      console.log('data', data);
      var dataPush = [];
      let counter = 0;
      // dataPush.splice(0, 1000);

      async function FindD() {

        try {
          for (let i = 0; i < data.servers.length; i++) {
            let findServers = await Subdiv.findOne({
              city: data.city,
              complex: data.complex,
              name: data.subdiv
            });
            // console.log('fS', findServers);
            let filterS = findServers.servers.find(item => item.name === data.servers[i])
            // console.log(filterS);
            console.log('servers', findServers);
            dataPush.push(filterS);
          }
        } catch (error) {
          socket.emit('user_edit_servers_forTree', 0);
        }
        socket.emit('user_edit_servers_forTree', dataPush);
      }
      // console.log(dataPush);
      await FindD();

    })

    socket.on('subdiv_edit_get_servers_forTree', async function (data) {
      console.log(data);
      let dataPush = new Array;
      async function Find() {
        try {
          for (let i = 0; i < data.length; i++) {
            let servers = await Server.findOne({
              name: data[i]
            }).lean();
            dataPush.push(servers);

          }
        } catch (error) {

        }
        socket.emit('subdiv_edit_servers_forTree', dataPush);
      }
      // var dataPush = []
      await Find();
    });


    socket.on('server_get_name_complex', async function (data) {

      let complex = await Complex.find({
        city: data
      }).lean();

      socket.emit('server_get_complex', complex);
    });
    socket.on('user_get_name_complex', async function (data) {

      let complex = await Complex.find({
        city: data
      }).lean();

      socket.emit('user_get_complex', complex);
    });
    socket.on('user_get_name_subdiv', async function (data) {
      let subdiv = await Subdiv.find({
        complex: data
      }).lean();
      // console.log(subdiv);
      socket.emit('user_get_subdiv', subdiv);
    });

    socket.on('add_task', async function (data) {
      console.log(data);
      console.log('add_task');
      let findUser = await ModelSocket.findOne({
        name: data
      })
      socket.to(findUser.socket).emit('new_tasks', 'Добавлена новая задача')

    })

  });
}
=======
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
>>>>>>> master
