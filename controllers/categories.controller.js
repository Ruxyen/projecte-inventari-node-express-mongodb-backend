var Category = require("../models/category");
var Material = require("../models/material");


//API Methods

const all = async (req, res) => {
    try {
        let categories = await Category.find({});
        return res.status(200).json(categories);
    }
    catch (error) {
        return res.status(404).json({ errors: [{ msg: "Error en recuperar la llista de categories." }] })
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

    if(req.query.parent_id) {           
        queryFilters.parent_id = req.query.parent_id;       
    }

    // console.log(req.query);

    try {
        var category = await Category.paginate(queryFilters, options);
        return res.status(200).json(category);        
    }
    catch (e) {
        return res.status(404).json({errors: [{msg:"Error en recuperar la llista de categories."}]})
    }
}

// TREE

const arrayToTree = (arr, parent_id = null) =>
              arr.filter(item => item.parent_id == parent_id)
              .map(child => ({ id: child.id, name: child.name , parent_id: child.parent_id , children: arrayToTree(arr, child.id) }));

const tree = async (req, res) => {  
    try {
        let categories = await Category.find({}).sort({ name: 1 });                
        let catTree = arrayToTree(categories,null)                
        res.status(200).json(catTree );            
    }
    catch (error) {
        console.log(error)
        return res.status(404).json({errors: [{msg:"Error en recuperar la llista de categories."}]})
    }
}




const show = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);
        if (category == null) {
            return res.status(404).json({ errors: [{ msg: "La categoria no existeix." }] })
        }
        return res.status(200).json(category);
    }
    catch (error) {
        return res.status(404).json({ errors: [{ msg: "Hi ha hagut un problema al recuperar la categoria." }] })
    }
}


const create = async (req, res) => {

    let categoryNew = {
        name: req.body.name,
        parent_id: req.body.parent_id || ""
    };

    try {
        let category = await Category.create(categoryNew);
        return res.status(200).json(category);

    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ errors: [{ msg: "Hi ha hagut un problema al crear la categoria." }] })
    }

};


const destroy = async (req, res) => {
    const categoryId = req.params.id;
    try {
        let num = await Material.find({ category: req.params.id }).count();
        if (num != 0) {
            return res.status(404).json({ errors: [{ msg: "Existeix un material amb aquesta categoria. No es pot esborrar." }] })
        }

        var category = await Category.findByIdAndDelete(categoryId);
        if (category == null) {
            return res.status(404).json({ errors: [{ msg: "La categoria no existeix." }] })
        }
        return res.status(200).json(category);

    } catch (error) {
        return res.status(404).json({ errors: [{ msg: "Hi ha hagut un problema esborrant la categoria." }] })
    }
};


const update = async (req, res) => {

    var category = {
        name: req.body.name,
        _id: req.params.id,
        parent_id: req.body.parent_id || ""
    }

    try {
        var updatedCategory = await Category.findByIdAndUpdate(
            req.params.id, category, { runValidators: true, new: true })
        if (updatedCategory == null) {
            return res.status(404).json({ errors: [{ msg: "La categoria no existeix." }] })
        }
        return res.status(201).json(updatedCategory);
    }
    catch (error) {
        return res.status(404).json({ errors: [{ msg: "Hi ha hagut un problema actualitzant la categoria." }] })
    }

};

const deleteRecursive = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const recursiveDelete = async (id) => {
            const category = await Category.findById(id);
            if (!category) {
                throw new Error('Categoría no encontrada');
            }

            const subcategories = await Category.find({ parent_id: id });
            for (const subcategory of subcategories) {
                await recursiveDelete(subcategory._id);
            }

            await Category.deleteOne({ _id: id });
        };

        await recursiveDelete(categoryId);

        res.status(200).json({ message: "Categoría y todas sus subcategorías eliminadas correctamente." });
    } 
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la categoría", error: error.message });
    }
};


module.exports = {
    all,
    paginedFiltered,
    show,
    create,
    destroy,
    update,
    tree,
    deleteRecursive
};
