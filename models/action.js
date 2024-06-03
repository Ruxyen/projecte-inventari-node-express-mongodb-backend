const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, model } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Action:
 *       type: object
 *       required:
 *         - name
 *         - functionality
 *       properties:
 *         _id:
 *           type: string
 *           description: El ID autogenerado de la acción en MongoDB
 *         name:
 *           type: string
 *           description: El nombre de la acción
 *         functionality:
 *           type: string
 *           description: La funcionalidad de la acción
 *       example:
 *         _id: "60a72e264f157b001cd65555"
 *         name: "Actualizar Usuario"
 *         functionality: "Actualizar la información de un usuario en la base de datos"
 */

const actionSchema = new Schema({
    name: String,
    functionality: String
});

actionSchema.plugin(mongoosePaginate); // Plugin de paginación

const Action = model('Action', actionSchema);

module.exports = Action;
