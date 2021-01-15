const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('pms', {
    title: 'Приоретизация ПМС',
    login: req.session.user,
  });
});

router.get('/statistic', checkAuth, (req, res) => {
  res.render('pms_statistic', {
    title: 'Статистика ПМС',
    login: req.session.user,
  });
});

module.exports = router;
