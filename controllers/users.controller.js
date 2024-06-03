const User = require("../models/user");
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const user = require("../models/user");

User.paginate = mongoosePaginate.paginate;

// Métodos de la API

const all = async (req, res) => {
    try {
        let usuarios = await User.find({}).populate('role', 'name'); // Aquí se utiliza populate() para obtener el campo 'name' del modelo Role
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: "Error al recuperar els usuaris." });
    }
};


const show = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        let usuario = await User.findById(idUsuario).populate('role');
        if (!usuario) {
            return res.status(404).json({ error: "L'usuari no s'ha trobat" });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({ error: "Error al recuperar l'usuari." });
    }
};


const create = async (req, res) => {
    try {
        const { username, password, email, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12); 
        let nuevoUsuario = await User.create({ username, password: hashedPassword, email, role});
        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        return res.status(500).json({ error: "Error al crear l'usuari." });
    }
};


const destroy = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        let usuarioEliminado = await User.findByIdAndDelete(idUsuario);
        if (!usuarioEliminado) {
            return res.status(404).json({ error: "L'usuari no s'ha trobat" });
        }
        return res.status(200).json({ message: "Usuari eliminat correctament" });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar l'usuari." });
    }
};

const update = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const { username, password, email, role } = req.body;
        let usuarioActualizado = await User.findById(idUsuario);

        if (!usuarioActualizado) {
            return res.status(404).json({ error: "El usuario no se ha encontrado." });
        }

        // Actualiza solo los campos que se han proporcionado
        if (username) usuarioActualizado.username = username;
        if (email) usuarioActualizado.email = email;

        if (role) {
            // Si `role` es un array de objetos (con ID y nombre), extrae solo los IDs
            const rolesIds = role.map(r => r.value);
            usuarioActualizado.role = rolesIds;
        }

        // Si se proporciona una nueva contraseña, hashearla antes de almacenarla
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            usuarioActualizado.password = hashedPassword;
        }

        // Guarda el usuario actualizado
        await usuarioActualizado.save();

        // Vuelve a cargar el usuario con los roles poblados
        usuarioActualizado = await User.findById(idUsuario).populate('role');

        return res.status(200).json(usuarioActualizado);
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar el usuario." });
    }
};





// Función para obtener usuarios paginados
const paginated = async (req, res) => {
    const options = {
        page: req.query.page || 1,
        limit: 10 ,
        populate: 'role'
    };

    try {
        const usuarios = await User.paginate({}, options);
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: "Error al recuperar els usuaris paginats." });
    }
};

module.exports = {
    all,
    show,
    create,
    destroy,
    update,
    paginated
};
