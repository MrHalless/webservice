const { Router } = require('express');
const router = Router();
const AccessControl = require('../models/accesscontrol');
const checkAuth = require('../middleware/checkAuth');
const Shell = require('node-powershell');
const ActiveDirectory = require('activedirectory');
const Binding = require('../models/binding');
<<<<<<< HEAD
const { checkAccess } = require('../middleware/checkAccess');

router.get('/', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewStructure.viewMatrix.flag) {
      const ListAccessControl = await AccessControl.find({ name: { $nin: '63125c8d-653e-403a-9612-9a0db08b63c9' } }).lean();

      res.render('accesscontrol/accesscontrol', {
        title: 'Разграничение доступа',
        ListAccessControl,
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    } else {
      res.redirect('/error');
    }
  }


});

router.get('/accesscontrol_add', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewStructure.viewMatrix.flag) {
      res.render('accesscontrol/accesscontrol_add', {
        title: 'Добавление роли',
        login: req.session.user,
        flag,
        success: req.flash('success'),
        error: req.flash('error'),
      });
    } else {
      res.redirect('/error');
    }
  }

=======

router.get('/', checkAuth, async (req, res) => {
  const ListAccessControl = await AccessControl.find().lean();

  res.render('accesscontrol/accesscontrol', {
    title: 'Разграничение доступа',
    ListAccessControl,
    login: req.session.user,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.get('/accesscontrol_add', checkAuth, (req, res) => {
  res.render('accesscontrol/accesscontrol_add', {
    title: 'Добавление роли',
    login: req.session.user,
    success: req.flash('success'),
    error: req.flash('error'),
  });
>>>>>>> master
});

router.post('/accesscontrol_add', checkAuth, async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      template,

      viewTranslate,
      viewSendHandling,
      viewJournalAPK,
      viewJournalComplex,
      viewJournalSubdiv,
      viewJournalOperator,
      viewFileStatisticAPK,
      viewFileStatisticComplex,
      viewFileStatisticSubdiv,
      viewFileStatisticOperator,
      viewTasksAPK,
      viewTasksComplex,
      viewTasksSubdiv,
      viewTasksOperator,
      viewTasksStatisticAPK,
      viewTasksStatisticComplex,
      viewTasksStatisticSubdiv,
      viewTasksStatisticOperator,
      viewChat,
      viewPrioritizationPMS,
      viewStatisticPMS,
      viewComplexs,
      viewServers,
      viewSubdivs,
      viewUsers,
      viewMatrix,
    } = req.body;

    const candidate = await AccessControl.findOne({ name });
    if (candidate) {
      req.flash('error', 'Роль с таким именем существует');
      res.redirect('/accesscontrol/accesscontrol_add');
    } else {
      const access = new AccessControl({
        name,
        template,

        view: {
          views: {
            viewTranslate: { flag: viewTranslate },
            viewFileHandling: {
              viewSendHandling: {
                flag: viewSendHandling,
              },
              viewJournalAPK: { flag: viewJournalAPK },
              viewJournalComplex: { flag: viewJournalComplex },
              viewJournalSubdiv: { flag: viewJournalSubdiv },
              viewJournalOperator: { flag: viewJournalOperator },
              viewFileStatisticAPK: { flag: viewFileStatisticAPK },
              viewFileStatisticComplex: { flag: viewFileStatisticComplex },
              viewFileStatisticSubdiv: { flag: viewFileStatisticSubdiv },
              viewFileStatisticOperator: { flag: viewFileStatisticOperator },
            },
            viewTasks: {
              viewTasksAPK: {
                flag: viewTasksAPK,
              },
              viewTasksComplex: { flag: viewTasksComplex },
              viewTasksSubdiv: { flag: viewTasksSubdiv },
              viewTasksOperator: { flag: viewTasksOperator },
              viewTasksStatisticAPK: { flag: viewTasksStatisticAPK },
              viewTasksStatisticComplex: { flag: viewTasksStatisticComplex },
              viewTasksStatisticSubdiv: { flag: viewTasksStatisticSubdiv },
              viewTasksStatisticOperator: { flag: viewTasksStatisticOperator },
            },
            viewChat: { flag: viewChat },
            viewPMS: {
              viewPrioritizationPMS: {
                flag: viewPrioritizationPMS,
              },
              viewStatisticPMS: { flag: viewStatisticPMS },
            },
            viewStructure: {
              viewComplexs: { flag: viewComplexs },
              viewServers: { flag: viewServers },
              viewSubdivs: { flag: viewSubdivs },
              viewUsers: { flag: viewUsers },
              viewMatrix: { flag: viewMatrix },
            },
          },
        },
      });

      try {
        await access.save();
        req.flash('success', 'Роль добавлена');
        res.redirect('/accesscontrol');
      } catch (error) {
        req.flash('error', 'Ошибка добавления роли');
        res.redirect('/accesscontrol/accesscontrol_add');
      }
    }
  } catch (error) {
    console.log(error);
    req.flash('error', 'Ошибка добавления роли');
    res.redirect('/accesscontrol');
  }
});

router.post('/:id/accesscontrol_edit', async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      viewTranslate,
      viewSendHandling,
      viewJournalAPK,
      viewJournalComplex,
      viewJournalSubdiv,
      viewJournalOperator,
      viewFileStatisticAPK,
      viewFileStatisticComplex,
      viewFileStatisticSubdiv,
      viewFileStatisticOperator,
      viewTasksAPK,
      viewTasksComplex,
      viewTasksSubdiv,
      viewTasksOperator,
      viewTasksStatisticAPK,
      viewTasksStatisticComplex,
      viewTasksStatisticSubdiv,
      viewTasksStatisticOperator,
      viewChat,
      viewPrioritizationPMS,
      viewStatisticPMS,
      viewComplexs,
      viewServers,
      viewSubdivs,
      viewUsers,
      viewMatrix,
    } = req.body;
    //
    // обновляем параметры
    //
    await AccessControl.findByIdAndUpdate(req.params.id, {
      $set: {
        name,

        'view.views.viewTranslate.flag': viewTranslate,
        'view.views.viewFileHandling.viewSendHandling.flag': viewSendHandling,
        'view.views.viewFileHandling.viewJournalAPK.flag': viewJournalAPK,
        'view.views.viewFileHandling.viewJournalComplex.flag': viewJournalComplex,
        'view.views.viewFileHandling.viewJournalSubdiv.flag': viewJournalSubdiv,
        'view.views.viewFileHandling.viewJournalOperator.flag': viewJournalOperator,
        'view.views.viewFileHandling.viewFileStatisticAPK.flag': viewFileStatisticAPK,
        'view.views.viewFileHandling.viewFileStatisticComplex.flag': viewFileStatisticComplex,
        'view.views.viewFileHandling.viewFileStatisticSubdiv.flag': viewFileStatisticSubdiv,
        'view.views.viewFileHandling.viewFileStatisticOperator.flag': viewFileStatisticOperator,
        'view.views.viewTasks.viewTasksAPK.flag': viewTasksAPK,
        'view.views.viewTasks.viewTasksComplex.flag': viewTasksComplex,
        'view.views.viewTasks.viewTasksSubdiv.flag': viewTasksSubdiv,
        'view.views.viewTasks.viewTasksOperator.flag': viewTasksOperator,
        'view.views.viewTasks.viewTasksStatisticAPK.flag': viewTasksStatisticAPK,
        'view.views.viewTasks.viewTasksStatisticComplex.flag': viewTasksStatisticComplex,
        'view.views.viewTasks.viewTasksStatisticSubdiv.flag': viewTasksStatisticSubdiv,
        'view.views.viewTasks.viewTasksStatisticOperator.flag': viewTasksStatisticOperator,
        'view.views.viewChat.flag': viewChat,
        'view.views.viewPMS.viewPrioritizationPMS.flag': viewPrioritizationPMS,
        'view.views.viewPMS.viewStatisticPMS.flag': viewStatisticPMS,
        'view.views.viewStructure.viewComplexs.flag': viewComplexs,
        'view.views.viewStructure.viewServers.flag': viewServers,
        'view.views.viewStructure.viewSubdivs.flag': viewSubdivs,
        'view.views.viewStructure.viewUsers.flag': viewUsers,
        'view.views.viewStructure.viewMatrix.flag': viewMatrix,
      },
    });
    req.flash('success', 'Данные роли изменены');
    res.redirect('/accesscontrol');
    // }
  } catch (error) {
    console.log(error);
    req.flash('error', 'Данные роли не изменены');
    res.redirect('/accesscontrol');
  }
});

router.get('/:id/accesscontrol_edit', checkAuth, async (req, res) => {
<<<<<<< HEAD
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewStructure.viewMatrix.flag) {
      try {
        const access = await AccessControl.findById(req.params.id).lean();
        console.log(access);
        res.render('accesscontrol/accesscontrol_edit', {
          title: 'Редактирование роли',
          login: req.session.user,
          flag,
          access,
        });
      } catch (error) { }
    } else {
      res.redirect('/error');
    }
  }


});

router.get('/:id/accesscontrol_delete', checkAuth, async (req, res) => {
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewStructure.viewMatrix.flag) {
      try {
        res.render('accesscontrol/accesscontrol_delete', {
          title: 'Удаление роли',
          login: req.session.user,
          flag,
        });
      } catch (error) { }
    } else {
      res.redirect('/error');
    }
  }


=======
  try {
    const access = await AccessControl.findById(req.params.id).lean();
    console.log(access);
    res.render('accesscontrol/accesscontrol_edit', {
      title: 'Редактирование роли',
      login: req.session.user,
      access,
    });
  } catch (error) {}
});

router.get('/:id/accesscontrol_delete', checkAuth, async (req, res) => {
  try {
    res.render('accesscontrol/accesscontrol_delete', {
      title: 'Удаление роли',
      login: req.session.user,
    });
  } catch (error) {}
>>>>>>> master
});

router.post('/:id/accesscontrol_delete', checkAuth, async (req, res) => {
  try {
    const deleteAccess = await AccessControl.findOne({ _id: req.params.id });
    console.log('deleteAccess', deleteAccess);
    await AccessControl.deleteOne({ _id: req.params.id });

    //  это отвязывание
    //  надо удалить после удаления роли
    //  зависимость
    await Binding.deleteOne({ template: deleteAccess.template });
    req.flash('success', 'Роль удалена');
    res.redirect('/accesscontrol');
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id/binding', checkAuth, async (req, res) => {
<<<<<<< HEAD
  const flag = await checkAccess(req);
  if (flag === false) {
    res.redirect('/error');
  }
  else {
    if (flag.view.views.viewStructure.viewMatrix.flag) {
      // тут загружаем группы из домена, которые у нас в главной группе PLO
      const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true,
      });
      try {
        // добавляют команду для powershell
        // выводим на экран дочерние группы главной группы.
        ps.addCommand(
          `echo (Get-ADGroupMember -Identity 'Initialization' | where objectclass -eq 'group' | ft name)`
        );
        let groups = [];
        await ps
          .invoke()
          .then((output) => {
            let temp = output.trim().split('\r\n');
            for (let i = 2; i < temp.length; i++) {
              groups.push(temp[i].trim());
            }
            // console.log(groups);
          })
          .catch((err) => {
            console.log('ошибка', err);
          });

        const access = await AccessControl.findById(req.params.id).lean();
        const fullBinding = await Binding.find().lean();
        console.log(fullBinding);
        fullBinding.forEach((value) => {
          groups = groups.filter((item) => item !== value.groupDomain);
        });
        const template = access.name;
        console.log('роль', template);
        // находим в привязке шаблон
        const candidate = await Binding.findOne({ template }).lean();
        console.log('candidate', candidate);
        let find;
        if (candidate) {
          find = candidate.groupDomain;
        } else {
          find = '';
        }
        console.log(find);
        res.render('accesscontrol/binding', {
          title: 'Связывание',
          access,
          find,
          flag,
          groups,
          login: req.session.user,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.redirect('/error');
    }
  }


});

router.post('/:id/bind', checkAuth, async (req, res) => {
  try {
    const { groupDomain, template } = req.body;

    const binding = new Binding({
      groupDomain,
      template,
    });
    await binding.save();
    req.flash('success', 'Группа в домене приклеплена к роли');
    res.redirect('/accesscontrol');
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/untie', checkAuth, async (req, res) => {
  try {
    const deleteAccess = await AccessControl.findOne({ _id: req.params.id });
    await Binding.deleteOne({ template: deleteAccess.name });
    req.flash('success', 'Группа откреплена');
    res.redirect('/accesscontrol');
=======
  // тут загружаем группы из домена, которые у нас в главной группе PLO
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
  });
  try {
    // добавляют команду для powershell
    // выводим на экран дочерние группы главной группы.
    ps.addCommand(
      `echo (Get-ADGroupMember -Identity 'Initialization' | where objectclass -eq 'group' | ft name)`
    );
    let groups = [];
    await ps
      .invoke()
      .then((output) => {
        let temp = output.trim().split('\r\n');
        for (let i = 2; i < temp.length; i++) {
          groups.push(temp[i].trim());
        }
        // console.log(groups);
      })
      .catch((err) => {
        console.log('ошибка', err);
      });

    const access = await AccessControl.findById(req.params.id).lean();
    const fullBinding = await Binding.find().lean();
    console.log(fullBinding);
    fullBinding.forEach((value) => {
      groups = groups.filter((item) => item !== value.groupDomain);
    });
    const template = access.template;
    console.log('роль', template);
    // находим в привязке шаблон
    const candidate = await Binding.findOne({ template }).lean();
    let find;
    if (candidate) {
      find = candidate.groupDomain;
    } else {
      find = '';
    }
    res.render('accesscontrol/binding', {
      title: 'Связывание',
      access,
      find,
      groups,
      login: req.session.user,
    });
>>>>>>> master
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/bind', checkAuth, async (req, res) => {
  try {
    const { groupDomain, template } = req.body;

    const binding = new Binding({
      groupDomain,
      template,
    });
    await binding.save();
    req.flash('success', 'Группа в домене приклеплена к роли');
    res.redirect('/accesscontrol');
  } catch (ereor) {
    console.log(error);
  }
});

router.post('/:id/untie', checkAuth, async (req, res) => {
  try {
    const deleteAccess = await AccessControl.findOne({ _id: req.params.id });
    await Binding.deleteOne({ template: deleteAccess.template });
    req.flash('success', 'Группа откреплена');
    res.redirect('/accesscontrol');
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
