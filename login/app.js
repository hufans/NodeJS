var express = require('express');
var path = require('path');
var session = require('express-session')
var createError = require('http-errors');

// var indexRouter = require('./routes/login');
var loginRouter = require("./routes/login");
var profileRouter = require('./routes/profile');
var modifyRouter = require("./routes/modify");
var signOut = require("./routes/signout");
var productRouter = require("./routes/product");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set()
var sessionObj = {
  secret: "cat",
  resave: false,
  saveUninitialized: true
}

app.use(session(sessionObj));

// use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, 'public')));

function authenticate(req, res, next) {
  // 如果未从 session 中获取到用户数据， 则判此次请求为一次异常请求。
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

//检查是不是小图标请求。
function checkIsUseableRequest(req, res, next) {
  if (req.url == "/favicon.ico") {
      return;
  } 
  next();
}

app.use(checkIsUseableRequest);

app.use("/",        loginRouter);
app.use("/login",   loginRouter);

app.use(authenticate);
app.use("/product", productRouter);
app.use("/profile", profileRouter);
app.use("/modify",  modifyRouter);
app.use("/signout", signOut);

app.use(function (req, res, next) {
  next(createError(403));
});

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
