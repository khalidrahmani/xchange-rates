var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var swig = require('swig');
var config = require('./config');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app) {

  app.use(compression({
    threshold: 512
  }));

  app.use(express.static(config.root + '/public'));

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

};
