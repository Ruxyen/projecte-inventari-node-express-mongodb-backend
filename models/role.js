/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the Role
 *         name:
 *           type: string
 *           description: The name of the role
 *         actions:
 *           type: array
 *           items:
 *             type: string
 *           description: The array of action IDs associated with the role
 *       example:
 *         _id: "65df766c59c22e0203659e80"
 *         name: "Admin"
 *         actions:
 *           - "action1"
 *           - "action2"
 */


var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var RoleSchema = new Schema({
   name: { type: String, required: true, unique: true }, // Campo para el nombre del rol, obligatorio y único
   actions: [{ type: Schema.ObjectId, ref: "Action"}] // Campo para las acciones asociadas al rol
});

// Agregar paginación al esquema
RoleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Role', RoleSchema);
