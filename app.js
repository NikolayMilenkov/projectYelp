var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://niko:1234@ds139989.mlab.com:39989/project_x');
var sha1 = require('sha1');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect('mongodb://niko:1234@ds139989.mlab.com:39989/project_x');
var dbMong = mongoose.connection;
dbMong.on('error', console.error.bind(console, 'connection error:'));


var index = require('./routes/index');
var auth = require('./routes/auth');
var createUsers = require('./routes/createUsers');
var login = require('./routes/login');
var logout = require('./routes/logout');
var businesses = require('./routes/businesses');
var options = require('./routes/options');
var reviews = require('./routes/reviews');


var app = express();

app.use(session({
  secret: 'bulletproof',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 300 * 1000 },
  store: new MongoStore({
    url: 'mongodb://niko:1234@ds139989.mlab.com:39989/project_x',
  })
}));

app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://projectxfront.herokuapp.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/createUsers', createUsers);
app.use('/login', login);
app.use('/logout', logout);
app.use('/businesses', businesses);
app.use('/options', options);
app.use('/reviews', reviews);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
