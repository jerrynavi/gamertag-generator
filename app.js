const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const hbs = require("hbs");

const indexRouter = require('./routes/index');

const app = express();

init();
mountRoutes();

function init() {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);

  hbs.registerPartials(__dirname + "/views/partials", () => {
    console.info("Partial views registered");
  });
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));

  console.info("App is running on http://localhost:3000");
}

function mountRoutes() {
  app.use('/', indexRouter);
  
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
}

module.exports = app;
