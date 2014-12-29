var mongoose        = require('mongoose')
   ,validate        = require('mongoose-validator')
   ,validator       = require('validator') 
   ,uniqueValidator = require('mongoose-unique-validator')
   ,Schema          = mongoose.Schema;

var CurrencySchema = new Schema({
  short_name:      {type: String, unique: true, required: "can't be blank"},
  long_name:       {type: String, required: "can't be blank"},
  valid:           {type: Boolean, default: true}
});

CurrencySchema.virtual('country_code').get(function () {
  return this.short_name.substring(0,2).toLowerCase();
});

CurrencySchema.plugin(uniqueValidator, { message: '{PATH} already in use.' })
mongoose.model('Currency', CurrencySchema);
