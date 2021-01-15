const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('filehandling', {
    title: 'Обработка файлов',
    login: req.session.user,
  });
});

module.exports = router;
