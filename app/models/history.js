var mongoose        = require('mongoose')
   ,Schema          = mongoose.Schema;

var HistorySchema = new Schema({
  from:      {type: String},
  to:        {type: String},
  range:     {type: String},
  data:      {}
});
HistorySchema.index({from: 1, to: 1, range: 1}, {unique: true});
mongoose.model('History', HistorySchema);
