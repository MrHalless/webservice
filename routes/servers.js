const { Router } = require('express');
const router = Router();
const Server = require('../models/server');
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, async (req, res) => {
  const server = await Server.find().lean();
  res.render('servers/servers', {
    title: 'Серверы',
    login: req.session.user,
    server,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.get('/server_add', checkAuth, (req, res) => {
  res.render('servers/server_add', {
    title: 'Добавление сервера',
    login: req.session.user,
  });
});

router.post('/server_add', async (req, res) => {
  //добавление сервера

  try {
    const { name, city, military, complex, ip, port, languages } = req.body;
    const candidate = await Server.findOne({
      name,
      city,
      military,
      complex,
      ip,
      port,
      languages,
    });
    if (candidate) {
      // ! Комплекс существует с таким именем
      req.flash('error', 'Сервер уже существует');
      res.redirect('/servers/server_add');
    } else {
      const server = new Server({
        name,
        city,
        military,
        complex,
        ip,
        port,
        languages,
      });
      await server.save();
      req.flash('success', 'Сервер добавлен');
      res.redirect('/servers');
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id/server_edit', checkAuth, async (req, res) => {
  const server = await Server.findById(req.params.id).lean();
  // console.log(server);
  res.render('servers/server_edit', {
    title: 'Редактирование сервера',
    login: req.session.user,
    server,
  });
});

router.post('/:id/server_edit', async (req, res) => {
  console.log(req.body);
  try {
    await Server.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Данные сервера изменены');
    res.redirect('/servers');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Данные сервера не изменены');
    res.redirect('/servers');
  }
});

router.get('/:id/server_delete', checkAuth, async (req, res) => {
  res.render('servers/server_delete', {
    title: 'Удаление сервера',
    login: req.session.user,
  });
});

router.post('/:id/server_delete', checkAuth, async (req, res) => {
  try {
    await Server.deleteOne({ _id: req.params.id });

    req.flash('success', 'Сервер удален');
    res.redirect('/servers');
  } catch (error) {
    req.flash('error', 'Сервер не удален');
    res.redirect('/servers');
    console.log(error);
  }
});

// router.get('/server_delete', checkAuth, (req, res) => {
//   res.render('servers/server_delete', {
//     title: 'Удаление сервера',
//     login: req.session.user,
//   });
// });

module.exports = router;
