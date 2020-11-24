const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const accessControlRoutes = require("./routes/accesscontrol");
const buildingCircuitsRoutes = require("./routes/buildingcircuits");
const chatRoutes = require("./routes/chat");
const complexesRoutes = require("./routes/complexes");
const homeRoutes = require("./routes/home");
const fileHandlingRoutes = require("./routes/filehandling");
const journalRoutes = require("./routes/journal");
const laguagePairsRoutes = require("./routes/laguagepairs");
const pmsRoutes = require("./routes/pms");
const serversRoutes = require("./routes/servers");
const synchronizationRoutes = require("./routes/synchronization");
const tasksRoutes = require("./routes/tasks");
const translateRoutes = require("./routes/translate");
const usersRoutes = require("./routes/users");
const complexLog = require("./routes/complexLog");
const unitLog = require("./routes/unitLog");
const serverLog = require("./routes/serverLog");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 3000;

const app = express();

//  создание handelbars
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine); // регистрация handlebars
app.set("view engine", "hbs"); //
app.set("views", "views"); // регистрация views

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // получение данных из body

// регистрация роутов для перехода по страницам
app.use("/accesscontrol", accessControlRoutes);
app.use("/buildingcircuits", buildingCircuitsRoutes);
app.use("/chat", chatRoutes);
app.use("/complexes", complexesRoutes);
app.use("/", homeRoutes);
app.use("/filehandling", fileHandlingRoutes);
app.use("/journal", journalRoutes);
app.use("/laguagepairs", laguagePairsRoutes);
app.use("/pms", pmsRoutes);
app.use("/servers", serversRoutes);
app.use("/synchronization", synchronizationRoutes);
app.use("/tasks", tasksRoutes);
app.use("/translate", translateRoutes);
app.use("/users", usersRoutes);
app.use("/complexlog", complexLog);
app.use("/unitlog", unitLog);
app.use("/serverlog", serverLog);
app.use("/login", authRoutes);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
