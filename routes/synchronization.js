const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('synchronization', {
    title: 'Главная страница',
  });
});

module.exports = router;
