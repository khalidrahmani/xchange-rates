var request  = require("request"),
	  moment   = require("moment"),
    mongoose = require('mongoose'),
    Currency = mongoose.model('Currency');

exports.index = function (req, res){  
  Currency.find({}).sort({short_name: 1}).exec(function(err, currencies){
    res.render('main/index', {
      title: 'Exchange rates',
      currencies: currencies
    });
  })
};

exports.show = function (req, res){
  res.render('main/show', {
    title: 'Exchange rates'
  });
};

exports.getData = function(req, res){
  var from = req.query.from,
      to   = req.query.to,
      view = req.query.view,      
      today = moment().format('YYYY-MM-DD');
  params = {'1week': {date_number: '1', date_arg: 'week', period: 'daily', data_range: 'd7', xlabel: 'day'},
            '1month':{date_number: '1', date_arg: 'month', period: 'daily', data_range: 'd30', xlabel: 'day'},
            '1year': {date_number: '1', date_arg: 'year', period: 'weekly', data_range: 'y1', xlabel: 'month'},
            '2years':{date_number: '2', date_arg: 'year', period: 'weekly', data_range: 'y2', xlabel: 'month'},
            '5years':{date_number: '5', date_arg: 'year', period: 'monthly', data_range: 'y5', xlabel: 'month'}}
  param = params[view]          
  start_date = moment().subtract(param['date_number'], param['date_arg']).format('YYYY-MM-DD');          
  history_url  = "http://www.oanda.com/currency/historical-rates/update?quote_currency="+from+"&end_date="+today+"&start_date="+start_date+"&period="+param['period']+"&display=absolute&rate=0&data_range="+param['data_range']+"&price=mid&view=graph&base_currency_0="+to
    request({method: "GET", url: "http://www.currency.me.uk/remote/ER-CCCS2-AJAX.php?ConvertTo="+req.query.to+"&ConvertFrom="+req.query.from+"&amount=1"}, function (err, response, body){
      console.log(response.body)
      var current_rate = Math.round(response.body * 10000) / 10000;
      var ymin = ymax = current_rate;
      request({url: history_url, headers: {'X-Requested-With': 'XMLHttpRequest'}}, function (err, response, body){
        var chart_data = []
        data = JSON.parse(response.body)
        data = data.widget[0].data
        for(index in data){
          rate = Math.round(data[index][1] * 10000) / 10000
          ymin = (rate < ymin || ymin == 0) ? rate : ymin;
          ymax = (rate > ymax || ymax == 0) ? rate : ymax;
          date = moment(data[index][0]).format('YYYY-MM-DD')
        	chart_data.push({date: date, value: rate});
        }
        if(chart_data[0].date == today)    chart_data[0].value = current_rate
        else chart_data.push({date: today, value: current_rate});
        ymin = getMin(ymin);
        ymax = getMax(ymax);  	  
      	    res.json({
    	    	current_rate: current_rate,
    	    	chart_data: chart_data,
            ymin: ymin,
            ymax: ymax,
            xlabel: param.xlabel
    	  	});
    	  });
  });
}

function getMin(min){
  var tmp      = parseInt(min) - 1;
  while(true){
    tmp += 0.0625;
    if(tmp > min) return tmp - 0.0625;    
  }
}

function getMax(max){  
  var tmp   = parseInt(max) + 1;  
  while(true){
    tmp -= 0.0625;
    if(max > tmp) return tmp + 0.0625;    
  }  
}