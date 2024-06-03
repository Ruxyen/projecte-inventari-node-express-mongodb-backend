const Action = require("../models/action");
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

Action.paginate = mongoosePaginate.paginate;

const all = async (req, res) => {  
    try {
        let actions = await Action.find({});           
        return res.status(200).json(actions);          
    }
    catch (error) {
        return res.status(500).json({errors: [{msg:"Error en recuperar la lista de acciones."}]})
    }
}      

const create = async (req, res) => { 
    let actionNew = {
        name: req.body.name,
        functionality: req.body.functionality 
    };

    try {
        let action = await Action.create(actionNew);           
        return res.status(200).json(action);     
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({errors: [{msg:"Hubo un problema al crear la acción."}]})   
    }        
};

const destroy = async (req, res) => {
    try {
        const action = await Action.findById(req.params.id);
        if (!action) {
            return res.status(404).json({ message: "La acción no pudo ser encontrada." });
        }
        await action.remove();
        return res.status(200).json({ message: "La acción ha sido eliminada exitosamente." });
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Hubo un problema al eliminar la acción." }] });
    }
};

const paginate = async (req, res) => {
   
    try {

        const options = {
            page: req.query.page || 1,
            limit: 3,
            sort: { _id: -1 },
            collation: {
              locale: 'en',
            },
        };

        

        // Llama a la función paginate de tu modelo Action con las opciones de paginación
        const result = await Action.paginate({}, options);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Hubo un problema al paginar las acciones." }] });
    }
};


const show = async (req, res) => { 
    try {        
        let action = await Action.findById(req.params.id);
        if (action == null) {  
            return res.status(404).json({ errors: [{ msg: "La acción no existe." }] });
        }
        return res.status(200).json(action);               
    } catch (error) {          
        return res.status(500).json({ errors: [{ msg: "Error al recuperar la acción." }] });
    }
};

const update = async (req, res) => {
    const actionId = req.params.id;
    const { name, functionality } = req.body;

    try {
        let updatedAction = await Action.findByIdAndUpdate(actionId, { name, functionality }, { new: true });
        if (!updatedAction) {
            return res.status(404).json({ errors: [{ msg: "La acción no existe." }] });
        }
        return res.status(200).json(updatedAction);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Error al actualizar la acción." }] });
    }
};



module.exports = {        
    all,
    create,
    destroy,
    paginate,
    show,
    update
};
