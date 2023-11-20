var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const stateSchema = new Schema({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  population: { type: Number },
  area: { type: Number },
  neighbouring_states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
});

//We have not used index here. Just implmented routes for sorting in asc/desc. But index could be used in addition to improve preformance in fetching querries.
// Create an index on the 'name' field for ascending order
countrySchema.index({ name: 1 });

const State = mongoose.model('State', stateSchema);

module.exports = State;
