const { body } = require("express-validator");

const rules = [
    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body("functionality")
        .trim()
        .isLength({ min: 1 })
        .escape()
];

module.exports = {
    rules
};