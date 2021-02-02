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
    if (flag.view.views.viewChat.flag) {


      res.render('chat/chat', {
        title: 'Главная страница',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
=======
router.get('/', checkAuth, (req, res) => {
  res.render('chat', {
    title: 'Главная страница',
    login: req.session.user,
  });
>>>>>>> master
});

module.exports = router;
