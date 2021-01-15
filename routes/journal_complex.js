const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('journal/journal_complex', {
    title: 'Журнал комплекса',
    login: req.session.user,
  });
});

router.get('/settings_file_complex', checkAuth, (req, res) => {
  res.render('journal/settings_file_complex', {
    title: 'Редактирование журнала',
    login: req.session.user,
  });
});

router.get('/settings_file_complex/file_info', checkAuth, (req, res) => {
  res.render('journal/file_info', {
    title: 'Информация о файле',
    login: req.session.user,
  });
});

router.get('/settings_file_complex/log_info', checkAuth, (req, res) => {
  // делаем запрос в базу для получения данных о задаче
  res.render('journal/log_info', {
    title: 'Информация о задаче',
    login: req.session.user,
  });
});

module.exports = router;
