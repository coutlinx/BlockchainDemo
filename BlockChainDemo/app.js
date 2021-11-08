//导入ejs模板
var ejs = require('ejs');
//=====================================================

//导入session
var session = require('express-session');
var cookieParser = require('cookie-parser');
//=====================================================

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var selfRouter = require('./routes/self');
var objRouter = require('./routes/obj');
var rechargRouter = require('./routes/recharg');
var tradeRouter = require('./routes/trade');
var withdrawRouter = require('./routes/withdraw');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//jade换为HTML
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//配置session

app.use(cookieParser("BLOCKCHAINEEMO"))
app.use(session({
  cookieName: 'session',
  resave:true,
  saveUninitialized:true,
  secret:"BLOCKCHAINEEMO",
  duration: 30 * 60 * 1000,
  rolling:true,
  activeDuration: 5 * 60 * 1000,
  cookie:{
    maxAge:60*1000*30,
    secure:false
},
}))
//===================================

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/self', selfRouter);
app.use('/obj',objRouter);
app.use('/recharg',rechargRouter);
app.use('/trade',tradeRouter);
app.use('/withdraw',withdrawRouter);
app.use('/recharge',rechargRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
