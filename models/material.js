/**
* @swagger
* components:
*   schemas:
*     Material:
*       type: object
*       required:
*         - name
*         - image
*         - category
*       properties:
*         id:
*           type: string
*           description: The auto-generated id of the material
*         name:
*           type: string
*           description: The name of your material
*         image:
*           type: string
*           description: The image of the material
*         description:
*           type: string
*           description: Description of the material
*         category:
*           type: Schema.ObjectId
*           description: Reference to materials category
*       example:
*         id: 65df766c59c22e0203659e80
*         name: cadira color fusta
*         image: public/images/DSC_5244.png
*         description: cadira de alumne color fusta
*         category: 65df766c59cg2e0103656e80
*/


var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


var Schema = mongoose.Schema;


var materialSchema = new Schema({ 
   name: { type: String, required: true },
   image: { type: String, },
   description: { type: String },
   category:  { type: Schema.ObjectId, ref: "Category", required: true }
});




materialSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("Material", materialSchema);
