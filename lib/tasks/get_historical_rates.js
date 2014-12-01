var mongoose = require('mongoose')  
   ,app      = require('../../tasks_server')  
   ,moment   = require("moment")
   ,Rate     = mongoose.model('Rate') 
   ,Currency = mongoose.model('Currency') 
   ,History  = mongoose.model('History') 
   ,async    = require('async')    
   ,request  = require('request')
   ,config   = require('../../config/config');

  var today = moment().format('YYYY-MM-DD');
  var params = [ {range: '1week',  date_number: '1', date_arg: 'week',  period: 'daily',   data_range: 'd7',  xlabel: 'day'},
                 {range: '1month', date_number: '1', date_arg: 'month', period: 'daily',   data_range: 'd30', xlabel: 'day'},
                 {range: '1year',  date_number: '1', date_arg: 'year',  period: 'weekly',  data_range: 'y1',  xlabel: 'month'},
                 {range: '2years', date_number: '2', date_arg: 'year',  period: 'weekly',  data_range: 'y2',  xlabel: 'month'},
                 {range: '5years', date_number: '5', date_arg: 'year',  period: 'monthly', data_range: 'y5',  xlabel: 'month'}]


Currency.find({}).sort({short_name: -1}).exec(function (err, currencies) {
  getHistory(currencies)
})

getHistory = function(currencies){  
  if(currency = currencies.pop()){
    console.log(currency.short_name)
    requestHistoryApi(currency, params, currencies)
  }
  else process.exit()
}

requestHistoryApi = function(currency, params, currencies){
    async.eachSeries(params, function( param, callback) {
      start_date = moment().subtract(param['date_number'], param['date_arg']).format('YYYY-MM-DD');   
      history_url  = "http://www.oanda.com/currency/historical-rates/update?quote_currency=USD&end_date="+today+"&start_date="+start_date+"&period="+param['period']+"&display=absolute&rate=0&data_range="+param['data_range']+"&price=mid&view=graph&base_currency_0="+currency.short_name
      request({url: history_url, headers: {'X-Requested-With': 'XMLHttpRequest'}}, function (err, response, body){      
        data = JSON.parse(response.body)
        data = data.widget[0].data  
        History.create({from: 'USD', to: currency.short_name, range: param['range'], data: data}, function(err, hist){          
          callback()  
        })        
      })
    }, function(err){        
        console.log("done")
        getHistory(currencies)
    })  
}