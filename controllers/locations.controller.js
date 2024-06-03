var Location = require("../models/location");
var  Zone = require("../models/zone");
var Stock = require("../models/stock");

//API Methods

const all = async (req, res) => {
  try {
    let locations = await Location.find({});
    return res.status(200).json(locations);
  } catch (error) {
    return res
      .status(404)
      .json({ errors: [{ msg: "Error en recuperar la llista de location." }] });
  }
};

const show = async (req, res) => { 
  try {        
      let location = await Location.findById(req.params.id);
      if(location == null )   {  
          return res.status(404).json({errors: [ {msg: "Location no existeix."} ]})   
      }
      return res.status(200).json(location);               
  }
  catch(error) {          
        return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al recuperar location."}]})           
  }
}

const create = async (req, res) => {
  let locationNew = {
    name: req.body.name,
    is_bookable: req.body.is_bookable,
    zone: req.body.zone,
  };

  try {
    let location = await Location.create(locationNew);
    return res.status(200).json(location);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({
        errors: [{ msg: "Hi ha hagut un problema al crear location." }],
      });
  }
};

const destroy = async (req, res) => {
  const locationId = req.params.id;
  try {

    let num = await Stock.find ({location: req.params.id}).count();
    if (num!=0){
      return res.status(404).json ({errors: [ {msg: "Existeix un Stock en Location. No es pot esborrar."}]})
    }

    var location = await Location.findByIdAndDelete(locationId);
    if (location == null) {
      return res.status(404).json({ errors: [{ msg: "Locations no existeix." }] })
    }
    return res.status(200).json(location);

  } catch (error) {
    return res.status(404).json({ errors: [{ msg: "Hi ha hagut un problema esborrant location." }] })
  }
};

const update = async (req, res) => { 
               
  var location = {
    name: req.body.name,
    is_bookable: req.body.is_bookable,
    zone: req.body.zone,
  }        

  try {
      var updatedLocation = await Location.findByIdAndUpdate(
             req.params.id, location , {runValidators: true,  new: true }) 
      if(updatedLocation == null )   {  
          return res.status(404).json({errors: [ {msg: "Location no existeix."} ]}) 
      }
      return res.status(201).json(updatedLocation);
    }
    catch(error) {          
      return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema actualitzant location."}]})    
    }
 
};

// Llistat paginat
const paginedFiltered = async (req, res) => {  
  const options = {
      page: req.query.page || 1,
      limit: 3,
      sort: { _id: -1 },
      collation: {
        locale: 'en',
      },
      populate: 'zone'
  };

  let queryFilters={};      
  if(req.query.name) {           
    queryFilters.name = new RegExp(req.query.name, 'i') ;              
}


  if(req.query.is_bookable) {           
      queryFilters.is_bookable = req.query.is_bookable ;          
  }

 

  // console.log(queryFilters);

  try {
      var locations = await Location.paginate(queryFilters, options);
      return res.status(200).json(locations);        
  }
  catch (e) {
      return res.status(404).json({errors: [{msg:"Error en recuperar la llista de locations."}]})
  }
}


module.exports = {
  all,
  show,
  create,
  destroy,
  update,
  paginedFiltered
};
