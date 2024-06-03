const mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config({ path: "../.env" }); // where is the '.env' file

const Location = require("../models/location");
const Zone = require("../models/zone");

const seeder = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Location.collection.drop(); // Delete families collection
    var zones = await Zone.find();

    const locationsData = [
      //PLANTA BAIXA
      {
        name: "Aula 001",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Aula 002",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula 003",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula 004",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula 005",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Aula 006",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula 008",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-001",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-002",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-003",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-004",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-005",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-006",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-007",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula C-008",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Electricitat",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Secretaria",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Arxiu",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Administrador",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Consergeria",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Aula Polivalent",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Cuina",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Bar",
        is_bookable: false,
        zone: zones[0]._id,
      },
      {
        name: "Magatzem",
        is_bookable: true,
        zone: zones[0]._id,
      },
      {
        name: "Magatzem 2",
        is_bookable: true,
        zone: zones[0]._id,
      },
      //PLANTA 1
      {
        name: "Aula 102",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Aula 103",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Aula 104",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula 105",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula 106",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula 107",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Aula 109",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula 111",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Aula C-101",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula C-102",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula C-103",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Aula C-104",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula C-106",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula C-108",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Guardia",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Biblioteca",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Departament Ciències",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Departament Llengua",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Departament Idiomes",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula Multimedia",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Departament Comercial",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Sala Professors",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Cap Estudis",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Arxiu 2",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Direcció",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Departament Ocupació",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Aula Estudi",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Magatzem 3",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula Argo",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula Ciències",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Magatzem 4",
        is_bookable: true,
        zone: zones[1]._id,
      },
      {
        name: "Magatzem 5",
        is_bookable: false,
        zone: zones[1]._id,
      },
      {
        name: "Aula Comercial",
        is_bookable: false,
        zone: zones[1]._id,
      },
      //PLANTA 2
      {
        name: "Aula 201",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Aula 202",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Aula 203",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Aula 204",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Aula 205",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Aula 206",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Aula 207",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Aula 208",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Aula 209",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Aula 211",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Sala Calderes",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Mestres Industrials",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Departament Fol",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Departament Informàtica",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Departament Socials",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Tutors FPCT",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Departament Qualitat",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Departament Administratiu",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Coordinació FCT",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Departament Serveis Comunitat",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Pedagogia",
        is_bookable: true,
        zone: zones[2]._id,
      },
      {
        name: "Servidors Informàtics",
        is_bookable: false,
        zone: zones[2]._id,
      },
      {
        name: "Suport TIC",
        is_bookable: false,
        zone: zones[2]._id,
      },
      //PLANTA 3
      {
        name: "Aula 301",
        is_bookable: false,
        zone: zones[3]._id,
      },
      {
        name: "Aula 302",
        is_bookable: false,
        zone: zones[3]._id,
      },
      {
        name: "Aula 303",
        is_bookable: false,
        zone: zones[3]._id,
      },
      {
        name: "Aula 304",
        is_bookable: true,
        zone: zones[3]._id,
      },
      {
        name: "Aula 305",
        is_bookable: true,
        zone: zones[3]._id,
      },
      {
        name: "Aula 306",
        is_bookable: false,
        zone: zones[3]._id,
      },
      {
        name: "Aula 307",
        is_bookable: true,
        zone: zones[3]._id,
      },
      {
        name: "Aula 308",
        is_bookable: false,
        zone: zones[3]._id,
      },
      {
        name: "Aula 309",
        is_bookable: false,
        zone: zones[3]._id,
      },
      {
        name: "Aula 311",
        is_bookable: false,
        zone: zones[3]._id,
      },
      //PLANTA 4
      {
        name: "Aula 401",
        is_bookable: true,
        zone: zones[4]._id,
      },
      {
        name: "Aula 402",
        is_bookable: true,
        zone: zones[4]._id,
      },
      {
        name: "Aula 403",
        is_bookable: false,
        zone: zones[4]._id,
      },
      {
        name: "Aula 404",
        is_bookable: true,
        zone: zones[4]._id,
      },
      {
        name: "Aula 405",
        is_bookable: false,
        zone: zones[4]._id,
      },
      {
        name: "Aula 406",
        is_bookable: true,
        zone: zones[4]._id,
      },
      {
        name: "Aula 407",
        is_bookable: false,
        zone: zones[4]._id,
      },
      {
        name: "Aula 408",
        is_bookable: true,
        zone: zones[4]._id,
      },
      {
        name: "Aula 409",
        is_bookable: true,
        zone: zones[4]._id,
      },
      {
        name: "Aula 411",
        is_bookable: false,
        zone: zones[4]._id,
      },
    ];
    await Location.insertMany(locationsData);
    mongoose.connection.close();
    console.log("Seeder executat correctament.");
  } catch (error) {
    console.log(error);
  }
};

seeder();
