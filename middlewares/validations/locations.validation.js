const { body } = require("express-validator");

var Location = require("../../models/location");
var Zone = require("../../models/zone");

rules = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("El camp nom és massa curt.")
    .isLength({ max: 30 })
    .withMessage("El camp nom és massa llarg.")
    .escape()
    .custom(async function (value, { req }) {
      const location = await Location.findOne({ name: value });
      if (location) {
        if (!req.params.id) throw new Error("El nom del location ja existeix.");
        else {
          if (req.params.id !== location.id)
            throw new Error("El nom del location ja existeix.");
          else return true;
        }
      }
      return true;
    }),
    body("zone")
    .trim()
    .isMongoId()
    .withMessage("L'identificador de la Zona no és correcte.")
    .custom(async function(value, {req}) {                 
      const zone = await Zone.findById(value);          
      if (!zone) {          
          throw new Error('La Zona no existeix.');              
      }
      return true;        
    })
];

module.exports = {
  rules,
};
