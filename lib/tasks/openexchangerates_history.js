var mongoose = require('mongoose')  
   ,app      = require('../../tasks_server')  
   ,Rate     = mongoose.model('Rate') 
   ,request  = require('request')
   ,moment   = require('moment')
   ,async    = require('async')    
   ,config   = require('../../config/config');

  dates = []
  var end = moment({ hour:0, minute:0, second: 0 });
  t = 62
  while(t>0){
    t = t -1
    d = end.subtract(1, 'day')  // for week & month
    dates.push({range:'day', date: d.format("YYYY-MM-DD")})
  }  
  var end = moment("2014-12-08");  // monday 
  dates.push({range:'week', date: end.format("YYYY-MM-DD")})  
  t = 4*12*3
  while(t>0){
    t = t -1
    d = end.subtract(1, 'week')  // for 1 year 2 years
    dates.push({range:'week', date: d.format("YYYY-MM-DD")})  
  }
  var end = moment("2015-12-01");  // monday 
  dates.push({range:'month', date: end.format("YYYY-MM-DD")})  
  t = 12*5
  while(t>0){
    t = t -1
    d = end.subtract(1, 'month')  // for 5 years
    dates.push({range:'month', date: d.format("YYYY-MM-DD")})  
  }
  console.log(dates.length)
  async.eachSeries(dates, function( date, callback) {
      url = "http://openexchangerates.org/api/historical/"+date.date+".json?app_id="+config.openexchangeAPPID
      request({method: "GET", url: url, qs: {}}, function (err, response, body){          
          res = JSON.parse(body)
          console.log(res)         
          Rate.create({rates: res.rates, timestamp: res.timestamp, range: date.range}, function(err, rate){ 
            if(err)   console.log(err)
            if(!rate) console.log("already latest")
            else console.log("saved : " + rate)         
            callback()
          })        
      })      
  }, function(err){        
      console.log("done")
      process.exit()
  }) 
  // we need to update rates as folowwing : 
  // every day save last day value
  // every monday save week value
  // every month save month value
