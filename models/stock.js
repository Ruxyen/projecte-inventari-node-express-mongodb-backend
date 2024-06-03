const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const StockSchema = new Schema({  
    units: { type: Number, required: true }, 
    material: { 
        type: Schema.Types.ObjectId, 
        ref: 'Material',
        required: true 
    },
    location: { 
        type: Schema.Types.ObjectId, 
        ref: 'Location',
        required: true 
    }
});

StockSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Stock", StockSchema);