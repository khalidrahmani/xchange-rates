var request   = require("request"),
    mongoose  = require('mongoose'),
    Rate      = mongoose.model('Rate')

exports.index = function (req, res){  
    res.render('main/index', {
      title: 'Exchange rates'
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


