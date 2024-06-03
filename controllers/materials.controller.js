var Material = require("../models/material");
var Stock = require("../models/stock");



    //API Methods 
    
    const all = async (req, res) => {  
        try {
            let materials = await Material.find({});           
            return res.status(200).json(materials);          
        }
        catch (error) {
            return res.status(404).json({errors: [{msg:"Error en recuperar la llista de Materials."}]})
        }
    }  


    const create = async (req, res) => { 

        let materialNew = {               
                name: req.body.name,
                image: req.body.image,
                description: req.body.description,
                category: req.body.category
        };
	
        try {
		    let material = await Material.create(materialNew);           
            return res.status(200).json(material);     
			
        }
        catch(error) {
            console.log(error);
            return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al crear el Material."}]})   
        }
        
    };


    const show = async (req, res) => { 
        try {        
            let material = await Material.findById(req.params.id);
            if(material == null )   {  
                return res.status(404).json({errors: [ {msg: "El material no existeix."} ]})   
            }
            return res.status(200).json(material);               
        }
        catch(error) {          
              return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema al recuperar el material."}]})           
        }
    }

    const destroy = async (req, res) => { 
        const materialId = req.params.id;
        try {
            let num = await Stock.find({ material: req.params.id }).count();
            if (num !== 0) {
                return res.status(404).json({ errors: [{ msg: "Existeix Stock d'aquest material. No es pot esborrar." }] });
            }
            var material = await Material.findByIdAndDelete(materialId);
            if (material === null) {                               
                return res.status(404).json({ errors: [{ msg: "El material no existeix." }] });
            }                       
            return res.status(200).json(material);
    
        } catch (error) {           
            return res.status(404).json({ errors: [{ msg: "Hi ha hagut un problema esborrant el material." }] });
        }       
    };
    



    const update = async (req, res) => { 
               
        var material = {
            name : req.body.name,            
            image: req.body.image,
            description: req.body.description,
            category: req.body.category,
            _id: req.params.id
        }        
    
        try {
            var updatedMaterial = await Material.findByIdAndUpdate(
                   req.params.id, material , {runValidators: true,  new: true }) 
            if(updatedMaterial == null )   {  
                return res.status(404).json({errors: [ {msg: "El material no existeix."} ]}) 
            }
            return res.status(201).json(updatedMaterial);
          }
          catch(error) {          
            return res.status(404).json({errors: [ {msg:"Hi ha hagut un problema actualitzant el material."}]})    
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
    };

    let queryFilters={};      
       
    if(req.query.name) {           
        queryFilters.name = new RegExp(req.query.name, 'i');         
    }

    if(req.query.category) {           
        queryFilters.category = req.query.category;        
    }

    // console.log(queryFilters);

    try {
        var materials = await Material.paginate(queryFilters, options);
        return res.status(200).json(materials);        
    }
    catch (e) {
        return res.status(404).json({errors: [{msg:"Error en recuperar la llista de materials."}]})
    }
}

    // ASSIGNAR IMATGE AL MATERIAL
    const image = async (req, res) => {  
        try {
            
            const PORT = process.env.PORT || 8080; 
            const url = `http://localhost:${PORT}/images/materials/`;
            
            let material = await Material.findById(req.params.id);  
            console.log("req: ", req.file)
            
            if (!req.file) {
                return res.status(400).json({ errors: [{ msg: "No s'ha enviat cap imatge." }] });
            }
    
            //console.log("Archiu rebut:", req.file);
    
            // Guardar la imatge a la base de dades (la ruta)
            material.image = url + req.file.filename; 
            await material.save();
    
            res.status(200).json(material);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ errors: [{ msg: "Hi ha hagut un problema assignant la imatge al material." }] });
        }
    };
    


    module.exports = {        
        all,
        create,  
        paginedFiltered, 
        show,   
        destroy,
        update,
        image,
    };
