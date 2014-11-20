var fs = require('fs');
var mongoose = require('mongoose');
var config = require('./config/config');

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});


// run by :                 node lib/tasks/migrate.js
// prod   :      heroku run node lib/tasks/migrate.js
// db.sites.dropIndex('post_back_url_1') 