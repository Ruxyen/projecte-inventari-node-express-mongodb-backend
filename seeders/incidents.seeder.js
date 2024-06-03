const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: "../../.env" }); // Ruta donde se encuentra el archivo '.env'
const Incident = require('../models/incident');

const seeder = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Incident.deleteMany(); // Elimina todos los incidentes existentes

        // Crea 20 incidentes de ejemplo
        for (let i = 0; i < 20; i++) {
            await Incident.create({
                priority: "Alta",
                creation_date: new Date(),
                description: "Descripción del incidente " + i,
                resolution: "Resolución del incidente " + i,
                type: "Tipo del incidente " + i,
                resolution_date: new Date(),
                state: "Abierto",
                comments: [] // Si tienes algún comentario asociado, puedes agregarlo aquí
            });
        }

        mongoose.connection.close();
        console.log("Seeder completado exitosamente.");
    } catch (error) {
        console.error("Error en el seeder:", error);
    }
};

seeder();
