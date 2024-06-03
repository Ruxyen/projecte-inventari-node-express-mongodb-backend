/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       required:
 *         - name
 *         - blueprint
 *         - building
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the zone
 *         name:
 *           type: string
 *           description: The name of the zone
 *         blueprint:
 *           type: string
 *           description: The blueprint of the zone
 *         building:
 *           type: string
 *           description: The ID of the building to which the zone belongs
 *       example:
 *         _id: 609b0a859b73a40015a7f5e5
 *         name: Zone 0
 *         blueprint: "PLANTA_BAIXA.jpg"
 *         building: buildings[0]._id
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var ZoneSchema = new Schema({
  name: { type: String, required: true },
  blueprint: { type: String },
  building: { type: Schema.Types.ObjectId, ref: 'Building', required: true }
});

ZoneSchema.plugin(mongoosePaginate);

var Zone = mongoose.model('Zone', ZoneSchema);

module.exports = Zone;
