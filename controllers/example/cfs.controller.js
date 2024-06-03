var CF = require("../../models/example/cf");


//API Methods
    
// tots
const all = async (req, res) => {  
        try {
            let cfs = await CF.find({});           
            return res.status(200).json(cfs);          
        }
        catch (error) {
            return res.status(404).json({errors: [{msg:"Error en recuperar la llista de cicles formatius."}]})
        }
}      

// Llistat paginat
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

    if(req.query.family) {           
        queryFilters.family = req.query.family;       
    }

    // console.log(queryFilters);

    try {
        var cfs = await CF.paginate(queryFilters, options);
        return res.status(200).json(cfs);        
    }
    catch (e) {
        return res.status(404).json({errors: [{msg:"Error en recuperar la llista de cicles formatius."}]})
    }
}


// GET 1 cicle
const show = async (req, res) => { 
        try {        
            let cf = await CF.findById(req.params.id);
            if(cf == null )   {  
                return res.status(404).json({errors: [ {msg: "El cicle formatiu no existeix."} ]})   
            }
            return res.status(200).json(cf);               
        }
        catch(error) {          
              return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al recuperar el cicle formatiu."}]})           
        }
}
       

// Create
const create = async (req, res) => { 	
    try {
		    let cf = await CF.create(req.body);           
            return res.status(200).json(cf);     
			
    }
    catch(error) {           
           
            return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al crear el cicle formatiu."}]})   
    }
        
};
    
// Destroy
const destroy = async (req, res) => { 
        const cfId = req.params.id;
        try {
            
            var cf = await CF.findByIdAndDelete(cfId);
            if (cf == null) {                               
                return res.status(404).json({errors: [ {msg: "El cicle formatiu no existeix."} ]})
            }          
           
            return res.status(200).json(cf);

    
       } catch(error) {           
           return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema esborrant el cicle formatiu."}]}) 
       }
       
};


// UPDATE
const update = async (req, res) => { 
          
        try {
            var updatedCF = await CF.findByIdAndUpdate(
                   req.params.id, req.body , {runValidators: true,  new: true }) 
            if(updatedCF == null )   {  
                return res.status(404).json({errors: [ {msg: "El cicle formatiu no existeix."} ]}) 
            }
            return res.status(201).json(updatedCF);
          }
          catch(error) {       
            console.log(error)   
            return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema actualitzant el cicle formatiu."}]})    
          }
       
    };

    
    module.exports = {        
        all,
        paginedFiltered,
        show,
        create,
        destroy,
        update,       
    };
