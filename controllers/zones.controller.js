var Zone = require("../models/zone");


const all = async (req, res) => {
    try {
        let zones = await Zone.find({}).populate('building');
        return res.status(200).json(zones);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Error en recuperar la llista de zones." }] });
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
        populate: 'building'
    };

    let queryFilters={};      
       
    if(req.query.name) {          
        queryFilters.name = new RegExp(req.query.name, 'i') ;             
       }     

    if(req.query.building) {           
        queryFilters.building = req.query.building;        
    }

    //console.log(queryFilters);

    try {
        var zones = await Zone.paginate(queryFilters, options);
        return res.status(200).json(zones);        
    }
    catch (e) {
        return res.status(404).json({errors: [{msg:"Error en recuperar la llista de zones."}]})
    }
}

const show = async (req, res) => {
    try {
        let zone = await Zone.findById(req.params.id);
        if (!zone) {
            return res.status(404).json({ errors: [{ msg: "La zona no existeix." }] });
        }
        return res.status(200).json(zone);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hi ha hagut un problema al recuperar la zona." }] });
    }
}; 

const create = async (req, res) => {
    const { name, building } = req.body;   

    try {
        let zone = await Zone.create({ name, building });
        return res.status(201).json(zone);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hi ha hagut un problema al crear la zona." }] });
    }
};



const destroy = async (req, res) => {
    const { id } = req.params;

    try {
        const zone = await Zone.findById(id);
        if (!zone) {
            return res.status(404).json({ errors: [{ msg: "Zone not found." }] });
        }

        await zone.remove();
        return res.status(200).json({ msg: "Zone deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Internal Server Error." }] });
    }
};


const update = async (req, res) => {
    var zone = {
        name: req.body.name,
        blueprint: req.body.blueprint,
        building: req.body.building,
        _id: req.params.id,
    };

    try {
        var updatedZone = await Zone.findByIdAndUpdate(
            req.params.id, zone, { runValidators: true, new: true }
        );

        if (!updatedZone) {
            return res.status(404).json({ errors: [{ msg: "La zona no existeix." }] });
        }

        return res.status(200).json(updatedZone);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hi ha hagut un problema actualitzant la zona." }] });
    }
};


const image = async (req, res) => {  

    try {
        let zone = await Zone.findById(req.params.id)  
        
        console.log(req.file)      
        zone.blueprint = req.file.filename;
        zone.save();        
        res.status(200).json(zone);
        

    } catch (error) {
        console.log(error)
        return res.status(404).json({errors: [{msg:"Hi ha hagut un problema a l'assignar la imatge a la zona."}]})    
    }
}

module.exports = {
    all,
    paginedFiltered,
    show,
    create,
    destroy,
    update,
    image
};
