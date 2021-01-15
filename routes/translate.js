const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('translate', {
    title: 'Главная страница',
    login: req.session.user,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

module.exports = router;
