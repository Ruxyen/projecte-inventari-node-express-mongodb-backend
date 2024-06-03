const mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config({ path: "../../.env" }); // where is the '.env' file

const Location = require("../../models/location");
const Building = require("../../models/building");
const Zone = require("../../models/zone");

const seeder = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Location.collection.drop(); // Delete families collection


    let building = await Building.create({ name: "Edifici 1" });

    let zone = await Zone.create({ name: "Zona 1", blueprint: "Planta 1", building: building._id });

    for (let i = 0; i < 20; i++) {
      await Location.create({name: "C00" + i, is_bookable: true, zone: zone._id});
    }
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
};

seeder();
