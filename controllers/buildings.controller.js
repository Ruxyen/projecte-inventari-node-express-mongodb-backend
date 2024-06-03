
var Building = require("../models/building");


//API Methods

const all = async (req, res) => {
    try {
        let buildings = await Building.find({});
        return res.status(200).json(buildings);
    }
    catch (error) {
        return res.status(404).json({ errors: [{ msg: "Error en recuperar la llista de buildings." }] })
    }
}


const create = async (req, res) => {

    let buildingNew = {
        name: req.body.name,
        address: req.body.address,
    };

    try {
        let building = await Building.create(buildingNew);
        return res.status(200).json(building);

    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ errors: [{ msg: "Hi ha hagut un problema al crear el edifici." }] })
    }

};

const destroy = async (req, res) => { 
    const buildingId = req.params.id;
    try {
        
        var building = await Building.findByIdAndDelete(buildingId);
        if (building == null) {                               
            return res.status(404).json({errors: [ {msg: "El edifici no existeix."} ]})
        }                       
        return res.status(200).json(building);

   } catch(error) {           
    return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema esborrant el edifici."}]}) 
   }       
};

const update = async (req, res) => { 
               
    var building = {
        name: req.body.name,
        address: req.body.address,
    }        

    try {
        var updatedBuilding = await Building.findByIdAndUpdate(
               req.params.id, building , {runValidators: true,  new: true }) 
        if(updatedBuilding == null )   {  
            return res.status(404).json({errors: [ {msg: "El edifici no existeix."} ]}) 
        }
        return res.status(201).json(updatedBuilding);
      }
      catch(error) {          
        return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema actualitzant el edifici."}]})    
      }
   
};

const show = async (req, res) => { 
    try {        
        let building = await Building.findById(req.params.id);
        if(building == null )   {  
            return res.status(404).json({errors: [ {msg: "El edifici no existeix."} ]})   
        }
        return res.status(200).json(building);               
    }
    catch(error) {          
          return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al recuperar el edifici."}]})           
    }
}

const paginedFiltered = async (req, res) => {  
    const options = {
        page: req.query.page || 1,
        limit: 3,
        sort: { _id: -1 },
        collation: {
          locale: 'en',
        },
    };

    let queryFilters={};      
       
    if(req.query.name) {           
        queryFilters.name = new RegExp(req.query.name, 'i') ;          
    }
    try {
        console.log(queryFilters)
        var buildings = await Building.paginate(queryFilters, options);
        return res.status(200).json(buildings);        
    }
    catch (e) {
        return res.status(404).json({errors: [{msg:"Error en recuperar la llista de cicles formatius."}]})
    }
}

module.exports = {
    all,
    create,
    destroy,
    update,
    show,
    paginedFiltered,
};