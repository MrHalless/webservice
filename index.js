const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const csrf = require('csurf');
const fs = require('fs');

// ! custom routes
const accessControlRoutes = require('./routes/accesscontrol');
const buildingCircuitsRoutes = require('./routes/buildingcircuits');
const chatRoutes = require('./routes/chat');
const complexesRoutes = require('./routes/complexes');
const homeRoutes = require('./routes/home');
const fileHandlingRoutes = require('./routes/filehandling');
const journalRoutes = require('./routes/journal');
const laguagePairsRoutes = require('./routes/laguagepairs');
const pmsRoutes = require('./routes/pms');
const serversRoutes = require('./routes/servers');
const synchronizationRoutes = require('./routes/synchronization');
const tasksRoutes = require('./routes/tasks');
const translateRoutes = require('./routes/translate');
const usersRoutes = require('./routes/users');
const complexLog = require('./routes/complexLog');
const unitLog = require('./routes/unitLog');
const serverLog = require('./routes/serverLog');
const authRoutes = require('./routes/auth');
const varMiddleware = require('./middleware/variable');
const keys = require('./keys/keys');
const { MONGODB_URI } = require('./keys/keys');
const { hashSync } = require('bcryptjs');

const PORT = process.env.PORT || 8080;

const app = express();

// ? создание handelbars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

// const store = new MongoStore({
//   mongooseConnection: mongoose.connection,
// });

const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI,
});

app.engine('hbs', hbs.engine); //  регистрация handlebars
app.set('view engine', 'hbs'); //
app.set('views', 'views'); // ? регистрация views

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // ? получение данных из body

app.use(
  session({
    secret: 'secret code dude',
    key: 'user_sid',
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 30000,
    },
    store,
  }),
  function (req, res, next) {
    let num = req.session.cookie.maxAge;
    console.log(num);
    next();
  }
);

// ! регистрация пакетов
app.use(csrf());
app.use(flash());
app.use(varMiddleware);

// app.use(jquery);

// ! регистрация роутов для перехода по страницам
app.use('/accesscontrol', accessControlRoutes);
app.use('/buildingcircuits', buildingCircuitsRoutes);
app.use('/chat', chatRoutes);
app.use('/complexes', complexesRoutes);
app.use('/filehandling', fileHandlingRoutes);
app.use('/journal', journalRoutes);
app.use('/laguagepairs', laguagePairsRoutes);
app.use('/pms', pmsRoutes);
app.use('/servers', serversRoutes);
app.use('/synchronization', synchronizationRoutes);
app.use('/tasks', tasksRoutes);
app.use('/translate', translateRoutes);
app.use('/users', usersRoutes);
app.use('/complexlog', complexLog);
app.use('/unitlog', unitLog);
app.use('/serverlog', serverLog);
app.use('/index', homeRoutes);
app.use('/', authRoutes);
app.use('/logout', authRoutes);

httpsOptions = {
  key: fs.readFileSync('./public/root.key'),
  cert: fs.readFileSync('./public/root.crt'),
  // ca: fs.readFileSync("./public/root.p7b"),
};

// ! старт сервера и подключение к базе
// async function start() {
//   try {
//     await mongoose.connect(keys.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     app.listen(8080, () => {});
//     // https.createServer(httpsOptions, app).listen(8443, () => {
//     //   console.log(`Server is running on port ${PORT}`);
//     // });
//     // app.listen(PORT, () => {

//     // });
//   } catch (e) {
//     console.log(e);
//   }
// }
async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
