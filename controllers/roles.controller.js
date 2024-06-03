const Role = require("../models/role");

// API Methods

const all = async (req, res) => {
    try {
        let roles = await Role.find({});
        return res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Error en recuperar la llista de rols." }] });
    }
};

const create = async (req, res) => {
    let roleNew = {
        name: req.body.name,
        actions: req.body.actions // Asignar acciones desde la solicitud
    };

    try {
        let role = await Role.create(roleNew);
        return res.status(201).json(role);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hi va haver un problema en crear el rol." }] });
    }
};

const destroy = async (req, res) => { 
    const roleId = req.params.id; // Obtener el ID del rol de los parámetros de la solicitud
    try {
        const role = await Role.findByIdAndDelete(roleId); // Buscar y eliminar el rol por su ID
        if (!role) { // Si no se encuentra el rol
            return res.status(404).json({ errors: [{ msg: "El rol no existeix." }] }); // Devolver un error 404
        }
        return res.status(200).json(role); // Devolver el rol eliminado
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hi va haver un problema en eliminar el rol." }] }); // Devolver un error 500 en caso de fallo
    }
};

const update = async (req, res) => { 
    const roleId = req.params.id; // Obtener el ID del rol de los parámetros de la solicitud
    const updatedRole = {
        name: req.body.name,
        actions: req.body.actions // Asignar acciones desde la solicitud
    };

    try {
        const role = await Role.findByIdAndUpdate(roleId, updatedRole, { new: true }); // Buscar y actualizar el rol por su ID
        if (!role) { // Si no se encuentra el rol
            return res.status(404).json({ errors: [{ msg: "El rol no existeix." }] }); // Devolver un error 404
        }
        return res.status(201).json(role); // Devolver el rol actualizado
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hi va haver un problema en actualitzar el rol." }] }); // Devolver un error 500 en caso de fallo
    }
};

const show = async (req, res) => { 
    const roleId = req.params.id; // Obtener el ID del rol de los parámetros de la solicitud
    try {
        const role = await Role.findById(roleId); // Buscar el rol por su ID
        if (!role) { // Si no se encuentra el rol
            return res.status(404).json({ errors: [{ msg: "El rol no existeix." }] }); // Devolver un error 404
        }
        return res.status(200).json(role); // Devolver el rol encontrado
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Hi va haver un problema en recuperar el rol." }] }); // Devolver un error 500 en caso de fallo
    }
};

const paginatedFiltered = async (req, res) => {
    const options = {
        page: req.query.page || 1,
        limit: 3,
        sort: { _id: -1 },
        collation: {
            locale: 'en',
        },
    };

    let queryFilters = {};

    if (req.query.name) {
        queryFilters.name = new RegExp(req.query.name, 'i');
    }

    // Agregar más filtros según sea necesario, como el filtro por acciones

    try {
        const roles = await Role.paginate(queryFilters, options);
        return res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errors: [{ msg: "Error en recuperar la llista de rols paginada i filtrada." }] });
    }
};

module.exports = {
    all,
    create,
    destroy,
    show,
    paginatedFiltered,
    update
};
