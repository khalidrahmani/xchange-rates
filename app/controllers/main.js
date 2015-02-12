var request   = require("request"),
    mongoose  = require('mongoose'),
    Rate      = mongoose.model('Rate'),
    Currency  = mongoose.model('Currency'),
    RSS       = require('rss')

exports.index = function (req, res){  
  Currency.getLimitedCurrencies(function(currencies){
    res.render('main/index', {
      title: 'Easy and accurate currency convertion',
      page_heading: '<h1>Accurate foreign currency converter.</h1>',
      page_description: '<h3>Select currency and get live and historic exchange rates.</h3>',      
      currencies: currencies
    });
  });  
};
// ADD DATE TO 
exports.show = function (req, res){
  var amount      = req.query.amount || 1,
      from        = req.query.from   || 'USD',
      to          = req.query.to     || 'EUR',
      view        = req.query.view   || '1day'
  Currency.getCurrencies(function(currencies){    
    Rate.getHistoricalRates(view, from, to, function(rates, current_rate){
      page_heading = 'Convert '+ currencies[from] + ' to '+ currencies[to]+', Current Exchange rate is : '+current_rate
      result = Math.round(current_rate*amount*100)/100
      //page_heading+= "<p> "+ amount +" "+from +" = "+result+"  "+to +"</p>"      
      res.render('main/show', {
        title: 'Convert '+ currencies[from] + ' to '+ currencies[to],
        page_heading: page_heading,
        chart_data: JSON.stringify(rates),
        current_rate: current_rate,        
        view: view,
        amount: amount,
        from: from,
        to: to,
        result: result,
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
          title:          'Currency converter Latest Exchange Rates For '+ currencies[from_currency],
          description:    'Currency converter RSS Feed for '+currencies[from_currency],
          copyright:      'Copyright © 2015 www.currency-converter.io All rights reserved'
      });
      rates = current_rate.rates
      for(currency in rates){
        r = (rates[currency])/(rates[from_currency])
        r = Math.round(r * 10000) / 10000      
        feed.item({
          title:  from_currency+'/'+currency,
          description: '1 ' + currencies[from_currency]+ ' = '+r+' '+currencies[currency],
          url: 'http://www.currency-converter.io/show?amount=1&from='+from_currency+'&to='+currency+'&view=1month',
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
        page_heading: 'Multiple currency converter tool, all your currencies prices in one page.',
        title: 'Multiple currency converter'
      });
    });  
  });  
};

exports.about = function (req, res){    
    res.render('main/about', {      
      title: 'About the currency converter',
      page_heading: 'RSS Feed For All Currencies'
    });  
};
