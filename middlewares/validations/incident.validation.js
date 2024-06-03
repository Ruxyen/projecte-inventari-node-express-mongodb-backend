const { body } = require("express-validator");
const Incident = require("../../models/incident");

const rules = [
        
    body("description")
        .trim()
        .isLength({ min: 1 })
        .withMessage("La descripción es demasiado corta.")
        .isLength({ max: 255 })
        .withMessage("La descripción es demasiado larga.")
        .escape(),
        
    body("creation_date")
        .trim()
        .isISO8601()
        .toDate()
        .withMessage("La fecha de creación no es válida."),

    body("type")
        .trim()
        .isLength({ min: 1 })
        .withMessage("El tipo es demasiado corto.")
        .isLength({ max: 40 })
        .withMessage("El tipo es demasiado largo.")
        .escape(),

    body("state")
    .optional()  
        .trim()
        .isLength({ min: 1 })
        .withMessage("El estado es demasiado corto.")
        .isLength({ max: 40 })
        .withMessage("El estado es demasiado largo.")
        .escape(),
    
        body("priority")
        .trim()
        .isLength({ min: 1 })
        .withMessage("La prioridad es demasiado corta.")
        .isLength({ max: 40 })
        .withMessage("La prioridad es demasiado larga.")
        .escape(),
    
    body("resolution_date")
        .optional()     
        .trim()
        .isISO8601()
        .toDate()
        .withMessage("La fecha de resolución no es válida."),
    
    body("resolution")
        .optional()     
        .trim()
        .isLength({ min: 1 })
        .withMessage("La resolución es demasiado corta.")
        .isLength({ max: 255 })
        .withMessage("La resolución es demasiado larga.")
        .escape(),
];

module.exports = {
    rules
};