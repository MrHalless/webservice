const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const flash = require('connect-flash');
const csrf = require('csurf');
<<<<<<< HEAD
// const redis = require('redis');
=======
// const { body } = require('express-validator/check');
// const fs = require('fs');
// const toastr = require('express-toastr');
const cookieParser = require('cookie-parser');
// const ntlm = require('express-ntlm');
// const nodeSSPI = require('node-sspi');
>>>>>>> master

// const { body } = require('express-validator/check');
// const fs = require('fs');
// const toastr = require('express-toastr');
const cookieParser = require('cookie-parser');
// const ntlm = require('express-ntlm');
// const nodeSSPI = require('node-sspi');
// const RedisStore = require('connect-redis')(session);
// ! custom routes
const accessControlRoutes = require('./routes/accesscontrol');
const buildingCircuitsRoutes = require('./routes/buildingcircuits');
const chatRoutes = require('./routes/chat');
const complexesRoutes = require('./routes/complexes');
const homeRoutes = require('./routes/home');
const fileHandlingRoutes = require('./routes/filehandling');
const journal_apkRoutes = require('./routes/journal_apk');
const journal_complexRoutes = require('./routes/journal_complex');
const journal_subdivRoutes = require('./routes/journal_subdiv');
const journal_operatorRoutes = require('./routes/journal_operator');
const laguagePairsRoutes = require('./routes/laguagepairs');
const subdivRoutes = require('./routes/subdiv');
const pmsRoutes = require('./routes/pms');
const serversRoutes = require('./routes/servers');
const synchronizationRoutes = require('./routes/synchronization');
const tasks_apkRoutes = require('./routes/tasks_apk');
const tasks_complexRoutes = require('./routes/tasks_complex');
const tasks_subdivRoutes = require('./routes/tasks_subdiv');
const tasks_operatorRoutes = require('./routes/tasks_operator');
const statistic_apkRoutes = require('./routes/statistic_apk');
const statistic_complexRoutes = require('./routes/statistic_complex');
const statistic_subdivRoutes = require('./routes/statistic_subdiv');
const statistic_operatorRoutes = require('./routes/statistic_operator');

const fileStatistic_apkRoutes = require('./routes/fileStatistic_apk');
const fileStatistic_complexRoutes = require('./routes/fileStatistic_complex');
const fileStatistic_subdivRoutes = require('./routes/fileStatistic_subdiv');
const fileStatistic_operatorRoutes = require('./routes/fileStatistic_operator');

const translateRoutes = require('./routes/translate');
const usersRoutes = require('./routes/users');
const complexLog = require('./routes/complexLog');
const unitLog = require('./routes/unitLog');
const serverLog = require('./routes/serverLog');
const authRoutes = require('./routes/auth');
const errorRoutes = require('./routes/error');
const sharedSession = require('express-socket.io-session');
const varMiddleware = require('./middleware/variable');
const keys = require('./keys/keys');
<<<<<<< HEAD
const {
  MONGODB_URI
} = require('./keys/keys');
const {
  hashSync
} = require('bcryptjs');
const PORT = process.env.PORT || 8000;

// const sessionMiddleware = session({})

const http = require('http');
const {
  cookie
} = require('express-validator');
const app = express();
// const server = http.createServer(app);
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8000',
    credentials: true
  }
})
app.set('io', io);
require('./middleware/socket')(io);
// const socketIO = require('socket.io')(server);
// const sio = socketIO.listen(server);





// app.set('socketio', socketIO);

=======
const { MONGODB_URI } = require('./keys/keys');
const { hashSync } = require('bcryptjs');
const PORT = process.env.PORT || 8000;

const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io')(server);
app.set('socketio', socketIO);
module.exports.io = socketIO;
require('./middleware/socket');
>>>>>>> master

// ? создание handelbars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: require('./utils/hbs-healpers'),
});
const Session = require('express-session');

<<<<<<< HEAD
const MongoStore = require('connect-mongodb-session')(Session);
=======
>>>>>>> master
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI,
});
const session = new Session({
  secret: 'secret code dude',
  key: 'user_sid',
  resave: true,
  saveUninitialized: true,
  unset: 'destroy',
  rolling: true,
  cookie: {
    maxAge: 30000,
  },
  store,
});


// session();
app.use(session);
io.use(sharedSession(session));
// app.use(

// );

app.engine('hbs', hbs.engine); //  регистрация handlebars
app.set('view engine', 'hbs'); //
app.set('views', 'views'); // ? регистрация views

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
})); // ? получение данных из body

app.use(cookieParser('secret code dude'));

<<<<<<< HEAD
// socketIO.configure(function() {
//   socketIO.set('authirization', function(data,accept))
// })
// app.use(
//   session({
//     secret: 'secret code dude',
//     key: 'user_sid',
//     resave: true,
//     saveUninitialized: false,
//     unset: 'destroy',
//     rolling: true,
//     cookie: {
//       maxAge: 30000,
//     },
//     store,
//   }),
//   function (req, res, next) {
//     let num = req.session.cookie.maxAge;

//     // req.session.cookie.maxAge = null;
//     console.log(num);
//     next();
//   }
// );
// sio.use(sharedSession(session));
// socketIO.use(sharedSession(session, {
//   autoSave: true
// }))
=======
app.use(
  session({
    secret: 'secret code dude',
    key: 'user_sid',
    resave: true,
    saveUninitialized: false,
    unset: 'destroy',
    rolling: true,
    cookie: {
      maxAge: 30000,
    },
    store,
  }),
  function (req, res, next) {
    let num = req.session.cookie.maxAge;

    // req.session.cookie.maxAge = null;
    console.log(num);
    next();
  }
);

>>>>>>> master
// ! регистрация пакетов
app.use(csrf());
app.use(flash());
// app.use(toastr());
app.use(varMiddleware);

// ! регистрация роутов для перехода по страницам
app.use('/accesscontrol', accessControlRoutes);
app.use('/buildingcircuits', buildingCircuitsRoutes);
app.use('/chat', chatRoutes);
app.use('/complexes', complexesRoutes);
app.use('/filehandling', fileHandlingRoutes);
app.use('/journal_apk', journal_apkRoutes);
app.use('/journal_complex', journal_complexRoutes);
app.use('/journal_subdiv', journal_subdivRoutes);
app.use('/journal_operator', journal_operatorRoutes);
<<<<<<< HEAD
app.use('/statistic_apk', statistic_apkRoutes);
app.use('/statistic_complex', statistic_complexRoutes);
app.use('/statistic_subdiv', statistic_subdivRoutes);
app.use('/statistic_operator', statistic_operatorRoutes);
=======
>>>>>>> master
app.use('/laguagepairs', laguagePairsRoutes);
app.use('/pms', pmsRoutes);
app.use('/servers', serversRoutes);
app.use('/synchronization', synchronizationRoutes);
app.use('/tasks_apk', tasks_apkRoutes);
app.use('/tasks_complex', tasks_complexRoutes);
app.use('/tasks_subdiv', tasks_subdivRoutes);
app.use('/tasks_operator', tasks_operatorRoutes);
app.use('/filestatistic_apk', fileStatistic_apkRoutes);
app.use('/filestatistic_complex', fileStatistic_complexRoutes);
app.use('/filestatistic_subdiv', fileStatistic_subdivRoutes);
app.use('/filestatistic_operator', fileStatistic_operatorRoutes);
app.use('/translate', translateRoutes);
app.use('/users', usersRoutes);
app.use('/complexlog', complexLog);
app.use('/unitlog', unitLog);
app.use('/serverlog', serverLog);
app.use('/index', homeRoutes);
app.use('/', authRoutes);
app.use('/logout', authRoutes);
<<<<<<< HEAD
app.use('/subdiv', subdivRoutes);
app.use('/error', errorRoutes);
=======

>>>>>>> master
// io.on('connection', function (socket) {});

// app.use(function (req, res, next) {
//   req.io = io;
//   next();
// });

//httpsOptions = {
//  key: fs.readFileSync('./public/root.key'),
//  cert: fs.readFileSync('./public/root.crt'),
// ca: fs.readFileSync("./public/root.p7b"),
//};

// ! старт сервера и подключение к базе
async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}
// module.exports.io = socketIO;

// require('./middleware/socket');
start();