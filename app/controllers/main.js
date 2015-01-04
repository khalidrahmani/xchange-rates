var request   = require("request"),
    mongoose  = require('mongoose'),
    Rate      = mongoose.model('Rate'),
    Currency  = mongoose.model('Currency'),
    RSS       = require('rss')

exports.index = function (req, res){  
    res.render('main/index', {
      title: 'Currency Converter'
    });
};

exports.show = function (req, res){
  var amount      = req.query.amount,
      from        = req.query.from,
      to          = req.query.to,
      view  = req.query.view
  Rate.getHistoricalRates(view, from, to, function(rates, current_rate){
    res.render('main/show', {
      title: 'Exchange rates',
      chart_data: JSON.stringify(rates),
      current_rate: current_rate,
      result: Math.round(current_rate*amount*100)/100,
      view: view,
      amount: amount,
      from: from,
      to: to
    });
  });  
};

exports.CurrencyRSSFeeds = function (req, res){  
  Currency.find({}).sort({long_name: 1}).exec(function (err, currencies){
    res.render('main/rss', {
      currencies: currencies,
      title: 'RSS Feed For All Currencies'
    });
  });  
};

exports.CurrencyRSSFeed = function (req, res){

  Currency.getCurrencies(function(currencies_array){
    from_currency = req.params.currency
    Rate.findOne({}).sort({timestamp: -1}).exec(function(err, current_rate){ 
      var feed = new RSS({
          title:          'Latest Exchange Rates For '+ currencies_array[from_currency],
          description:    'RSS Exchange Feed for '+from_currency,
          copyright:      'Copyright © 2015 www.xchange-rates.com All rights reserved'
      });
      rates = current_rate.rates
      for(currency in rates){
        r = (rates[currency])/(rates[from_currency])
        r = Math.round(r * 10000) / 10000      
        feed.item({
          title:  from_currency+'/'+currency,
          description: '1 ' + currencies_array[from_currency]+ ' = '+r+' '+currencies_array[currency],
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