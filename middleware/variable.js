module.exports = function (req, res, next) {
  res.locals.isAuth = req.session.isAuthenticated;

  res.locals.csrf = req.csrfToken();
  // res.locals.toasts = req.toastr.render();
  // res.locals.isLogin = req.session.candidate.login;
  next();
};
