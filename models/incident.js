var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Incident:
 *       type: object
 *       required:
 *         - priority
 *         - creation_date
 *         - description
 *         - resolution
 *         - type
 *         - resolution_date
 *         - state
 *       properties:
 *         priority:
 *           type: string
 *           description: Prioridad del incidente
 *         creation_date:
 *           type: string
 *           format: date
 *           description: Fecha de creación del incidente
 *         description:
 *           type: string
 *           description: Descripción del incidente
 *         resolution:
 *           type: string
 *           description: Resolución del incidente
 *         type:
 *           type: string
 *           description: Tipo de incidente
 *         resolution_date:
 *           type: string
 *           format: date
 *           description: Fecha de resolución del incidente
 *         state:
 *           type: string
 *           description: Estado del incidente
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *             description: Referencia a los comentarios asociados al incidente
 */

var IncidentSchema = new Schema({
  priority: { type: String, required: true },
  creation_date: { type: Date, required: true },
  description: { type: String, required: true },
  resolution: { type: String, required: false },
  type: { type: String, required: true },
  resolution_date: { type: Date, required: false },
  state: { type: String, required: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

IncidentSchema.plugin(mongoosePaginate);
var Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident;
