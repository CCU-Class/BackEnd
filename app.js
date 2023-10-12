var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index.js');
var searchCourseRouter = require('./routes/routerSearchCourse.js');
var recordRouter = require('./routes/routerRecord.js');
var loginRouter = require('./routes/routerLogin.js');
var verifyTokenRouter = require('./routes/routerVaritfyToken.js');
var webStatisticRouter = require('./routes/routerWebStatistic.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// http request 放這裡
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   next();
// });
const cors = require('cors');

const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:5585']; // 替換成你本機端的網域

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(allowedOrigins));

app.use('/', indexRouter);
app.use("/searchCourse", searchCourseRouter);
app.use("/record", recordRouter);
app.use("/login", loginRouter);
app.use("/verifyToken", verifyTokenRouter);
app.use("/statistic",webStatisticRouter);

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
  res.render('error', {message: err.message});
});

module.exports = app;
