const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });

const Building = require('../models/building');

const seeder = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Building.deleteMany();

        const buildingsData = [
            {
                name: "Edificio A",
                address: "Rambla President Juis Companys"
            },
            {
                name: "Edificio B",
                address: "Passatge Soler i Morey"
            },
            {
                name: "Edificio C",
                address: "Av. Principat d'Andorra"
            }
        ];

        await Building.insertMany(buildingsData);
        console.log("Los datos de los edificios se han puesto correctamente.");
        await mongoose.connection.close();

    } catch (error) {
        console.error("Error al poner los datos de los edificios:", error);
    }
};

seeder();
