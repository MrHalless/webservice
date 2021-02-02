const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const { checkAccess } = require('../middleware/checkAccess');

router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewFileHandling.viewJournalSubdiv.flag) {


      res.render('journal/journal_subdiv', {
        title: 'Журнал подразделения',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.get('/settings_file_subdiv', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewFileHandling.viewJournalSubdiv.flag) {


      res.render('journal/settings_file_subdiv', {
        title: 'Редактирование журнала',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.get('/settings_file_subdiv/file_info', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewFileHandling.viewJournalSubdiv.flag) {


      res.render('journal/file_info', {
        title: 'Информация о файле',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.get('/settings_file_subdiv/log_info', checkAuth, async (req, res) => {

  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewFileHandling.viewJournalSubdiv.flag) {

      // делаем запрос в базу для получения данных о задаче
      res.render('journal/log_info', {
        title: 'Информация о задаче',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

module.exports = router;
