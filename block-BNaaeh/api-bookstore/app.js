var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var { routerV1, routerV2 } = require('./routes/books');

var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comments');

var app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/api-bookstore')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session placed after cookieParser() and before accessing usersRouter below
//Session created below
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/api-bookstore',
    }),
  })
);

// Express API Server routes all incoming requests to /api/xyz routes.
app.use('/api', indexRouter);
app.use('/api/v1/books', routerV1); // router for books.js file - handles version 1
app.use('/api/v2/books', routerV2); // router for books.js file - handles version 2
app.use('/api/v2/books/:id/comments', commentsRouter);

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
