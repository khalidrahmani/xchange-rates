// get rates every hour
var mongoose = require('mongoose')  
   ,app      = require('../../tasks_server')  
   ,Rate     = mongoose.model('Rate') 
   ,request  = require('request')
   ,config   = require('../../config/config');
   
request({method: "GET", url: "http://openexchangerates.org/api/latest.json?app_id="+config.openexchangeAPPID, qs: {}}, function (err, response, body){
    res = JSON.parse(body)
    Rate.create({range:"hour", rates: res.rates, timestamp: res.timestamp}, function(err, rate){ 
      if(err) console.log(err)
      if(!rate) console.log("already latest")
      else console.log("saved !!!")         
      process.exit()
  })
})
