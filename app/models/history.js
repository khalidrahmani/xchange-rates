var mongoose        = require('mongoose')
   ,Schema          = mongoose.Schema;

var HistorySchema = new Schema({
  from:      {type: Schema.ObjectId, ref: 'Currency'},
  to:        {type: Schema.ObjectId, ref: 'Currency'},
  range:     {type: String},
  data:      {}
});

mongoose.model('History', HistorySchema);
