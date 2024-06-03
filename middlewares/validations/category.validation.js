const { body } = require("express-validator");
var Category = require("../../models/category");

rules = [ 
    body("name")
      .trim()        
      .isLength({ min: 1})
      .withMessage('El camp nom és massa curt.')   
      .isLength({ max: 40})
      .withMessage('El camp nom és massa llarg.')
      .custom(async function(value, {req}) {                 
        const category = await Category.findOne({name:value});          
        if (category) {    
            if(!req.params.id) throw new Error('El nom de la cateogria ja existeix.');
            else {
                if(req.params.id!==category.id)      
                   throw new Error('El nom de la categoria ja existeix.'); 
                else return true;
            }        
        }
        return true;        
      })     
      .escape()   
  ];
    
  module.exports = {   
    rules,
  }