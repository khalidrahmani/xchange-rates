var mongoose = require('mongoose')  
   ,app      = require('../../tasks_server')  
   ,Rate     = mongoose.model('Rate') 
   ,Currency = mongoose.model('Currency') 
   ,async    = require('async')    
   ,request  = require('request')
   ,config   = require('../../config/config');

request({method: "GET", url: "http://www.getexchangerates.com/api/latest.json", qs: {}}, 
        function (err, response, body){
          rates = JSON.parse(body)
          console.log(rates[0].AED)
          /*for(i in currencies){
            Currency.create({short_name: i, long_name: currencies[i]}, function(err){

            })
          } */                   
})