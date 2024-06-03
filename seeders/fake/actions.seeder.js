const mongoose = require("mongoose"); // corrected spelling

var dotenv = require('dotenv');

dotenv.config({ path: "../.env" });

const Action = require('../models/actions');

const seeder = async () => { // Removed req, res parameters since they are not used
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Added options object for useNewUrlParser and useUnifiedTopology

        await Action.collection.drop();

        for (let i = 0; i < 20; i++) {
            await Action.create({ name: "Crear Exemplar" + i, functionality: "S'utilitzara per a que l'admin pugui crear els nostres exemplars." + i });
            












        }
        mongoose.connection.close();
    } catch (error) {
        console.error(error); // Changed to console.error for better visibility
    }
};

seeder();
