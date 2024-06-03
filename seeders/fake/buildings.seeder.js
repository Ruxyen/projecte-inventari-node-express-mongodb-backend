const mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config({ path: "../../.env" }); // where is the '.env' file

const Building = require('../../models/building');


const seeder = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        await Building.collection.drop();    // Delete families collection   

        //let building = await Building.create({ "name": "Edificio 1" })

        for (let i = 0; i < 20; i++) {
            await Building.create({ name: "Edificio 1" + i, address: "calle 12" })
        }

        //const buildings = await building.insertMany(familiesJSON.families);
        mongoose.connection.close();

    }
    catch (error) {
        console.log(error);
    }
};

seeder();