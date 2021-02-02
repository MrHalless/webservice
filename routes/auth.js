const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const checkAuth = require('../middleware/checkAuth');
const nodeSSPI = require('node-sspi');
const ActiveDirectory = require('activedirectory');
const spawn = require('child_process').spawn;
const Shell = require('node-powershell');
const AccessControl = require('../models/accesscontrol');
<<<<<<< HEAD
const { LOGIN_ADMIN, PASSWORD_ADMIN, DEBUG } = require('../keys/keys');
const { checkAccess } = require('../middleware/checkAccess');
=======
const { LOGIN_ADMIN, PASSWORD_ADMIN } = require('../keys/keys');
>>>>>>> master
// const { db } = require('../models/user');
// const { Mongoose } = require('mongoose');

// const mongoose = require('mongoose');
let counter = 0;
let flagUndefined = true;

router.get('/', (req, res) => {
  // console.log('до sspi');
<<<<<<< HEAD
  if (DEBUG) {
    res.redirect('/login');
  } else {
    var nodeSSPIObj = new nodeSSPI({
      retrieveGroups: true,
      domain: 'CORP',
      // authoritative: false,
    });
    console.log('до auth');
    console.log('counter', counter);
    // console.log('1', req.connection.user);
    // for (let index = 0; index < 4; index++) {
    try {
      nodeSSPIObj.authenticate(req, res, async function (err) {
        console.log('auth');
        // try {
        // console.log('try');
        counter++;
        // console.log('function', counter);
        // console.log('user', req.connection.user);
        //
        //
        // если мы получаем данные, то начинаем записывать в сессию
        // для тестирования включен counter > 5
        // для работы counter > 2
        if (req.connection.user !== undefined && counter > 2) {
          console.log(req.connection.user);
          console.log('if > 2');
          // ! запускаем PowerShell и находим по SID пользователя в домене
          const ps = new Shell({
            executionPolicy: 'Bypass',
            noProfile: true,
          });
          console.log('После shell');
          // ! добавляем полученный sID пользователя в запрос в powershell
          // ps.addCommand(
          //   `echo ([wmi]"win32_SID.SID='${req.connection.userSid}'").AccountName`
          // );
          ps.addCommand(
            `echo (Get-ADUser -Identity ${req.connection.userSid}).UserPrincipalName, (Get-ADUser -Identity ${req.connection.userSid}).SamAccountName `
          );
          // ? Пример для получения пользователя из домена по имени "morozov2"
          // ? имя ищется по sID поэтому не важно обновление данных пользователя
          //
          // ps.addCommand(
          //   `echo ([wmi]"win32_SID.SID='S-1-5-21-1129224002-2673685539-1409588551-1115'").AccountName`
          // );
          let finUserFullName, findUserName;
          //
          // формируем конфиг для подключения к домену
          //
          var config = {
            url: 'ldap://corp.nii',
            baseDN: 'dc=corp,dc=nii',
            username: 'Администратор@corp.nii',
            password: '1qwertY&90',
          };
          var ad = new ActiveDirectory(config);
          await ps
            .invoke()
            .then((output) => {
              let temp = output.trim().split('\r\n');

              finUserFullName = temp[0];
              console.log(finUserFullName);
              findUserName = temp[1];
              console.log(findUserName);
              // ! проверяем есть ли такой пользователь в домене
              console.log('then');
              ad.userExists(finUserFullName, function (err, exists) {
                if (err) {
                  console.log('ERROR: ' + JSON.stringify(err));
                  return;
                }
                // если пользователь существует, проверяем  наличие в группах
                // сначала проверяем самую главную группу, которая дает право
                // на вход в СПО. если же ее нет, сразу открываем окно авторизации
                // даже если пользователь уже есть в домене.
                // ad.
                if (exists) {
                  //
                  // проверяем на группы и в зависимости от них
                  // описываем логику авторизации
                  //
                  ad.getGroupMembershipForUser(
                    finUserFullName,
                    function (err, groups) {
                      if (err) {
                        console.log('ERROR:', +JSON.stringify(err));
                        return;
                      }
                      if (!groups)
                        console.log('User: ' + finUserFullName + ' not found.');
                      else {
                        console.log(groups);
                        //
                        // проверяем главную группу на наличие
                        //
                        // console.log(groups);
                        let groupName = groups.find(
                          (group) => group.cn === 'Initialization'
                        );

                        // console.log(groupName);
                        if (groupName) {
                          // если есть первая группа, теперь проверяем
                          // следующие группы, по названиям.
                          //
                          // происходит поиск студента
                          //
                          let groupStudent = groups.find(
                            (group) => group.cn === 'student'
                          );
                          if (groupStudent) {
                            console.log('Нашли студента');
                            // устанавливаем для этого пользователя флаг STUDENT = true
                            //
                            // рендерим страницу для студента
                            //
                            counter = 0;
                            // сохранение сессии
                            req.session.typeUser = 'Доменная';
                            req.session.groupDomain = 'student';
                            req.session.user = findUserName;
                            req.session.isAuthenticated = true;
                            req.session.settings = true;
                            req.session.cookie.maxAge = 800000;
                            req.session.save();
                            // отрисовка страницы после входа
                            //
                            // по идеи должны сделать объект, чтобы рисовать в hbs по флагам
                            //
                            res.redirect('/translate');
                            // console.log(groupStudent.cn);
                            console.log('Нашли студента');
                          }
                          //
                          // происходит поиск администратора
                          //
                          let groupAdmin = groups.find(
                            (group) => group.cn === 'Admin'
                          );
                          if (groupAdmin) {
                            // устанавливаем для этого пользователя флаг ADMIN = true
                            //
                            // рендерим страницу для админа
                            //
                            // console.log(groupAdmin.cn);
                            counter = 0;
                            // сохранение сессии
                            req.session.user = findUserName;
                            req.session.isAuthenticated = true;
                            req.session.settings = true;
                            req.session.cookie.maxAge = 800000;
                            req.session.save();
                            // отрисовка страницы после входа
                            //
                            // по идеи должны сделать объект, чтобы рисовать в hbs по флагам
                            //
                            res.render('translate', {
                              layout: 'main',
                              title: 'Главная страница',
                              error: req.flash('error'),
                              login: req.session.user,
                            });
                            console.log('Нашли админа');
                          }
                          //
                          //  происходит поиск руководителя
                          //
                          let groupRuck = groups.find(
                            (group) => group.cn === 'Ruck'
                          );
                          if (groupRuck) {
                            //
                            // рендерим страницу для руководителя
                            //
                            counter = 0;
                            // сохранение сессии
                            req.session.user = findUserName;
                            req.session.isAuthenticated = true;
                            req.session.settings = true;
                            req.session.cookie.maxAge = 800000;
                            req.session.save();
                            // отрисовка страницы после входа
                            //
                            // по идеи должны сделать объект, чтобы рисовать в hbs по флагам
                            //
                            res.redirect('/translate');
                            // res.render('translate', {
                            //   layout: 'main',
                            //   title: 'Главная страница',
                            //   error: req.flash('error'),
                            //   login: req.session.user,
                            // });
                            // console.log(groupRuck.cn);
                            console.log('Нашли руководителя');
                          }
                        } else {
                          //
                          // если нет главной группы, прекращаем проверки
                          // и отображаем окно локальной авторизации
                          //
                          console.log('not found user');
                          counter = 0;
                          res.redirect('/login');
                        }
                      }
                    }
                  );
                } else {

                  counter = 0;
                  res.redirect('/login');

                }
              });
            })
            .catch((err) => {
              console.log('ошибка');
              console.log(err);
            });

          // ! пользователь найден, теперь проверяем, наличие в домене.

          // console.log('checkUser', checkUser);

          // console.log();
          // console.log('if user');
          // flagUndefined = false;
          // counter = 0;
          // // сохранение сессии
          // req.session.user = finUserFullName;
          // req.session.isAuthenticated = true;
          // req.session.settings = true;
          // req.session.cookie.maxAge = 800000;
          // req.session.save();
          // // отрисовка страницы после входа
          // res.render('translate', {
          //   layout: 'main',
          //   title: 'Главная страница',
          //   error: req.flash('error'),
          //   login: req.session.user,
          // });
        } else {
          // console.log('else', counter);
          // если после проверки учетки в домене, то мы открываем страницу авторизации
          if (counter > 2) {
            console.log('тут');
            // return;
            // counter = 0;
            // flag = true;
            // res.render('login', {
            //   layout: 'empty',
            //   title: 'Авторизация',
            //   error: req.flash('error'),
            // });
            // res.redirect('/login');
            // return;
          }
        }
        // console.log('222');
        // console.log('выход ');
        if (counter === 3) {
          console.log(' выход if counter === 3');
          // counter = 0;
          // res.redirect('/login');
          // res.send((res.statusCode = 401));
          // res.redirect(req.originalUrl);
          // // window.reload(true);
          // res.end();
          // counter = 0;
          // res.redirect('/login');
          // res.render('login', {
          //   layout: 'empty',
          //   title: 'Главная страница',
          //   error: req.flash('error'),
          //   login: req.session.user,
          // });
          // return;
        }
        // } catch (error) {
        //   console.log('error', error);
        // }
        if (err) {
          console.log('errr ', err);
        }
      });
      if (counter > 3) {
        console.log(req.connection.user);
        console.log('ПРОверкА');
        counter = 0;
        try {
          res.redirect('/login');
        } catch (error) {
          console.log('error', error);
        }
      }
    } catch (error) {
      console.log('еще error', error);
    }
    // }
    //if (counter > 2) {
    // console.log('проверка для редиректа');
    // console.log('после auth внизу', counter);

    // если после проверки учетки в домене, то мы открываем страницу авторизации
  }

=======
  var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true,
    domain: 'CORP',
    // authoritative: false,
  });
  console.log('до auth');
  console.log('counter', counter);
  // console.log('1', req.connection.user);
  // for (let index = 0; index < 4; index++) {
  try {
    nodeSSPIObj.authenticate(req, res, async function (err) {
      console.log('auth');
      // try {
      // console.log('try');
      counter++;
      // console.log('function', counter);
      // console.log('user', req.connection.user);
      //
      //
      // если мы получаем данные, то начинаем записывать в сессию
      if (req.connection.user !== undefined && counter > 2) {
        console.log('if > 2');
        // ! запускаем PowerShell и находим по SID пользователя в домене
        const ps = new Shell({
          executionPolicy: 'Bypass',
          noProfile: true,
        });
        // ! добавляем полученный sID пользователя в запрос в powershell
        // ps.addCommand(
        //   `echo ([wmi]"win32_SID.SID='${req.connection.userSid}'").AccountName`
        // );
        ps.addCommand(
          `echo (Get-ADUser -Identity ${req.connection.userSid}).UserPrincipalName, (Get-ADUser -Identity ${req.connection.userSid}).SamAccountName `
        );
        // ? Пример для получения пользователя из домена по имени "morozov2"
        // ? имя ищется по sID поэтому не важно обновление данных пользователя
        //
        // ps.addCommand(
        //   `echo ([wmi]"win32_SID.SID='S-1-5-21-1129224002-2673685539-1409588551-1115'").AccountName`
        // );
        let finUserFullName, findUserName;
        //
        // формируем конфиг для подключения к домену
        //
        var config = {
          url: 'ldap://corp.nii',
          baseDN: 'dc=corp,dc=nii',
          username: 'Администратор@corp.nii',
          password: '1qwertY&',
        };
        var ad = new ActiveDirectory(config);
        await ps
          .invoke()
          .then((output) => {
            let temp = output.trim().split('\r\n');
            // console.log(finUserFullName);
            // let test = JSON.stringify(finUserFullName);
            // console.log('Доменное имя', output[0]);
            // console.log('Имя', output[1]);

            finUserFullName = temp[0];
            findUserName = temp[1];
            // console.log('test', test);
            // console.log('output ВАЖНО', finUserFullName);
            // checkUser = `${finUserFullName.trim()}@corp.nii`;
            // ! проверяем есть ли такой пользователь в домене
            ad.userExists(finUserFullName, function (err, exists) {
              if (err) {
                console.log('ERROR: ' + JSON.stringify(err));
                return;
              }

              // console.log(finUserFullName + ' exists: ' + exists);
              // если пользователь существует, проверяем  наличие в группах
              // сначала проверяем самую главную группу, которая дает право
              // на вход в СПО. если же ее нет, сразу открываем окно авторизации
              // даже если пользователь уже есть в домене.
              // ad.
              if (exists) {
                //
                // проверяем на группы и в зависимости от них
                // описываем логику авторизации
                //
                ad.getGroupMembershipForUser(
                  finUserFullName,
                  function (err, groups) {
                    if (err) {
                      console.log('ERROR:', +JSON.stringify(err));
                      return;
                    }
                    if (!groups)
                      console.log('User: ' + finUserFullName + ' not found.');
                    else {
                      console.log(groups);
                      //
                      // проверяем главную группу на наличие
                      //
                      // console.log(groups);
                      let groupName = groups.find(
                        (group) => group.cn === 'Initialization'
                      );

                      // console.log(groupName);
                      if (groupName) {
                        // если есть первая группа, теперь проверяем
                        // следующие группы, по названиям.
                        //
                        // происходит поиск студента
                        //
                        let groupStudent = groups.find(
                          (group) => group.cn === 'student'
                        );
                        if (groupStudent) {
                          // устанавливаем для этого пользователя флаг STUDENT = true
                          //
                          // рендерим страницу для студента
                          //

                          //
                          //
                          //

                          counter = 0;
                          // сохранение сессии
                          req.session.user = findUserName;
                          req.session.isAuthenticated = true;
                          req.session.settings = true;
                          req.session.cookie.maxAge = 800000;
                          req.session.save();
                          // отрисовка страницы после входа
                          //
                          // по идеи должны сделать объект, чтобы рисовать в hbs по флагам
                          //
                          res.render('translate', {
                            layout: 'main',
                            title: 'Главная страница',
                            error: req.flash('error'),
                            login: req.session.user,
                          });
                          // console.log(groupStudent.cn);
                          console.log('Нашли студента');
                        }
                        //
                        // происходит поиск администратора
                        //
                        let groupAdmin = groups.find(
                          (group) => group.cn === 'Admin'
                        );
                        if (groupAdmin) {
                          // устанавливаем для этого пользователя флаг ADMIN = true
                          //
                          // рендерим страницу для админа
                          //
                          // console.log(groupAdmin.cn);
                          counter = 0;
                          // сохранение сессии
                          req.session.user = findUserName;
                          req.session.isAuthenticated = true;
                          req.session.settings = true;
                          req.session.cookie.maxAge = 800000;
                          req.session.save();
                          // отрисовка страницы после входа
                          //
                          // по идеи должны сделать объект, чтобы рисовать в hbs по флагам
                          //
                          res.render('translate', {
                            layout: 'main',
                            title: 'Главная страница',
                            error: req.flash('error'),
                            login: req.session.user,
                          });
                          console.log('Нашли админа');
                        }
                        //
                        //  происходит поиск руководителя
                        //
                        let groupRuck = groups.find(
                          (group) => group.cn === 'Ruck'
                        );
                        if (groupRuck) {
                          //
                          // рендерим страницу для руководителя
                          //
                          counter = 0;
                          // сохранение сессии
                          req.session.user = findUserName;
                          req.session.isAuthenticated = true;
                          req.session.settings = true;
                          req.session.cookie.maxAge = 800000;
                          req.session.save();
                          // отрисовка страницы после входа
                          //
                          // по идеи должны сделать объект, чтобы рисовать в hbs по флагам
                          //
                          res.render('translate', {
                            layout: 'main',
                            title: 'Главная страница',
                            error: req.flash('error'),
                            login: req.session.user,
                          });
                          // console.log(groupRuck.cn);
                          console.log('Нашли руководителя');
                        }
                      } else {
                        //
                        // если нет главной группы, прекращаем проверки
                        // и отображаем окно локальной авторизации
                        //
                        console.log('not found user');
                        counter = 0;
                        res.redirect('/login');
                      }
                    }
                  }
                );
              } else {
                console.log('return');
                return;
              }
            });
          })
          .catch((err) => {
            console.log('ошибка');
            console.log(err);
          });

        // ! пользователь найден, теперь проверяем, наличие в домене.

        // console.log('checkUser', checkUser);

        // console.log();
        // console.log('if user');
        // flagUndefined = false;
        // counter = 0;
        // // сохранение сессии
        // req.session.user = finUserFullName;
        // req.session.isAuthenticated = true;
        // req.session.settings = true;
        // req.session.cookie.maxAge = 800000;
        // req.session.save();
        // // отрисовка страницы после входа
        // res.render('translate', {
        //   layout: 'main',
        //   title: 'Главная страница',
        //   error: req.flash('error'),
        //   login: req.session.user,
        // });
      } else {
        // console.log('else', counter);
        // если после проверки учетки в домене, то мы открываем страницу авторизации
        if (counter > 2) {
          console.log('тут');
          // return;
          // counter = 0;
          // flag = true;
          // res.render('login', {
          //   layout: 'empty',
          //   title: 'Авторизация',
          //   error: req.flash('error'),
          // });
          // res.redirect('/login');
          // return;
        }
      }
      // console.log('222');
      // console.log('выход ');
      if (counter === 3) {
        console.log(' выход if counter === 3');
        // counter = 0;
        // res.redirect('/login');
        // res.send((res.statusCode = 401));
        // res.redirect(req.originalUrl);
        // // window.reload(true);
        // res.end();
        // counter = 0;
        // res.redirect('/login');
        // res.render('login', {
        //   layout: 'empty',
        //   title: 'Главная страница',
        //   error: req.flash('error'),
        //   login: req.session.user,
        // });
        // return;
      }
      // } catch (error) {
      //   console.log('error', error);
      // }
      if (err) {
        console.log('errr ', err);
      }
    });
    if (counter > 3) {
      console.log(req.connection.user);
      console.log('ПРОверкА');
      counter = 0;
      try {
        res.redirect('/login');
      } catch (error) {
        console.log('error', error);
      }
    }
  } catch (error) {
    console.log('еще error', error);
  }
  // }
  //if (counter > 2) {
  // console.log('проверка для редиректа');
  // console.log('после auth внизу', counter);

  // если после проверки учетки в домене, то мы открываем страницу авторизации
>>>>>>> master
});

router.get('/login', (req, res) => {
  counter = 0;
  res.render('login', {
    layout: 'empty',
    title: 'Авторизация',
    error: req.flash('error'),
  });
});

router.get('/logout', checkAuth, async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// ! авторизация если ты не в домене или не состоишь в группе
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
<<<<<<< HEAD

    const candidate = await User.findOne({ login });
    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        // тут отображаем и проверяем информацию о типе учетной записи
        // тут проблема. надо брать тогда каждый раз при отрисовке, проверять объект
        // или придумать чет другое, менее затратное
        const name = candidate.templateName;
        const findTemplate = AccessControl.findOne({ name });

        //
        req.session.user = candidate;
        req.session.typeUser = 'Локальная';
        req.session.isAuthenticated = true;
        req.session.settings = true;
        req.session.user = candidate.login;
        req.session.cookie.maxAge = 8000000000000;
        if (candidate.typeUser === 'Pr') {
          req.session.cookie.maxAge = null;
=======
    if (login === LOGIN_ADMIN && password === PASSWORD_ADMIN) {
      console.log('Успешно');
      req.session.user = login;
      req.session.isAuthenticated = true;
      req.session.settings = true;
      req.session.user = login;
      req.session.cookie.maxAge = 8000000000;

      req.session.save((err) => {
        if (err) {
          throw err;
>>>>>>> master
        }
        res.redirect('/translate');
      });
    } else {
      const candidate = await User.findOne({ login });
      if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password);
        if (areSame) {
          // тут отображаем и проверяем информацию о типе учетной записи
          // тут проблема. надо брать тогда каждый раз при отрисовке, проверять объект
          // или придумать чет другое, менее затратное
          const name = candidate.templateName;
          const findTemplate = AccessControl.findOne({ name });

          //
          req.session.user = candidate;
          req.session.isAuthenticated = true;
          req.session.settings = true;
          req.session.user = candidate.login;
          req.session.cookie.maxAge = 800000;
          if (candidate.typeUser === 'Pr') {
            req.session.cookie.maxAge = null;
          }
<<<<<<< HEAD
          req.flash('success', 'Вход выполнен');
          res.redirect('/translate');
        });
=======
          req.session.save((err) => {
            if (err) {
              throw err;
            }
            // req.flash('success', 'Добро пожаловать');
            res.redirect('/translate');
          });
        } else {
          req.flash('error', 'Ошибка аутентификации');
          res.redirect('/login');
        }
>>>>>>> master
      } else {
        req.flash('error', 'Ошибка аутентификации');
        res.redirect('/login');
      }
<<<<<<< HEAD
    } else {
      req.flash('error', 'Ошибка аутентификации');
      res.redirect('/login');
=======
>>>>>>> master
    }

  } catch (e) {
    console.log(e);
  }
});

// function initAD () {
//    var config = {
//    url: "ldap://corp.nii",
//    baseDN: "dc=corp,dc=nii",
//    username: "Администратор@corp.nii",
//    password: "1qwertY&",
//  };
// }

// var config = {
//   url: 'ldap://corp.nii',
//   baseDN: 'dc=corp,dc=nii',
//   username: 'Администратор@corp.nii',
//   password: '1qwertY&',
// };
// var ad = new ActiveDirectory(config);
// var username = 'morozov2@corp.nii';
// var password = '1qwertY&';

// var query = 'cn=*morozov2*';
// var ad = new ActiveDirectory(config);
// ad.findUsers(query, true, function (err, users) {
//   if (err) {
//     console.log('ERROR: ' + JSON.stringify(err));
//     return;
//   }

//   if (!users || users.length == 0) console.log('No users found.');
//   else {
//     console.log('findUsers: ' + JSON.stringify(users));
//   }
// });

// ad.authenticate(username, password, function (err, auth) {
//   if (err) {
//     console.log('ERROR: ' + JSON.stringify(err));
//     return;
//   }

//   if (auth) {
//     console.log('Authenticated!');
//   } else {
//     console.log('Authentication failed!');
//   }
// });

// const groupName = 'student';

// ad.isUserMemberOf(username, groupName, function (err, isMember) {
//   if (err) {
//     console.log('ERROR: ' + JSON.stringify(err));
//     return;
//   }

//   console.log(
//     'isMemberOf ' + username + ' isMemberOf: ' + groupName + ': ' + isMember
//   );
// });

// ad.groupExists(groupName, function (err, exists) {
//   if (err) {
//     console.log('ERROR: ' + JSON.stringify(err));
//     return;
//   }

//   console.log('GROUP ' + groupName + ' exists: ' + exists);
// });

// ad.userExists(username, function (err, exists) {
//   if (err) {
//     console.log('ERROR: ' + JSON.stringify(err));
//     return;
//   }

//   console.log(username + ' exists: ' + exists);
// });

module.exports = router;
