/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - name
 *         - zone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the location
 *         name:
 *           type: string
 *           description: The name of your location
 *         is_bookable:
 *           type: boolean
 *           description: Indicates if location is bookable
 *         zone:
 *           type: int
 *           description: Indicates the id of the location zone
 *       example:
 *         id: 65e7164bb70ad7be83f433cc
 *         name: Aula 001
 *         is_bookable: true
 *         zone: 65e7164bb70ad7be83f433ca
 */

var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var LocationSchema = new Schema({  
    name: { type: String, required: true },
    is_bookable: Boolean,
    zone: { type: Schema.ObjectId, ref: "Zone", required: true }
});

LocationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Location", LocationSchema);