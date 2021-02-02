const {
  Router
} = require('express');
const router = Router();
const Server = require('../models/server');
const checkAuth = require('../middleware/checkAuth');
const {
  checkAccess
} = require('../middleware/checkAccess');
const Complex = require('../models/complex');

const fetch = require('node-fetch');

router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewServers.flag) {


      const server = await Server.find().lean();
      res.render('servers/servers', {
        title: 'Серверы',
        login: req.session.user,
        server,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.get('/server_add', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewServers.flag) {

      const complex = await Complex.find().lean();
      const city = [];
      complex.forEach(element => {
        city.push(element.city);
      });
      const filterCity = Array.from(new Set(city))

      res.render('servers/server_add', {
        title: 'Добавление сервера',
        login: req.session.user,
        flag,
        filterCity,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.post('/server_add', async (req, res) => {
  //добавление сервера
  console.log(req.body);
  let tempLanguages = [];
  try {
    const {
      name,
      city,
      complex,
      ip,
      port,
      languages,
    } = req.body;
    const Qarray = [];
    Qarray.push(languages);
    console.log('tA', Qarray);
    const response = await fetch(`http://${ip}:${port}/info`);
    const data = await response.json();
    // console.log(data);
    // console.log(req.body);
    // console.log(languages.length);
    // console.log(Qarray.length);
    const tempArray = [].concat(...Qarray);
    for (let i = 0; i < tempArray.length; i++) {
      const firstDescription = data.langs.find(item => item.code === tempArray[i].split('/')[0]).name;
      // console.log('fd', firstDescription);
      const secondDecription = data.langs.find(item => item.code === tempArray[i].split('/')[1]).name;
      // console.log(secondDecription);
      tempLanguages.push({
        'first': tempArray[i].split('/')[0],
        'second': tempArray[i].split('/')[1],
        'firstDescription': firstDescription,
        'secondDescription': secondDecription,
      });
    }
    // console.log(tempLanguages);
    // let tempLanguages = languages.split('-');
    // console.log(tempLanguages);
    // console.log(tempLanguages);

    const candidate = await Server.findOne({
      name,
      city,
      complex,
      ip,
      port,

    });
    if (candidate) {
      // ! Комплекс существует с таким именем
      req.flash('error', 'Сервер уже существует');
      res.redirect('/servers/server_add');
    } else {
      const server = new Server({
        name,
        city,
        complex,
        ip,
        port,
        languages: tempLanguages,
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
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewServers.flag) {
      try {
        console.log('тут');
        const server = await Server.findById(req.params.id).lean();
        const response = await fetch(`http://${server.ip}:${server.port}/info`);
        const data = await response.json();

        res.render('servers/server_edit', {
          title: 'Редактирование сервера',
          login: req.session.user,
          server,
          flag,
          data,
          server_edit: true,
        });
      } catch (error) {
        req.flash('error', 'Ошибка получения данных');
        res.redirect('/servers');
      }

    }
  }
});

router.post('/:id/server_edit', async (req, res) => {
  console.log(req.body);
  let tempLanguages = [];
  try {
    const {
      name,
      city,
      complex,
      ip,
      port,
      languages
    } = req.body;
    const response = await fetch(`http://${ip}:${port}/info`);
    const data = await response.json();
    for (let i = 0; i < languages.length; i++) {
      const firstDescription = data.langs.find(item => item.code === languages[i].split('/')[0]).name;
      const secondDecription = data.langs.find(item => item.code === languages[i].split('/')[1]).name;
      tempLanguages.push({
        'first': languages[i].split('/')[0],
        'second': languages[i].split('/')[1],
        'firstDescription': firstDescription,
        'secondDescription': secondDecription
      });
    }
    await Server.findByIdAndUpdate(req.params.id, {
      $set: {
        name,
        city,
        complex,
        ip,
        port,
        languages: tempLanguages,
      },
    });
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
    await Server.deleteOne({
      _id: req.params.id
    });

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