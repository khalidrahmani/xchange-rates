var express = require('express');
var session = require('express-session');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
var favicon = require('serve-favicon');
var mongoStore = require('connect-mongo')(session);
var helpers = require('view-helpers');
var config = require('./config');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport) {

  app.use(compression({
    threshold: 512
  }));

  app.use(express.static(config.root + '/public'));
  app.use(favicon(__dirname + '/../public/favicon.ico'));

  if (env === 'development' || env === 'test') {
    swig.setDefaults({
      cache: false
    });
  }

  app.engine('html', swig.renderFile);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'html');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'mylittlebigsecret',
    store: new mongoStore({
      url: config.db,
      collection : 'sessions'
    })
  }));

  app.use(passport.initialize());
  app.use(passport.session());

};
