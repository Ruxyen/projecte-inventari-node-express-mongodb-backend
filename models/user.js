/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         role:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of roles assigned to the user
 */

var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: [{ type: Schema.Types.ObjectId, ref: "Role"}]
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
