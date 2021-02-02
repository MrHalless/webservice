const { Router } = require('express');
const router = Router();
const checkAuth = require('../middleware/checkAuth');


router.get('/', checkAuth, (req, res) => {
    res.render('error', {
        title: 'Ошибка доступа',
        login: req.session.user,

    });
});

module.exports = router;
