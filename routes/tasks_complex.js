const {
  Router
} = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');
const {
  checkAccess
} = require('../middleware/checkAccess');

router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  } else {
    if (flag.view.views.viewTasks.viewTasksAPK.flag) {

      res.render('tasks/tasks_complex', {
        title: 'Задачи комплекса',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    }
  }
});

module.exports = router;