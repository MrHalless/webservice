const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('pms', {
    title: 'Приоретизация ПМС',
    login: req.session.user.login,
  });
});

module.exports = router;
