const { body } = require("express-validator");
const Building = require("../../models/building");

const rules = [
    body("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage('El camp nom és massa curt.')
        .isLength({ max: 30 })
        .withMessage('El camp nom és massa llarg.')
        .escape(),   

    body("building")
        .trim()
        .isMongoId()
        .withMessage("L'identificador de l'edifici no és correcte.")
        .custom(async function (value) {
            const building = await Building.findById(value);
            if (!building) {
                throw new Error("L'edifici no existeix.");
            }
            return true;
        }),
];

module.exports = {
    rules,
};
