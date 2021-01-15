const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, (req, res) => {
  res.render('journal/journal_operator', {
    title: 'Журнал подразделения',
    login: req.session.user,
  });
});

router.get('/settings_file_operator', checkAuth, (req, res) => {
  res.render('journal/settings_file_operator', {
    title: 'Редактирование журнала',
    login: req.session.user,
  });
});

router.get('/settings_file_operator/file_info', checkAuth, (req, res) => {
  res.render('journal/file_info', {
    title: 'Информация о файле',
    login: req.session.user,
  });
});

router.get('/settings_file_operator/log_info', checkAuth, (req, res) => {
  // делаем запрос в базу для получения данных о задаче
  res.render('journal/log_info', {
    title: 'Информация о задаче',
    login: req.session.user,
  });
});

module.exports = router;
