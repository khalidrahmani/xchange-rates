var mongoose = require('mongoose')  
   ,app      = require('../../tasks_server')  
   ,Rate     = mongoose.model('Rate') 
   ,Currency = mongoose.model('Currency') 
   ,async    = require('async')    
   ,request  = require('request')
   ,config   = require('../../config/config');

request({method: "GET", url: "http://openexchangerates.org/currencies.json", qs: {}}, 
        function (err, response, body){
          currencies = JSON.parse(body)
          for(i in currencies){
            Currency.create({short_name: i, long_name: currencies[i]}, function(err){

            })
          }                    
})