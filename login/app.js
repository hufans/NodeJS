var express = require('express');
var path = require('path');
var session = require('express-session')
var createError = require('http-errors');
// 
var usersRouter = require('./routes/users');
    loginRouter = require("./routes/login");
    indexRouter = require('./routes/index');
    dologinRouter = require("./routes/dologin");
    modifyRouter = require("./routes/modify");
    modifyUserRouter = require("./routes/modifyUser");
    auth = require("./routes/auth")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var sessionObj = {
  secret: "cat",
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionObj));

// use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth)
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/dologin", dologinRouter);
app.use("/modify", modifyRouter);
app.use("/modifyUser", modifyUserRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
