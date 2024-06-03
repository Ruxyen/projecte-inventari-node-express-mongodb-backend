const { body } = require("express-validator");

rules = [ 
    body("name")
      .trim()        
      .isLength({ min: 1})
      .withMessage('El camp nom és massa curt.')   
      .isLength({ max: 30})
      .withMessage('El camp nom és massa llarg.')       
      .escape(),

      body("description")
      .trim()        
      .isLength({ min: 1})
      .withMessage('El camp descripció és massa curt.')   
      .isLength({ max: 200})
      .withMessage('El camp descripció és massa llarg.')       
      .escape(),

      body("category")
      .trim()    
      .isMongoId()
      .withMessage("L'identificador del material no és correcte.")    
      .isLength({ min: 1})
      .withMessage('El camp categoria és massa curt.')   
      .isLength({ max: 24})
      .withMessage('El camp categoria és massa llarg.')       
      .escape(),
  ];
    
  module.exports = {   
    rules,
  }