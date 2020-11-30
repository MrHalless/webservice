const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const checkAuth = require('../middleware/checkAuth');
const { db } = require('../models/user');
// const { Mongoose } = require('mongoose');
const router = Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.render('login', {
    layout: 'empty',
    title: 'Авторизация',
  });
});

// await Course.deleteOne({
//   _id: req.body.id,
//   userId: req.user._id
// })
// res.redirect('/courses')
// } catch (e) {
// console.log(e)

router.get('/logout', checkAuth, async (req, res) => {
  req.session.destroy(() => {
    // db.sessions.remove(req.body.id);
    //   // req.session.id.destroy();
    //   // req.session.cookie.destroy();
    res.redirect('/');
  });
});

router.post('/', async (req, res) => {
  // // ! временное добавление пользователей
  // try {
  //   const { login, password } = req.body;
  //   const candidate = await User.findOne({ login });
  //   if (candidate) {
  //     // ! пользователь существует с таким именем
  //     res.redirect('/');
  //   } else {
  //     const hashPassword = await bcrypt.hash(password, 10);
  //     const user = new User({
  //       login,
  //       password: hashPassword,
  //     });
  //     await user.save();
  //     res.redirect('/index');
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
  // ! авторизация
  try {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });
    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.settings = false;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect('/index');
        });
      } else {
        req.flash('error', 'Ошибка аутентификации');
        res.redirect('/');
      }
    } else {
      req.flash('error', 'Ошибка аутентификации');
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
