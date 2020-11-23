const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('journal', {
    title: 'Главная страница',
  });
});

module.exports = router;
