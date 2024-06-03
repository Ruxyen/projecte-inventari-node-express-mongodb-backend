const mongoose = require("mongoose");
const dotenv = require('dotenv');
const Action = require('../models/action');

dotenv.config({ path: "../.env" });

const seeder = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        await Action.collection.drop();

        const actions = [
            { name: "Crear Exemplar", functionality: "S'utilitzara per a que l'admin pugui crear els nostres exemplars." },
            { name: "Crear_elements_inventari", functionality: "S'utilitza per a que l'admin pugui crear els elements del nostre inventari" },
            { name: "Gestió Inventari", functionality: "Imprimira un codi de barres i un codi qr per a enganxarlo en l'element corresponent, i aixi accedirem a la informació del material." },
            { name: "Ubicació", functionality: "Haurem de saber on esta el material en tot moment,hem de tindre en compte que si el canviem de lloc l'anotarem com a baixa." },
            { name: "Visualitzar planols", functionality: "Podrem visualitzar els plànols per tal de navegar per cadascuna de les plantes per aixi poder veure quin material tenim en cada planta." },
            { name: "Introduir incidencia", functionality: "L'admin o ususari introduira una incidencia i aixó voldra dir que hi ha alguna cosa a un aula o un despatx que no està funcionant correctament." },
            { name: "Descripció incidencia", functionality: "Quan la incidéncia no es un element en concret sino que es general,posaem la descripció de la incidéncia i introduirem el problema." },
            { name: "Eliminar incidencia", functionality: "Mentre la incidéncia no hagi entrat en trámit de resolució el professor podrá eliminar  la incidéncia corresponent." },
            { name: "Modificar Incidencia", functionality: "Mentre la incidéncia no hagi entrat en trámit de resolució el professor podrá modificar  la incidéncia corresponent." },
            { name: "Resolució incidencia", functionality: "Els de Manteniment tenen accés a la incidéncia i aniran resolent les incidéncies i aniran actualitzant l'estat de la incidéncia." },
            { name: "Actualització incidencia", functionality: "L’usuari de manteniment podrà fer canviar l’estat de la incidència i podrà anar fent apunts del seguiment de la incidència. Podrà introduir diferents apunts en dates diferents, a mesura que vagi intentant resoldre la incidència. Els diferents comentaris seran accessibles per l’usuari que ha introduït la incidència i podrà fer-hi intervencions en cas que necessiti fer algun aclariment sobre la intervenció." },
            { name: "Gestió de Reserves", functionality: "El professor gestionará la reserva amb el dia,hora i lloc corresponent." },
            { name: "Reserva sala d'actes", functionality: "La sala d'actes es una sala especial,llavors es realitzaran sesions especials en dates determinades,només en aquests actes l'alumnat podra fer una reserva,en aquest cas de la cadira per l'acte" }
        ];

        await Action.create(actions);

        mongoose.connection.close();
    } catch (error) {
        console.error(error);
    }
};

seeder();

