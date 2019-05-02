var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsLint = require('ejs-lint');
var usersRouter = require('./routes/users');
var config = require('./config/config')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', usersRouter);


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


var mysql = require('mysql');
var connection = mysql.createConnection(config);

connection.connect()

var employee = function(username, name){
  this.username = username;
  this.name = name;
}

connection.query('select * from employees', function (err, rows, fields) {
  if (err) throw err

  rows.forEach(element => {
    var x = new employee(element.username, element.full_name);
    console.log(x);
  })
})

connection.end()

module.exports = app;
