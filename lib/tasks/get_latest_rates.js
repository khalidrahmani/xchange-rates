// runs every hour
var mongoose = require('mongoose')  
   ,app      = require('../../tasks_server')  
   ,Rate     = mongoose.model('Rate') 
   ,request  = require('request')

// curl http://openexchangerates.org/api/historical/2011-10-18.json?app_id=19c36fcf307446fcad05a97734096a76
request({method: "GET", url: "http://openexchangerates.org/api/latest.json?app_id=19c36fcf307446fcad05a97734096a76", qs: {}}, 
  function (err, response, body){          
    res = JSON.parse(body)
    Rate.create({range:"hour", rates: res.rates, timestamp: res.timestamp}, function(err, rate){ 
      if(err) console.log(err)
      if(!rate) console.log("already latest")
      else console.log("saved !!!")         
      process.exit()
  })
})
