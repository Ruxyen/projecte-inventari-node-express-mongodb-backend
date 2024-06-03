const Stock = require("../models/stock");

const all = async (req, res) => {
    try {
        let filter = {};
        if (req.query.filter) {
            filter = JSON.parse(req.query.filter);
        }
        const stocks = await Stock.find(filter);
        return res.status(200).json(stocks);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Error en recuperar la llista d'estocs." }] });
    }
};

const paginatedFiltered = async (req, res) => {  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 

    const options = {
        page: page,
        limit: limit,
        sort: { _id: -1 },
        collation: {
          locale: 'en',
        },
        populate: "location material"
    };

    let queryFilters = {};      
    
    // No tindrà massa utilitat
    /*
    if(req.query.units) {           
        queryFilters.units = req.query.units;          
    }*/

    // S'han afegit filtres per material o location
    if(req.query.material) {           
        queryFilters.material = req.query.material;       
    }

    if(req.query.location) {           
        queryFilters.location = req.query.location;       
    }

    
    try {
        const result = await Stock.paginate(queryFilters, options);
        return res.status(200).json(result);        
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Error de recuperar la llista d'estocs paginats." }] });
    }
}


const show = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (!stock) {
            return res.status(404).json({ errors: [{ msg: "L'estoc no existeix." }] });
        }
        return res.status(200).json(stock);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Ha ocorregut un error en recuperar l'estoc." }] });
    }
};
const create = async (req, res) => {
    const { units, location, material } = req.body;
    try {
        // Crear un nuevo documento de Stock utilizando los valores de la solicitud
        const newStock = await Stock.create({ units, location, material });
        return res.status(201).json(newStock);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Ha ocorregut un error en crear l'estoc." }] });
    }
};

const destroy = async (req, res) => {
    try {

        const deletedStock = await Stock.findByIdAndDelete(req.params.id);
        if (!deletedStock) {
            return res.status(404).json({ errors: [{ msg: "L'estoc no existeix." }] });
        }
        return res.status(200).json({ msg: "S'ha eliminat correctament l'estoc.", deletedStock });
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Ha ocorregut un error en eliminar l'estoc." }] });
    }
};



const update = async (req, res) => {
    const { name } = req.body;
    try {
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updatedStock) {
            return res.status(404).json({ errors: [{ msg: "L'estoc no existeix." }] });
        }
        return res.status(200).json(updatedStock);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Ha ocorregut un error en actualitzar l'estoc." }] });
    }
};  

module.exports = {
    all,
    paginatedFiltered,
    show,
    create,
    destroy,
    update
};
