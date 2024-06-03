var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var  LineSchema = new Schema({      
    code: {type: Number, required: true},
    schedule: {
        type: String,
        enum : ['Matí','tarda'],
        default: 'Matí'
    },   
    CF:  { type: Schema.ObjectId, ref: "CF", required: true },
});


module.exports = mongoose.model("Line", LineSchema);