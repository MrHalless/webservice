const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const { checkAccess } = require('../middleware/checkAccess');

router.get('/', checkAuth, (req, res) => {
  res.render('buildingcircuits', {
    title: 'Главная страница',
    login: req.session.user,
  });
});

module.exports = router;
