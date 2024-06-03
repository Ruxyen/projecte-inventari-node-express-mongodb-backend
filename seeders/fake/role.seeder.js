const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" }); // donde esté el archivo '.env'

const Role = require("../../models/role");
const Action = require("../../models/action"); // Importar el modelo de acción

const seeder = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Role.collection.drop(); // Eliminar la colección Role

        const actions = await Action.find(); // Obtener todas las acciones

        const rolesWithActions = [
            {
                name: "Admin",
                actions: [actions[0]._id, actions[2]._id] // Asignar el _id de la primera y la tercera acción
            },
            {
                name: "Admin_economy",
                actions: [actions[0]._id, actions[2]._id] // Asignar el _id de la primera y la tercera acción
            },
            {
                name: "Teacher",
                actions: [actions[1]._id, actions[3]._id] // Asignar el _id de la segunda y la cuarta acción
            },
            {
                name: "Janitor",
                actions: [actions[2]._id] // Asignar solo el _id de la tercera acción
            },
            {
                name: "Personal_maintenance",
                actions: [actions[3]._id] // Asignar solo el _id de la cuarta acción
            }
        ];

        for (let roleWithActions of rolesWithActions) {
            const { name, actions } = roleWithActions;
            const role = await Role.create({ name, actions });
            console.log(`Role ${name} created with specific actions`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
};

seeder();
