var request   = require("request"),
    mongoose  = require('mongoose'),
    Rate      = mongoose.model('Rate')

exports.index = function (req, res){  
    res.render('main/index', {
      title: 'Exchange rates'
    });
};

exports.show = function (req, res){
  res.render('main/show', {
    title: 'Exchange rates'
  });
};

exports.getData = function(req, res){
  var from        = req.query.from,
      to          = req.query.to,
      date_range  = req.query.view
  Rate.getHistoricalRates(date_range, from, to, function(rates){
    res.json({chart_data: rates})
  });  
}

