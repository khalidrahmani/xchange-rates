var mongoose = require('mongoose')  
   ,app      = require('../../tasks_server')  
   ,Rate     = mongoose.model('Rate') 
   ,request  = require('request')
   ,moment   = require('moment')
   ,config   = require('../../config/config');
   
  var date = moment({ hour:0, minute:0, second: 0 });
  _date = date.format("YYYY-MM-DD")
  day_of_week  = date.format("e")  // 1 is monday
  day_of_month = date.format("DD") // 1 
  url = "http://openexchangerates.org/api/historical/"+_date+".json?app_id="+config.openexchangeAPPID
  request({method: "GET", url: url, qs: {}}, function (err, response, body){          
      res = JSON.parse(body)
      data = [{rates: res.rates, timestamp: res.timestamp, range: 'day'}]
      if(day_of_week == 1) data.push({rates: res.rates, timestamp: res.timestamp, range: 'week'})
      if(day_of_month == 1) data.push({rates: res.rates, timestamp: res.timestamp, range: 'month'})  
      Rate.create(data, function(err, rates){ 
        console.log(rates)
        process.exit()
      })        
  })
  


