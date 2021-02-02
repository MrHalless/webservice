const {
  Router
} = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const {
  checkAccess
} = require('../middleware/checkAccess');

<<<<<<< HEAD
router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewPMS.viewPrioritizationPMS.flag) {

      res.render('pms/pms', {
        title: 'Приоретизация ПМС',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

router.post('/', checkAuth, async (req, res) => {
  console.log(req.body);

  // res.render('pms/pms', {
  //   title: 'Приоретизация ПМС',
  //   login: req.session.user,

  //   success: req.flash('success'),
  //   error: req.flash('error'),
  // });


});

router.get('/statistic', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewPMS.viewStatisticPMS.flag) {

      res.render('pms/pms_statistic', {
        title: 'Статистика ПМС',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
=======
router.get('/', checkAuth, (req, res) => {
  res.render('pms', {
    title: 'Приоретизация ПМС',
    login: req.session.user,
  });
});

router.get('/statistic', checkAuth, (req, res) => {
  res.render('pms_statistic', {
    title: 'Статистика ПМС',
    login: req.session.user,
  });
>>>>>>> master
});



module.exports = router;