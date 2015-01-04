var request   = require("request"),
    mongoose  = require('mongoose'),
    Rate      = mongoose.model('Rate'),
    Currency  = mongoose.model('Currency'),
    RSS       = require('rss')

exports.index = function (req, res){  
  Currency.getCurrencies(function(currencies){
    res.render('main/index', {
      title: 'Welcome to XchangeRates',
      currencies: currencies
    });
  });  
};

exports.show = function (req, res){
  var amount      = req.query.amount,
      from        = req.query.from,
      to          = req.query.to,
      view  = req.query.view
  Currency.getCurrencies(function(currencies){    
    Rate.getHistoricalRates(view, from, to, function(rates, current_rate){
      res.render('main/show', {
        title: 'Convert '+ currencies[from] + ' to '+ currencies[to],
        chart_data: JSON.stringify(rates),
        current_rate: current_rate,
        result: Math.round(current_rate*amount*100)/100,
        view: view,
        amount: amount,
        from: from,
        to: to,
        currencies: currencies
      });
    });  
  });  
};

exports.CurrencyRSSFeeds = function (req, res){  
  Currency.getCurrencies(function(currencies){  
    res.render('main/rss', {
      currencies: currencies,
      title: 'RSS Feed For All Currencies'
    });
  });  
};

exports.CurrencyRSSFeed = function (req, res){
  Currency.getCurrencies(function(currencies){
    from_currency = req.params.currency
    Rate.findOne({}).sort({timestamp: -1}).exec(function(err, current_rate){ 
      var feed = new RSS({
          title:          'Latest Exchange Rates For '+ currencies[from_currency],
          description:    'RSS Exchange Feed for '+currencies[from_currency],
          copyright:      'Copyright © 2015 www.xchange-rates.com All rights reserved'
      });
      rates = current_rate.rates
      for(currency in rates){
        r = (rates[currency])/(rates[from_currency])
        r = Math.round(r * 10000) / 10000      
        feed.item({
          title:  from_currency+'/'+currency,
          description: '1 ' + currencies[from_currency]+ ' = '+r+' '+currencies[currency],
          url: 'http://www.xchange-rates.com/show?amount=1&from='+from_currency+'&to='+currency+'&view=1month',
          date: current_rate.timestamp*1000 // any format that js Date can parse.  
        }); 
      } 
      res.set('Content-Type', 'text/xml');
      res.send(feed.xml());       
    })
  })  
};

//getCurrencyLongName()