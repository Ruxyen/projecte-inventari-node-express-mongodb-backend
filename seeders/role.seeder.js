const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const Role = require("../models/role");
const Action = require("../models/action");

const seeder = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Role.collection.drop(); // Eliminar la colección Role

        const actions = await Action.find(); // Obtener todas las acciones

        const rolesWithActions = [
            {
                name: "Admin",
                actions: [actions[0]._id, actions[1]._id, actions[2]._id, actions[5]._id,actions[6]._id,actions[7]._id,actions[8]._id] 
            },
            {
                name: "Admin_economy",
                actions: [] // Sin acciones asignadas
            },
            {
                name: "Teacher",
                actions: [actions[11]._id, actions[12]._id] 
            },
            {
                name: "Janitor",
                actions: [actions[3]._id, actions[4]._id] 
            },
            {
                name: "Personal_maintenance",
                actions: [actions[9]._id,actions[10]._id] 
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
