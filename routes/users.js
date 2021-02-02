const {
  Router
} = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/checkAuth');
const {
  deleteOne
} = require('../models/user');
const AccessControl = require('../models/accesscontrol');
const {
  LOGIN_ADMIN
} = require('../keys/keys');
const Shell = require('node-powershell');
const BindingUser = require('../models/bindingUser');
const {
  checkAccess
} = require('../middleware/checkAccess')
const Complex = require('../models/complex')
const {
  LANG
} = require('../keys/keys');


router.get('/', checkAuth, async (req, res) => {

  const flag = await checkAccess(req);
  if (flag.view.views.viewStructure.viewUsers.flag) {
    const users = await User.find({
      login: {
        $nin: 'admin'
      }
    }).lean();


    // let io = req.app.get('socketio');
    // io.on('hello', (socket) => {
    //   socket.on('hello', () => {
    //     console.log('yyyy');
    //   })
    //   console.log(socket);
    //   console.log('testsss');
    //   // socket.emit('user', 'test112');
    // });

    // // io.sockets.emit('user', 'ПРИВет');
    res.render('users/users', {
      title: 'Пользователи',
      login: req.session.user,
      users,
      flag,
      success: req.flash('success'),
      error: req.flash('error'),
    });
  } else {
    res.redirect('/error');
  }

});

router.get('/addusers', checkAuth, async (req, res) => {

  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewUsers.flag) {
      // const ps = new Shell({
      //   executionPolicy: 'Bypass',
      //   noProfile: true,
      // });
      // // получаем список пользователей в группе
      // //
      // ps.addCommand(
      //   `echo (Get-ADGroupMember -Identity 'Initialization' | where objectclass -eq 'user' | ft name)`
      // );

      // await ps
      //   .invoke()
      //   .then((output) => {
      //     // отсчет идет с 2 значения
      //     // 0-1 вывод из powershell - пропускаем
      //     let users = [];
      //     let temp = output.trim().split('\r\n');
      //     for (let i = 2; i < temp.length; i++) {
      //       users.push(temp[i].trim());
      //       // console.log(temp[i]);
      //     }
      //     console.log(users);
      //     // поиск в массиве по значению, которому ищем.
      //     //
      //     //
      //     const findUser = users.includes('morozov2');
      //     console.log('findUser', findUser);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      try {
        const access = await AccessControl.find({
          name: {
            $nin: '63125c8d-653e-403a-9612-9a0db08b63c9'
          }
        }).lean();
        const complex = await Complex.find().lean();
        const city = [];
        complex.forEach(element => {
          city.push(element.city);
        });
        const filterCity = Array.from(new Set(city))
        res.render('users/addusers', {
          title: 'Добавление пользователя',
          login: req.session.user,
          filterCity,
          success: req.flash('success'),
          error: req.flash('error'),
          flag,
          access,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.redirect('/error');
    }
  }



});

router.post('/:id/editusers', async (req, res) => {
  console.log(req.body);
  // ---------------------------------------------------------

  const tName = await AccessControl.findOne({
    template: req.body.template
  })
  // console.log(tName);
  req.body.typeUser = tName.template;
  // ---------------------------------------------------------
  // console.log(req.body);
  const {
    name,
    surname,
    patronymic,
    city,
    complex,
    subdiv,
    servers,
    login,
    password,
    template,
    typeAccount,
    pairs,
  } = req.body;
  const Qarray = [];
  Qarray.push(servers);

  const tempArray = [].concat(...Qarray);

  let serversArray = new Array;
  tempArray.forEach(server => {
    let languages = new Array;
    const temp = JSON.parse(pairs).find(item => item.id === server)
    console.log('1123123', temp);
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

  console.log(req.body);
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name,
      surname,
      patronymic,
      city,
      complex,
      subdiv,
      login,
      servers: serversArray,
      password,
      typeUser: template,
      typeAccount,
      templateName: tName.name,
    });
    req.flash('success', 'Данные пользователя изменены');
    res.redirect('/users');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Данные пользователя не изменены');
    res.redirect('/users');
  }
});

router.get('/:id/bindinguser', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewMatrix.flag) {
      // тут загружаем группы из домена, которые у нас в главной группе PLO
      const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true,
      });
      try {
        // добавляют команду для powershell
        // выводим на экран пользователей имеющих главную группу.
        ps.addCommand(
          `echo (Get-ADGroupMember -Identity 'Initialization' | where objectclass -eq 'user' | ft name)`
        );

        let map = new Map();
        let mapAll = new Map();
        await ps
          .invoke()
          .then(async (output) => {
            let temp = output.trim().split('\r\n');
            for (let i = 2; i < temp.length; i++) {
              ps.addCommand(
                `echo (Get-ADUser -Identity '${temp[i].trim()}' | select SID)`
              );
              await ps
                .invoke()
                .then((output) => {
                  let temp2 = output.trim().split('\r\n');
                  for (let j = 2; j < temp2.length; j++) {
                    map.set(temp[i].trim(), temp2[j].trim());
                    mapAll.set(temp[i].trim(), temp2[j].trim());
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log('ошибка', err);
          });

        const fullBindingUser = await BindingUser.find().lean();
        fullBindingUser.forEach((value) => {
          let key = [...map].find(([, v]) => v === value.userDomain);
          if (map.has(key[0])) {
            map.delete(key[0]);
          }
        });

        const findUserLocal = await User.findOne({
          _id: req.params.id
        }).lean();

        // находим в привязке шаблон
        const candidate = await BindingUser.findOne({
          userLocal: findUserLocal.login,
        }).lean();
        let find;
        let findName;
        if (candidate) {
          let key = [...mapAll].find(([, v]) => v === candidate.userDomain);
          console.log(key);
          findName = key[0];
          find = candidate;
        } else {
          find = '';
        }
        res.render('users/bindinguser', {
          title: 'Связывание',
          findUserLocal,
          find,
          findName,
          map,
          login: req.session.user,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
});

router.post('/:id/binduser', checkAuth, async (req, res) => {
  try {
    const {
      userLocal,
      userDomain
    } = req.body;
    const bindingUser = new BindingUser({
      userLocal,
      userDomain,
    });
    await bindingUser.save();
    req.flash('success', 'Доменная учетная запись прикреплена');
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/untieuser', checkAuth, async (req, res) => {
  try {
    const deleteUser = await User.findOne({
      _id: req.params.id
    });
    await BindingUser.deleteOne({
      userLocal: deleteUser.login
    });
    req.flash('success', 'Доменная учетная запись откреплена');
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id/editusers', checkAuth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/users');
  }
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewUsers.flag) {
      const access = await AccessControl.find({
        name: {
          $nin: '63125c8d-653e-403a-9612-9a0db08b63c9'
        }
      }).lean();
      const user = await User.findById(req.params.id).lean();
      const templateCheck = user.templateName;
      // console.log(user);
      res.render('users/editusers', {
        title: 'Редактирование пользователя',
        login: req.session.user,
        access,
        user,
        templateCheck,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.get('/:id/user_delete', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewStructure.viewUsers.flag) {
      res.render('users/user_delete', {
        title: 'Удаление пользователя',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.post('/:id/user_delete', checkAuth, async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    req.flash('success', 'Пользователь удален');
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

router.post('/addusers', async (req, res) => {
  //добавление пользователя
  console.log(req.body);
  try {
    const {
      name,
      surname,
      patronymic,
      city,
      complex,
      subdiv,
      servers,
      login,
      password,
      template,
      typeAccount,
      pairs,
    } = req.body;


    const candidate = await User.findOne({
      login
    });

    if (candidate) {
      // ! пользователь существует с таким именем
      req.flash('error', 'Пользователь с таким именем существует');
      res.redirect('/users/addusers');
    } else {
      const templateName = await AccessControl.findOne({
        template
      });
      console.log('проверка', templateName);
      const hashPassword = await bcrypt.hash(password, 10);
      // ! решить вопрос где хранить авторизован ли пользователь

      const Qarray = [];
      Qarray.push(servers);

      const tempArray = [].concat(...Qarray);

      let serversArray = new Array;
      tempArray.forEach(async server => {
        let languages = new Array;
        const temp = JSON.parse(pairs).find(item => item.id === server)
        console.log('add', temp);
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
      const user = new User({
        name,
        surname,
        patronymic,
        city,
        complex,
        subdiv,
        login,
        servers: serversArray,
        password: hashPassword,
        typeUser: template,
        typeAccount,
        templateName: templateName.name,
      });
      await user.save();
      req.flash('success', 'Пользователь добавлен');
      res.redirect('/users');
    }

  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

// поиск в группе пользователей
// Get-ADGroupMember -Identity 'Initialization' | where objectclass -eq 'user' | ft name
//
// поиск пользователей и во вложенных групах
//
// Get-ADGroupMember -Identity 'Initialization' -Recursive | where objectclass -eq 'user' | ft name