var users = require('../app/controllers/users');
var main = require('../app/controllers/main');
var auth = require('./middlewares/authorization');

var articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
var commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

module.exports = function (app, passport) {

  app.get('/login', users.login);
  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session);
  app.get('/users/:userId', users.show);
  

  app.param('userId', users.load);

  app.get('/', main.index);
  app.get('/show', main.show);  
  //app.get('/main/getData', main.getData);    

  app.use(function (err, req, res, next) {
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    res.status(500).render('500', { error: err.stack });
  });

  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
}
