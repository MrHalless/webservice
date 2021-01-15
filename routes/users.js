const { Router } = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/checkAuth');
const { deleteOne } = require('../models/user');
const AccessControl = require('../models/accesscontrol');
const { LOGIN_ADMIN } = require('../keys/keys');
const Shell = require('node-powershell');
const BindingUser = require('../models/bindingUser');
// const express = require('express');
// const app = express();
// const io = app.get('socketio');
// const server = require('http').createServer(app);
// const io = require('../index');
// const http = require('../index');
// const { io } = require('../index');
// const socketio = require('socket.io');
// const { connection } = require('mongoose');
// const io = socketio(server);

router.get('/', checkAuth, async (req, res) => {
  const users = await User.find().lean();

  let io = req.app.get('socketio');
  io.on('hello', (socket) => {
    socket.emit('user', 'test112');
  });

  // io.sockets.emit('user', 'ПРИВет');
  // socket.emit('user', 'Привет');

  res.render('users/users', {
    title: 'Пользователи',
    login: req.session.user,
    users,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.get('/addusers', checkAuth, async (req, res) => {
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
  });
  // получаем список пользователей в группе
  //
  ps.addCommand(
    `echo (Get-ADGroupMember -Identity 'Initialization' | where objectclass -eq 'user' | ft name)`
  );

  await ps
    .invoke()
    .then((output) => {
      // отсчет идет с 2 значения
      // 0-1 вывод из powershell - пропускаем
      let users = [];
      let temp = output.trim().split('\r\n');
      for (let i = 2; i < temp.length; i++) {
        users.push(temp[i].trim());
        // console.log(temp[i]);
      }
      console.log(users);
      // поиск в массиве по значению, которому ищем.
      //
      //
      const findUser = users.includes('morozov2');
      console.log('findUser', findUser);
    })
    .catch((err) => {
      console.log(err);
    });

  try {
    const access = await AccessControl.find().lean();
    res.render('users/addusers', {
      title: 'Добавление пользователя',
      login: req.session.user,
      success: req.flash('success'),
      error: req.flash('error'),
      access,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/editusers', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Данные пользователя изменены');
    res.redirect('/users');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Данные пользователя не изменены');
    res.redirect('/users');
  }
});

router.get('/:id/bindinguser', checkAuth, async (req, res) => {
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

    const findUserLocal = await User.findOne({ _id: req.params.id }).lean();

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
});

router.post('/:id/binduser', checkAuth, async (req, res) => {
  try {
    const { userLocal, userDomain } = req.body;
    const bindingUser = new BindingUser({
      userLocal,
      userDomain,
    });
    await bindingUser.save();
    req.flash('success', 'Доменная учетная запись приклеплена');
    res.redirect('/users');
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/untieuser', checkAuth, async (req, res) => {
  try {
    const deleteUser = await User.findOne({ _id: req.params.id });
    await BindingUser.deleteOne({ userLocal: deleteUser.login });
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

  const user = await User.findById(req.params.id).lean();
  res.render('users/editusers', {
    title: 'Редактирование пользователя',
    login: req.session.user,
    user,
  });
});

router.get('/:id/user_delete', checkAuth, async (req, res) => {
  res.render('users/user_delete', {
    title: 'Удаление пользователя',
    login: req.session.user,
  });
});

router.post('/:id/user_delete', checkAuth, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
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
    const { login, password, template, typeAccount } = req.body;

    if (login === LOGIN_ADMIN) {
      req.flash('error', 'Ошибка добавления пользователя');
      res.redirect('/users/addusers');
    } else {
      const candidate = await User.findOne({ login });

      if (candidate) {
        // ! пользователь существует с таким именем
        req.flash('error', 'Пользователь с таким именем существует');
        res.redirect('/users/addusers');
      } else {
        const templateName = await AccessControl.findOne({ template });
        console.log('проверка', templateName);
        const hashPassword = await bcrypt.hash(password, 10);
        // ! решить вопрос где хранить авторизован ли пользователь
        const user = new User({
          login,
          password: hashPassword,
          typeUser: template,
          typeAccount,
          templateName: templateName.name,
        });
        await user.save();
        req.flash('success', 'Пользователь добавлен');
        res.redirect('/users');
      }
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
