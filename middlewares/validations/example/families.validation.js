const { body } = require("express-validator");

rules = [ 
    body("name")
      .trim()        
      .isLength({ min: 1})
      .withMessage('El camp nom és massa curt.')   
      .isLength({ max: 30})
      .withMessage('El camp nom és massa llarg.')       
      .escape()    
  ];
    
  module.exports = {   
    rules,
  }