const { body } = require("express-validator");

var Building = require("../../models/building");

rules = [ 
    body("name")
      .trim()        
      .isLength({ min: 1})
      .withMessage('El camp nom és massa curt.')   
      .isLength({ max: 30})
      .withMessage('El camp nom és massa llarg.')       
      .escape()   
      .custom(async function(value, {req}) {                 
        const building = await Building.findOne({name:value});          
        if (building) {    
            if(!req.params.id) throw new Error("El nom de l'edifici ja existeix.");
            else {
                if(req.params.id!==building.id)      
                   throw new Error("El nom de l'edifici ja existeix.");
                else return true;
            }        
        }
        return true;        
      }), 
  ];
   
  module.exports = {   
    rules,
  }