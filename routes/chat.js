const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('chat', {
    title: 'Главная страница',
  });
});

module.exports = router;
