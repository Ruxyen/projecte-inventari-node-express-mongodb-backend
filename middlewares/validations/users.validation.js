const { body } = require("express-validator");

const rules = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage('El nom de usuari és massa curt.')
        .isLength({ max: 30 })
        .withMessage('El nom de usuari és massa llarg.')
        .escape(),
    
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage('La contrasenya ha de tenir com a mínim 6 caràcters.')
        .isLength({ max: 30 })
        .withMessage('La contrasenya és massa llarga.')
        .escape(),

    body("email")
        .trim()
        .isEmail()
        .withMessage('El correu electrònic no és vàlid.')
        .isLength({ max: 50 })
        .withMessage('El correu electrònic és massa llarg.')
        .escape()
];


const rulesUpdate = [
    body("username")
        .trim()
        .isLength({ min: 1 })
        .withMessage('El nom de usuari és massa curt.')
        .isLength({ max: 30 })
        .withMessage('El nom de usuari és massa llarg.')
        .escape(),
    
    body("password")
        .trim()
        .optional()
        .isLength({ min: 6 })
        .withMessage('La contrasenya ha de tenir com a mínim 6 caràcters.')
        .isLength({ max: 30 })
        .withMessage('La contrasenya és massa llarga.')
        .escape(),

    body("email")
        .trim()
        .isEmail()
        .withMessage('El correu electrònic no és vàlid.')
        .isLength({ max: 50 })
        .withMessage('El correu electrònic és massa llarg.')
        .escape()
];


module.exports = {
    rules, rulesUpdate
};
