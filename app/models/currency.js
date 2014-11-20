var mongoose        = require('mongoose')
   ,validate        = require('mongoose-validator')
   ,validator       = require('validator') 
   ,uniqueValidator = require('mongoose-unique-validator')
	 ,Schema          = mongoose.Schema;

var CurrencySchema = new Schema({
  short_name:      {type: String, unique: true, required: "can't be blank"},
  long_name:      {type: String, required: "can't be blank"}
});

CurrencySchema.plugin(uniqueValidator, { message: '{PATH} already in use.' })
mongoose.model('Currency', CurrencySchema);
