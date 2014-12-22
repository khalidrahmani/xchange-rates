var mongoose    = require('mongoose')
   ,validate    = require('mongoose-validator')
   ,validator   = require('validator')
   ,Schema      = mongoose.Schema
   ,moment      = require('moment')

var RateSchema = new Schema({
  rates:            {type: Schema.Types.Mixed},
  range:            {type: String},
  timestamp:        {type: Number, required: "can't be blank"}
});


RateSchema.statics = {  
  getRate: function (from, to, cb) {    
    this.findOne({}).sort({timestamp: -1}).exec(function(err, rate){ 
      r = (rate.rates[to])/(rate.rates[from])
      r = Math.round(r * 10000) / 10000
      cb(r)
    })
  },  
  getHistoricalRates: function (date_range, from, to, cb) {  
    ranges = {'1day':   {d:'hour',  n: 1, v: 'day'},
              '1week':  {d:'hour',  n: 1, v: 'week'}, 
              '1month': {d:'hour',   n: 1, v: 'month'}, 
              '1year':  {d:'week',  n: 1, v: 'year'}, 
              '2years': {d:'week',  n: 2, v: 'year'},
              '5years': {d:'month', n: 5, v: 'year'}}
              
    d = ranges[date_range]          
    timestamp = moment().subtract(d.n, d.v)
    timestamp = timestamp.format('X')
    _this = this
    this.find({range: {$in: [d.d]}, timestamp: {$gt: timestamp}}).sort({timestamp: 1}).exec(function(err, rates){ 
      data = []
      for(i in rates){
        r = (rates[i].rates[to])/(rates[i].rates[from])
        r = Math.round(r * 10000) / 10000        
        data.push([(rates[i].timestamp )*1000, r]) // api timestamp is in seconds and chart in milliseconds
      }      
      _this.findOne({}).sort({timestamp: -1}).exec(function(err, current_rate){ 
        r = (current_rate.rates[to])/(current_rate.rates[from])
        r = Math.round(r * 10000) / 10000        
        if(date_range != '1day') data.push([current_rate.timestamp*1000, r]) // api timestamp is in seconds and chart in milliseconds
        cb(data, r)      
      })
    })
  }
}

RateSchema.index({range: 1, timestamp: 1}, {unique: true});
mongoose.model('Rate', RateSchema);
