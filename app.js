var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var indexRouter = require('./routes/index');
var signinRouter = require('./routes/signin');
var signupRouter = require('./routes/signup');
var signoutRouter = require('./routes/signout');
var accountRouter = require('./routes/account');

// Set up axios
var axios = require('axios');
axios.defaults.baseURL = process.env.AXIOS_BASE_URL

var app = express();

// Auth
const session = require('express-session');

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  data: {}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);
app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
