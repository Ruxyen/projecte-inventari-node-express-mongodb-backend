var mongoose = require("mongoose");

const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var BuildingSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String }
});

BuildingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Building", BuildingSchema);