// Importar el modelo de incidente
const Incident = require("../models/incident");

// Controlador para obtener todos los incidentes
const all = async (req, res) => {
    try {
        let incidents = await Incident.find({});
        return res.status(200).json(incidents);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Error en recuperar la lista de incidentes." }] });
    }
};

// Controlador para obtener incidentes paginados y filtrados
const paginatedFiltered = async (req, res) => {  
    const options = {
        page: req.query.page || 1, // Página por defecto es 1
        limit: 3, // Límite de resultados por página
        sort: { _id: -1 }, // Ordenar por ID descendente
        collation: {
          locale: 'en',
        },
    };

    let queryFilters = {};      
       
    if(req.query.description) {          
        queryFilters.description = new RegExp(req.query.description, 'i') ;             
    }     

    try {
        var incidents = await Incident.paginate(queryFilters, options);
        return res.status(200).json(incidents);        
    }
    catch (e) {
        return res.status(404).json({errors: [{msg:"Error en recuperar la lista de incidentes."}]})
    }
}

// Controlador para mostrar un incidente por su ID
const show = async (req, res) => {
    try {
        let incident = await Incident.findById(req.params.id);
        if (!incident) {
            return res.status(404).json({ errors: [{ msg: "El incidente no existe." }] });
        }
        return res.status(200).json(incident);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hubo un problema al recuperar el incidente." }] });
    }
}; 

// Controlador para crear un nuevo incidente
const create = async (req, res) => {
    const { priority, creation_date, description, /*resolution,*/ type, /*resolution_date, */ state, /*comments*/ } = req.body;

    try {
        let incident = await Incident.create({ priority, creation_date, description, /*resolution,*/ type, /*resolution_date, */ state, /*comments*/});
        return res.status(201).json(incident);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hubo un problema al crear el incidente." }] });
    }
};

// Controlador para eliminar un incidente por su ID
const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const incident = await Incident.findById(id);
        if (!incident) {
            return res.status(404).json({ errors: [{ msg: "Incidente no encontrado." }] });
        }

        await incident.remove();
        return res.status(200).json({ msg: "Incidente eliminado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Error interno del servidor." }] });
    }
};

// Controlador para actualizar un incidente por su ID
const update = async (req, res) => {
    const { priority, creation_date, description, resolution, type, resolution_date, state, comments } = req.body;
    const { id } = req.params;

    try {
        const updatedIncident = await Incident.findByIdAndUpdate(
            id,
            { priority, creation_date, description, resolution, type, resolution_date, state, comments },
            { runValidators: true, new: true }
        );

        if (!updatedIncident) {
            return res.status(404).json({ errors: [{ msg: "El incidente no existe." }] });
        }

        return res.status(200).json(updatedIncident);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hubo un problema al actualizar el incidente." }] });
    }
};

// Exportar los controladores
module.exports = {
    all,
    paginatedFiltered,
    show,
    create,
    destroy,
    update,
};