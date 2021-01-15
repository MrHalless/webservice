const { Router } = require('express');
const router = Router();
const Complex = require('../models/complex');
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, async (req, res) => {
  const complexes = await Complex.find().lean();
  res.render('complexes/complexes', {
    title: 'Комплексы',
    login: req.session.user,
    complexes,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

// router.get('/edit', checkAuth, (req, res) => {
//   res.render('complexes/complex_edit', {
//     title: 'Редактирование комплекса',
//     login: req.session.user,
//   });
// });

router.post('/complexes_edit', async (req, res) => {
  await User.update(req.body);
  res.redirect('/users');
});

// router.get('/editusers', async (req, res) => {
//   await User.update(req.body)
//   res.redirect('/users')
// })

router.get('/:id/complex_edit', checkAuth, async (req, res) => {
  const complex = await Complex.findById(req.params.id).lean();

  res.render('complexes/complex_edit', {
    title: 'Редактирование комплекса',
    login: req.session.user,
    complex,
  });
});

router.post('/:id/complex_edit', async (req, res) => {
  try {
    await Complex.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success', 'Данные комплекса изменены');
    res.redirect('/complexes');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Данные комплекса не изменены');
    res.redirect('/complexes');
  }
});

router.get('/:id/complex_delete', checkAuth, async (req, res) => {
  res.render('complexes/complex_delete', {
    title: 'Удаление комплекса',
    login: req.session.user,
  });
});

router.post('/:id/complex_delete', checkAuth, async (req, res) => {
  try {
    await Complex.deleteOne({ _id: req.params.id });

    req.flash('success', 'Комплекс удален');
    res.redirect('/complexes');
  } catch (error) {
    req.flash('error', 'Комплекс не удален');
    res.redirect('/complexes');
    console.log(error);
  }
});

router.get('/complex_add', checkAuth, (req, res) => {
  res.render('complexes/complex_add', {
    title: 'Добавление комплекса',
    login: req.session.user,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.post('/complex_add', async (req, res) => {
  //добавление комплекса
  try {
    const { name, city, military } = req.body;

    const candidate = await Complex.findOne({ name, city, military });
    if (candidate) {
      // ! Комплекс существует с таким именем
      req.flash('error', 'Комплекс уже существует');
      res.redirect('/complexes/complex_add');
    } else {
      const complex = new Complex({
        name,
        city,
        military,
      });
      await complex.save();
      req.flash('success', 'Комплекс добавлен');
      res.redirect('/complexes');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
