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
      date_range  = req.query.view
  Rate.getHistoricalRates(date_range, from, to, function(rates, current_rate){
    res.render('main/show', {
      title: 'Exchange rates',
      chart_data: JSON.stringify(rates),
      current_rate: current_rate,
      result: Math.round(current_rate*amount*100)/100,
      amount: amount,
      from: from,
      to: to
    });
  });  
};

/*
exports.getData = function(req, res){
  var amount      = req.query.amount,
      from        = req.query.from,
      to          = req.query.to,
      date_range  = req.query.view

  Rate.getHistoricalRates(date_range, from, to, function(rates, current_rate){
    res.json({chart_data: rates, current_rate: current_rate, result: current_rate*amount})
  });
}
*/
