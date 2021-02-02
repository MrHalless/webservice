const {
  Router
} = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const {
  checkAccess
} = require('../middleware/checkAccess');
const {
  io
} = require('../index');
const ModelSocket = require('../models/modelSocket');


router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewTasks.viewTasksAPK.flag) {
      // const peshkova = await ModelSocket.findOne({
      //   name: 'peshkova'
      // });


      // let io = req.app.get('socketio');
      // io.to(`${peshkova.socket}`).emit('user', 'test1222')
      // io.on('hello', (socket) => {
      //   socket.on('hello', () => {
      //     console.log('yyyy');
      //   })
      //   console.log(socket);
      //   console.log('test');
      //   // socket.emit('user', 'test112');
      // });
      res.render('tasks/tasks_apk', {
        title: 'Задачи АПК',
        login: req.session.user,
        flag,
        task: true,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

// router.post('/', checkAuth, async (req, res) => {
//   const flag = await checkAccess(req);
//   if (flag === false) {
//     res.redirect('/error');
//   } else {
//     if (flag.view.views.viewTasks.viewTasksAPK.flag) {

//       res.render('tasks/tasks_apk', {
//         title: 'Задачи АПК',
//         login: req.session.user,
//         flag,
//         success: req.flash('success'),
//         error: req.flash('error'),
//       });
//     }
//   }
// })

module.exports = router;