const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('loginpage', {
    layout: 'empty',
    title: 'Авторизация',
  });
});

module.exports = router;
