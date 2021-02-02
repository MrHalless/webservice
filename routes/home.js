const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const { checkAccess } = require('../middleware/checkAccess');

router.get('/', checkAuth, (req, res) => {
  res.render('index', {
    title: 'Главная страница',
    login: req.session.user.login,
    settings: req.session.settings,
    success: req.flash('success'),
  });
  console.log("11", req.ntlm)
});

router.post('/', checkAuth, (req, res) => {
  if (req.session.isAuthenticated) {
    res.render('/index', {
      title: 'Главная страница',
      settings: req.session.settings,
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
