/**
 * @swagger
 * components:
 *   schemas:
 *     Family:
 *       type: object
 *       required:
 *         - name *        
 *         
 *       properties:
 *         _id:
 *           type: MONGODB Id
 *           description: The auto-generated id of the Family
 *         name:
 *           type: string
 *           description: The name of the family *
 *                 
 *       example:
 *          "_id": "65df766c59c22e0203659e80",
            "name": "Informàtica i comunicacions" *
 *             
 */


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//FamilySchema lo sustuimos por el nombre del esquema
var FamilySchema = new Schema({  
    name: { type: String, required: true, }, //tipo de variable
});

module.exports = mongoose.model("Family", FamilySchema);