var request   = require("request"),
    mongoose  = require('mongoose'),
    Rate      = mongoose.model('Rate'),
    Currency  = mongoose.model('Currency'),
    RSS       = require('rss')

exports.index = function (req, res){  
  Currency.getCurrencies(function(currencies){
    res.render('main/index', {
      title: 'Welcome to XchangeRates',
      page_heading: '<h1>Exchange Rates</h1>',      
      page_description: '<h3>Select currency and get live and historical exchange rates graph</h3>',      
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
      page_heading = 'Convert '+ currencies[from] + ' to '+ currencies[to]+', Current Exchange rate is : '+current_rate
      if(amount!=1){
        result = Math.round(current_rate*amount*100)/100
        page_heading+= "<p> "+ amount +" "+from +" = "+result+"  "+to +"</p>"
      }
      res.render('main/show', {
        title: 'Convert '+ currencies[from] + ' to '+ currencies[to],
        page_heading: page_heading,
        chart_data: JSON.stringify(rates),
        current_rate: current_rate,        
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
      title: 'RSS Feed For All Currencies',
      page_heading: 'RSS Feed For All Currencies'
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

exports.MultiCurrency = function (req, res){ 
  Rate.findOne({}).sort({timestamp: -1}).exec(function(err, current_rate){  
    Currency.getCurrencies(function(currencies){  
      res.render('main/multi_currencies', {
        currencies: currencies,
        current_rate: current_rate.rates,
        page_heading: 'Multiple currencies calculator tool',
        title: 'Exchange Rates for Multiple currencies'
      });
    });  
  });  
};

exports.getMultiRates = function (req, res){  
  console.log(req.body)  
  res.json({status: 200})
};
