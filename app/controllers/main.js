var request = require("request"),
	moment  = require("moment")

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
  history_url  = 'http://www.oanda.com/currency/historical-rates/update?quote_currency=EUR&end_date=2014-11-20&start_date=2014-10-22&period=daily&display=absolute&rate=0&data_range=d30&price=bid&view=graph&base_currency_0=MAD'
  history_url  = 'http://www.oanda.com/currency/historical-rates/update?quote_currency=EUR&end_date=2014-11-20&start_date=2012-11-20&period=weekly&display=absolute&rate=0&data_range=y2&price=bid&view=graph&base_currency_0=MAD'
  request({url: history_url, headers: {'X-Requested-With': 'XMLHttpRequest'}}, function (err, response, body){
    var chart_data = []
    data = JSON.parse(response.body)
    data = data.widget[0].data
    for(index in data){
    	chart_data.push({date: moment(data[index][0]).format('YYYY-MM-DD'), value: data[index][1]});    	
    }    
	  request({method: "GET", url: "http://www.currency.me.uk/remote/ER-CCCS2-AJAX.php?ConvertTo="+req.query.to+"&ConvertFrom="+req.query.from+"&amount=1"}, function (err, response, body){
	    res.json({
	    	rate: response.body,
	    	chart_data: chart_data
	  	});
  	  });  	
  });
}