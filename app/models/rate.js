var mongoose    = require('mongoose')
   ,validate    = require('mongoose-validator')
   ,validator   = require('validator') 
	 ,Schema      = mongoose.Schema;

var RateSchema = new Schema({
  from:        {type: Schema.ObjectId, ref: 'Currency' },
  to:          {type: Schema.ObjectId, ref: 'Currency' },
  date:        {type: Date},
  value:       {type: Number}
});

mongoose.model('Rate', RateSchema);
