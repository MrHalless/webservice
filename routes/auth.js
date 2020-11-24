const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get('/', (req, res) => {
  res.render('login', {
    layout: 'empty',
    title: 'Авторизация',
    isLogin: true,
  });
});

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const candidate = await User.findOne({ login });

    if (candidate) {
      const areSame = password === candidate.password;

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect('/index');
        });
      } else {
        res.redirect('/');
      }
    } else {
      res.redirect('/');
    }
  } catch (e) {
    console.log(e);
  }

  req.session.isAuthenticated = true;
  res.redirect('/index');
});

module.exports = router;
