const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const checkAuth = require('../middleware/checkAuth');
// const { db } = require('../models/user');
// const { Mongoose } = require('mongoose');
const router = Router();
// const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.render('login', {
    layout: 'empty',
    title: 'Авторизация',
    error: req.flash('error'),
  });
});

router.get('/logout', checkAuth, async (req, res) => {
  req.session.destroy(() => {
    // db.sessions.remove(req.body.id);
    //   // req.session.id.destroy();
    //   // req.session.cookie.destroy();
    res.redirect('/');
  });
});

// ! авторизация
router.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.settings = true;
        if (candidate.typeUser === 'Pr') {
          req.session.cookie.maxAge = null;
        }
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          req.flash('success', 'Добро пожаловать');
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
