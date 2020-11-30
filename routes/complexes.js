const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('complexes', {
    title: 'Главная страница',
  });
});

module.exports = router;
