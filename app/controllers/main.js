var request   = require("request"),
	  moment    = require("moment"),
    mongoose  = require('mongoose'),
    async     = require('async'),
    Rate      = mongoose.model('Rate'),
    range     = (0.03125/62),
    precision = 10000000

exports.index = function (req, res){  
  Rate.findOne({}).sort({date: -1}).exec(function(err, rate){
    console.log(rate)
    res.render('main/index', {
      title: 'Exchange rates'
    });  
  })
};

exports.show = function (req, res){
  res.render('main/show', {
    title: 'Exchange rates'
  });
};
/*
exports.getData = function(req, res){
  var from       = req.query.from,
      to         = req.query.to,
      view       = req.query.view,  
      chart_data = [],    
      today      = moment().format('YYYY-MM-DD');

  if(view == "1day"){
    var ymin = ymax = current_rate = 0    
    one_day_earlier_timestamp = Math.round(new Date().getTime() / 1000) - 86400
    Rate.find({timestamp: {$gte: one_day_earlier_timestamp}}, function(err, rates){      
      async.eachSeries((rates), function( rate, callback) {      
        console.log(rate)
        date = moment.unix(rate.timestamp).format('YYYY-MM-DD HH:mm')
        r    = (rate.rates[to])/(rate.rates[from])
        r    = Math.round(r * precision) / precision
        current_rate = r
        ymin = (r < ymin || ymin == 0) ? r : ymin;
        ymax = (r > ymax || ymax == 0) ? r : ymax;        
        //chart_data.push({date: date, value: r});
        callback()           
      }, function(err){ 
        ymin = getMin(ymin);
        ymax = getMax(ymax);        
        console.log(chart_data)
          res.json({
              current_rate: current_rate,
              chart_data: chart_data,
              ymin: ymin,
              ymax: ymax,
              xlabel: 'hour'
            });
      })
    })
  }
  else{
    params = {'1week': {date_number: '1', date_arg: 'week', period: 'daily', data_range: 'd7', xlabel: 'day'},
              '1month':{date_number: '1', date_arg: 'month', period: 'daily', data_range: 'd30', xlabel: 'day'},
              '1year': {date_number: '1', date_arg: 'year', period: 'weekly', data_range: 'y1', xlabel: 'month'},
              '2years':{date_number: '2', date_arg: 'year', period: 'weekly', data_range: 'y2', xlabel: 'month'},
              '5years':{date_number: '5', date_arg: 'year', period: 'monthly', data_range: 'y5', xlabel: 'month'}}
    
    param = params[view]          
    start_date = moment().subtract(param['date_number'], param['date_arg']).format('YYYY-MM-DD');          
    history_url  = "http://www.oanda.com/currency/historical-rates/update?quote_currency="+from+"&end_date="+today+"&start_date="+start_date+"&period="+param['period']+"&display=absolute&rate=0&data_range="+param['data_range']+"&price=mid&view=graph&base_currency_0="+to
      Rate.getRate(from, to, function(current_rate){
        var ymin = ymax = current_rate;
        request({url: history_url, headers: {'X-Requested-With': 'XMLHttpRequest'}}, function (err, response, body){          
          data = JSON.parse(response.body)
          data = data.widget[0].data
          console.log(data)
          for(index in data){
            rate = data[index][1]
            rate = Math.round(rate * precision) / precision
            ymin = (rate < ymin || ymin == 0) ? rate : ymin;
            ymax = (rate > ymax || ymax == 0) ? rate : ymax;
            date = moment(data[index][0]).format('YYYY-MM-DD')
            //chart_data.push({date: date, value: rate});
            chart_data.unshift([data[index][0], rate]);
          }
          //if(chart_data[0].date == today)    chart_data[0].value = current_rate
          //else chart_data.push({date: today, value: current_rate});
          ymin = getMin(ymin, ymax-ymin);
          ymax = getMax(ymax, ymax-ymin);
          //chart_data = [[1147651200000, 67.79], [1147737600000, 64.98], [1147824000000, 65.26], [1147910400000, 63.18], [1147996800000, 64.51], [1148256000000, 63.38]]
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
}
*/

exports.getData = function(req, res){
  var from        = req.query.from,
      to          = req.query.to,
      date_range  = req.query.view
      Rate.getHistoricalRates(date_range, from, to, function(rates){
        res.json({chart_data: rates})
      });  
}

function getMin(min, diff){
  var tmp      = parseInt(min) - 1;
  r = range
  while(true){
    tmp += range;
    if(tmp > min) return tmp - range;    
  }
}

function getMax(max, diff){  
  var tmp   = parseInt(max) + 1;  
  while(true){
    tmp -= range;
    if(max > tmp || max == tmp) return tmp + range;    
  }  
}