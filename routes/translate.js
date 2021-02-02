const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const { checkAccess } = require('../middleware/checkAccess');

<<<<<<< HEAD

router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewTranslate.flag === true) {
      res.render('translate/translate', {
        title: 'Перевод слов',
        login: req.session.user,
        flag,
        translate: true,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    } else {
      res.redirect('/error');
    }
  }
=======
router.get('/', checkAuth, (req, res) => {
  res.render('translate', {
    title: 'Главная страница',
    login: req.session.user,
    success: req.flash('success'),
    error: req.flash('error'),
  });
>>>>>>> master
});

module.exports = router;
