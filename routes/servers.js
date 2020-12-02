const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('servers', {
    title: 'Главная страница',
    login: req.session.user.login,
  });
});

module.exports = router;
