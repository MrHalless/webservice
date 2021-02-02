const {
  Router
} = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const {
  checkAccess
} = require('../middleware/checkAccess');
const Subdiv = require('../models/subdiv');
const Complex = require('../models/complex');
const io = require('../middleware/socket')
const {
  LANG
} = require('../keys/keys');

// var TreeData;
router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewSubdivs.flag) {
      const subdiv = await Subdiv.find().lean();
      const langArray = new Array;
      subdiv.forEach(el => {

        el.servers.forEach(serv => {
          serv.languages.forEach(lang => {
            langArray.push(lang);
          })

        })
      })
      const lang = Array.from(new Set(langArray));
      res.render('subdiv/subdiv', {
        title: 'Подразделения',
        login: req.session.user,
        flag,
        lang,
        subdiv,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.get('/subdiv_add', checkAuth, async (req, res) => {

  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewSubdivs.flag) {


      const complex = await Complex.find().lean();
      const city = [];
      complex.forEach(element => {
        city.push(element.city);
      });
      const filterCity = Array.from(new Set(city))

      res.render('subdiv/subdiv_add', {
        title: 'Добавление подразделения',
        login: req.session.user,
        flag,
        filterCity,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.post('/subdiv_add', checkAuth, async (req, res) => {
  console.log('body1123', req.body);
  const {
    name,
    city,
    complex,
    servers,
    test
  } = req.body;
  // console.log(JSON.parse(test));

  const Qarray = [];
  Qarray.push(servers);

  const tempArray = [].concat(...Qarray);

  let serversArray = new Array;
  tempArray.forEach(async server => {
    let languages = new Array;
    const temp = JSON.parse(test).find(item => item.id === server)
    temp.value.forEach(element => {
      const langFirst = LANG.find(item => item.code === element.split('/')[0]).name;
      const langSecond = LANG.find(item => item.code === element.split('/')[1]).name;
      languages.push({
        first: element.split('/')[0],
        second: element.split('/')[1],
        firstDescription: langFirst,
        secondDescription: langSecond
      })
    });
    serversArray.push({
      name: server,
      languages: languages
    })
  });
  const subdiv = new Subdiv({
    name,
    city,
    complex,
    servers: serversArray
  })
  try {
    await subdiv.save();
    req.flash('success', 'Подразделение добавлено');
    res.redirect('/subdiv')
  } catch (error) {

  }
})

router.get('/:id/subdiv_edit', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewSubdivs.flag) {
      try {
        const subdiv = await Subdiv.findById(req.params.id).lean();

        res.render('subdiv/subdiv_edit', {
          title: 'Редактирование подразделения',
          login: req.session.user,
          subdiv,
          subdiv_edit: true,
          flag
        });
      } catch (error) {
        req.flash('error', 'Ошибка получения данных');
        res.redirect('/subdiv');
      }
    }
  }
});

router.post('/:id/subdiv_edit', checkAuth, async (req, res) => {
  console.log('body', req.body);
  const {
    name,
    city,
    complex,
    servers,
    edit
  } = req.body;
  // console.log(JSON.parse(test));


  let serversArray = new Array;
  const Qarray = [];
  Qarray.push(servers);

  const tempArray = [].concat(...Qarray);
  tempArray.forEach(async server => {
    let languages = new Array;
    const temp = JSON.parse(edit).find(item => item.id === server)
    temp.value.forEach(element => {
      const langFirst = LANG.find(item => item.code === element.split('/')[0]).name;
      const langSecond = LANG.find(item => item.code === element.split('/')[1]).name;
      languages.push({
        first: element.split('/')[0],
        second: element.split('/')[1],
        firstDescription: langFirst,
        secondDescription: langSecond
      })
    });
    serversArray.push({
      name: server,
      languages: languages
    })
  });

  // const subdiv = new Subdiv({
  //   name,
  //   city,
  //   complex,
  //   servers: serversArray
  // })
  try {
    await Subdiv.findByIdAndUpdate(req.params.id, {
      name,
      city,
      complex,
      servers: serversArray
    });
    req.flash('success', 'Подразделение обновлено');
    res.redirect('/subdiv')
  } catch (error) {

  }
})

router.get('/:id/subdiv_delete', checkAuth, async (req, res) => {
  res.render('subdiv/subdiv_delete', {
    title: 'Удаление подразделения',
    login: req.session.user,
  });
});

router.post('/:id/subdiv_delete', checkAuth, async (req, res) => {
  try {
    await Subdiv.deleteOne({
      _id: req.params.id
    });

    req.flash('success', 'Подразделение удалено');
    res.redirect('/subdiv');
  } catch (error) {
    req.flash('error', 'Подразделение не удалено');
    res.redirect('/subdiv');
    console.log(error);
  }
});



module.exports = router;