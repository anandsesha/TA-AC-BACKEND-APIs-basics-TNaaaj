var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
  name: { type: String, required: true },
  states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
  continent: { type: String, required: true },
  population: { type: Number, required: true },
  ethnicity: { type: String },
  neighbouring_countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
  area: { type: Number },
});

var Country = mongoose.model('Couuntry', countrySchema);
module.exports = Country;
