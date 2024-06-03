const mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config({ path: "../../.env" }); // where is the '.env' file

const Building = require("../../models/building");
const Zone = require("../../models/zone");


const seeder = async (req, res) => {
 try {
   await mongoose.connect(process.env.MONGODB_URI);


   await Zone.collection.drop(); // Delete families collection


   let building = await Building.create({ name: "Edifici 1" });

   for (let i = 0; i < 20; i++) {
     await Zone.create({name: "Zona 0" + i, blueprint: "Planta 1",  building: building._id});
   }
   mongoose.connection.close();
 } catch (error) {
   console.log(error);
 }
};


seeder();