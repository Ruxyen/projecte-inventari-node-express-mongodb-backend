
var Family = require("../../models/example/family");
var CF = require("../../models/example/cf");

    //API Methods
    
    const all = async (req, res) => {  // Declara una función asincrónica llamada 'all' que toma parámetros 'req' (solicitud) y 'res' (respuesta).
        try { // Inicia un bloque try para manejar posibles errores.
            let families = await Family.find({}); // Encuentra todos los documentos en la colección 'Family' de manera asincrónica y los asigna a la variable 'families'.
            return res.status(200).json(families); // Envía una respuesta JSON con estado HTTP 200 (OK) que contiene el array 'families'.
        }
        catch (error) { // Maneja los errores capturados dentro del bloque try.
            return res.status(404).json({errors: [{msg:"Error en recuperar la lista de familias."}]}) // Envía una respuesta JSON con estado HTTP 404 (No encontrado) y un mensaje de error.
        }
    }     

 
    
    const create = async (req, res) => { 

        let familyNew = {               
                name: req.body.name
        };
	
        try {
		    let family = await Family.create(familyNew);           
            return res.status(200).json(family);     
			
        }
        catch(error) {
            console.log(error);
            return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al crear la família."}]})   
        } 
                    
    };


    const show = async (req, res) => { 
        try {        
            let family = await Family.findById(req.params.id);
            if(family == null )   {  
                return res.status(404).json({errors: [ {msg: "La família no existeix."} ]})   
            }
            return res.status(200).json(family);               
        }
        catch(error) {          
              return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al recuperar la família."}]})           
        }
    }
       

    

    // Esborrar Familia
    const destroy = async (req, res) => { 
        const familyId = req.params.id;
        try {           
            
            let num= await CF.find({ family: req.params.id}).count();
            if(num!=0) {
                return res.status(404).json({errors: [ {msg: "Existeixen cicles formatius d'aquesta família. No es pot esborrar."} ]})
            
            }

            var family = await Family.findByIdAndDelete(familyId);
            if (family == null) {                               
                return res.status(404).json({errors: [ {msg: "La família no existeix."} ]})
            }                       
            return res.status(200).json(family);
    
       } catch(error) {           
        return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema esborrant la família."}]}) 
       }       
    };

    
    const update = async (req, res) => { 
               
        var family = {
            name : req.body.name,            
            _id: req.params.id,
        }        
    
        try {
            var updatedFamily = await Family.findByIdAndUpdate(
                   req.params.id, family , {runValidators: true,  new: true }) 
            if(updatedFamily == null )   {  
                return res.status(404).json({errors: [ {msg: "La família no existeix."} ]}) 
            }
            return res.status(201).json(updatedFamily);
          }
          catch(error) {          
            return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema actualitzant la família."}]})    
          }
       
    };

    // ASSIGNAR IMATGE AL MATERIAL

const image = async (req, res) => {  

    try {
        let family = await Family.findById(req.params.id)  
        
        console.log(req.file)      
        //family.image = "http://localhost:5000/material/" + req.file.filename;
        //family.save();        
        res.status(200).json(family);
        

    } catch (error) {
        console.log(error)
        return res.status(404).json({errors: [{msg:"Hi ha hagut un problema a l'assignar la imatge a la família."}]})    
    }
}
    
    module.exports = {        
        all,
        show,
        create,
        destroy,
        update,      
        image 
    };
