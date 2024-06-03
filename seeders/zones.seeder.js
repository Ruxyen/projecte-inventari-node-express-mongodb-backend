const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" }); 

const Building = require("../models/building");
const Zone = require("../models/zone");

const seeder = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Zone.deleteMany();

    var buildings = await Building.find();

    const locationsData = [
      // Building 1
      {
        name: "Zona 0",
        blueprint: "PLANTA_BAIXA.jpg",
        building: buildings[0]._id
      },
      {
        name: "Zona 1",
        blueprint: "PLANTA_PRIMERA.jpg",
        building: buildings[0]._id
      },
      {
        name: "Zona 2",
        blueprint: "PLANTA_SEGONA.jpg",
        building: buildings[0]._id
      },
      {
        name: "Zona 3",
        blueprint: "PLANTA_TERCERA.jpg",
        building: buildings[0]._id
      },
      {
        name: "Zona 4",
        blueprint: "PLANTA_QUARTA.jpg",
        building: buildings[0]._id
      },
      
      // Building 2
      {
        name: "Zona 0",
        blueprint: "PLANTA_BAIXA.jpg",
        building: buildings[1]._id
      },
      {
        name: "Zona 1",
        blueprint: "PLANTA_PRIMERA.jpg",
        building: buildings[1]._id
      },
      {
        name: "Zona 2",
        blueprint: "PLANTA_SEGONA.jpg",
        building: buildings[1]._id
      },
      
      // Building 3
      {
        name: "Zona 0",
        blueprint: "PLANTA_BAIXA.jpg",
        building: buildings[2]._id
      },
      {
        name: "Zona 1",
        blueprint: "PLANTA_PRIMERA.jpg",
        building: buildings[2]._id
      }
    ];

    await Zone.insertMany(locationsData);

    console.log("Seeder executed successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeder error:", error);
  }
};

seeder();
