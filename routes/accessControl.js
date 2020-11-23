const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('accesscontrol', {
    title: 'Главная страница',
  });
});

module.exports = router;
