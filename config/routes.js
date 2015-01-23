var main = require('../app/controllers/main');

module.exports = function (app) {
  app.get('/', main.index);
  app.get('/show', main.show);  
  app.get('/currency-rss-feeds', main.CurrencyRSSFeeds);    
  app.get('/currency-rss-feed/:currency/feed.rss', main.CurrencyRSSFeed);
  app.get('/multiple-currencies-exchange-rates', main.MultiCurrency);
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
