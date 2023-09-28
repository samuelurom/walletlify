// Importing modules
require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const isAuthenticated = require("./middlewares/is-authenticated");
const requestLogger = require("./middlewares/request-logger");
const setCurrentUser = require("./middlewares/set-current-user");

const dashboardRouter = require("./routes/dashboard-routes");
const transactionsRouter = require("./routes/transactions-routes");
const sessionsRouter = require("./routes/sessions-routes");
const usersRouter = require("./routes/users-routes");

// Initialize app ====
const app = express();

// View Engine =========
app.set("view engine", "ejs");
app.set("layout", "layouts/main-layout");

// Middlewares =========
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(setCurrentUser);
app.use(requestLogger);
app.use(expressLayouts);

// Routes ==============
app.use("/", dashboardRouter);
app.use("/transactions", isAuthenticated, transactionsRouter);
app.use("/", sessionsRouter);
app.use("/", usersRouter);

// Server ==============
app.listen(3000, () => console.log("Server listening on port 3000!"));
