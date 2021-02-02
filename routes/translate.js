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
});

module.exports = router;
