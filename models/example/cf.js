var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var  CFSchema = new Schema({  
    name: { type: String, required: true, unique: true },
    code: {type: String, required: true, unique: true},
    grade: {
        type: String,
        enum : ['GM','GS'],
        default: 'GM'
    },
    hours: {type: Number, min: 1000},
    isDUAL: Boolean,
    family:  { type: Schema.ObjectId, ref: "Family", required: false },
    career_opportunities: [String],
    info_modules: [
        { number: {type: Number, required: true},
          name:  { type: String, required: true},
          hours: {type: Number}
        }
    ]
});

CFSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("CF", CFSchema);