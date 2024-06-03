const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config({ path: "../.env" });

const User = require('../models/user');
const Role = require('../models/role');

const seeder = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await User.collection.drop();

        const roles = await Role.find();
      
        const usersData = [

            //ADMIN APP

            { username: 'admin', email: 'admin@xtec.cat', password: 'password', role: roles[0]._id },

            //ADMIN ECONOMIA

            { username: 'admin_economy', email: 'admin_economy@xtec.cat', password: 'password', role: roles[1]._id },

            //PROFESSORS

            { username: 'maria_roser', email: 'magramu4@xtec.cat', password: 'password', role: roles[2]._id },
            { username: 'montse_rovira', email: 'mrovir73@xtec.cat', password: 'password', role: roles[2]._id },
            { username: 'maria_uribe', email: 'muribe@xtec.cat', password: 'password', role: roles[2]._id },
            { username: 'ramon_cervera', email: 'rcerver4@xtec.cat', password: 'password', role: roles[2]._id },
            { username: 'roser_agramunt', email: 'roseragramunt@gmail.com', password: 'password', role: roles[2]._id },

            //CONSERGE DE L'INSTITUT

            { username: 'janitor', email: 'janitor@xtec.cat', password: 'password', role: [roles[3]._id, roles[4]._id] },

            //PERSONAL DE MANTENIMENT

            { username: 'personal_maintenance', email: 'personalmaintenance@xtec.cat', password: 'password', role: roles[4]._id },
             
            //ALUMNES

            { username: 'ruben_teruel', email: 'rute944@vidalibarraquer.net', password: 'password'},
            { username: 'abderrahman_zafzafi', email: 'abza090@vidalibarraquer.net', password: 'password'},
            { username: 'alex_osuna', email: 'alos648@vidalibarraquer.net', password: 'password'},
            { username: 'asier_rodriguez', email: 'asro886@vidalibarraquer.net', password: 'password'},
            { username: 'brian_vilchez', email: 'brvi544@vidalibarraquer.net', password: 'password'},
            { username: 'eloy_blasco', email: 'elbl676@vidalibarraquer.net', password: 'password'},
            { username: 'ismael_veloz', email: 'isve157@vidalibarraquer.net', password: 'password'},
            { username: 'jan_pi', email: 'japi985@vidalibarraquer.net', password: 'password'},
            { username: 'maria_saiz', email: 'masa620@vidalibarraquer.net', password: 'password'},
            { username: 'mihai_romaniuc', email: 'miro058@vidalibarraquer.net', password: 'password'},
            { username: 'raul_olmedo', email: 'raol356@vidalibarraquer.net', password: 'password'},
            { username: 'vidal_rivera', email: 'viri052@vidalibarraquer.net', password: 'password'},
            { username: 'yanko_garcia', email: 'yaga765@vidalibarraquer.net', password: 'password'}

        
        ];

        for (let userData of usersData) {
            const { username, email, password, role } = userData;
            const hashedPassword = await bcrypt.hash(password, 12);
            await User.create({ username, email, password: hashedPassword, role });
        }

       
        
         mongoose.connection.close();
         console.log("Seeder ejecutado exitosamente.");
     } catch (error) {
         console.log(error);
     }
 }
 

 seeder();

