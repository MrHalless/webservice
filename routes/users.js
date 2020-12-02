const { Router } = require('express');
const User = require('../models/user');
const router = Router();
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('users/users', {
    title: 'Пользователи',
    login: req.session.user.login,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.get('/addusers', checkAuth, (req, res) => {
  res.render('users/addusers', {
    title: 'Добавление пользователя',
    login: req.session.user.login,
    success: req.flash('success'),
  });
});

router.post('/addusers', async (req, res) => {
  //авторизация
  try {
    const { login, password, typeUser } = req.body;

    const candidate = await User.findOne({ login });
    if (candidate) {
      // ! пользователь существует с таким именем
      req.flash('error', 'Пользователь с таким именем существует');
      res.redirect('/addusers');
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({
        login,
        password: hashPassword,
        typeUser,
        isAuthenticated: false,
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
