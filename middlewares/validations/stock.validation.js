const { body } = require("express-validator");

// Reglas de validación para el modelo Stock
const stockValidationRules = [
    body("units")
        .isInt({ min: 0 })
        .withMessage("Las unidades deben ser un número entero no negativo"),
    body("material")
        .isMongoId()
        .withMessage("El material debe ser un identificador válido de MongoDB"),
    body("location")
        .isMongoId()
        .withMessage("La ubicación debe ser un identificador válido de MongoDB"),
    body("name")
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage("El nombre debe tener entre 1 y 30 caracteres")
];

module.exports = {
    stockValidationRules
};
    