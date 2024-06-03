var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    parent_id: {
        type: Schema.ObjectId, 
        ref:"Category",
        default: null,
    },
});

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Category", CategorySchema);