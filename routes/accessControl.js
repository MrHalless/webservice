const { Router } = require('express');
const router = Router();
const securityRoutes = require('../middleware/securityRoutes');

router.get('/', securityRoutes, (req, res) => {
  res.render('accesscontrol', {
    title: 'Главная страница',
  });
});

module.exports = router;
