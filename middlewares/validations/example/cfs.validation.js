const { body } = require("express-validator");
var Family = require("../../../models/example/family");
var CF = require("../../../models/example/cf");

rules = [ 
    body("name")
      .trim()
      .isLength({ min: 1})
      .withMessage('El camp nom és massa curt.')   
      .isLength({ max: 40})
      .withMessage('El camp nom és massa llarg.')       
      .escape()
      .custom(async function(value, {req}) {                 
        const cf = await CF.findOne({name:value});          
        if (cf) {    
            if(!req.params.id) throw new Error('El nom del cicle formatiu ja existeix.');
            else {
                if(req.params.id!==cf.id)      
                   throw new Error('El nom del cicle formatiu ja existeix.'); 
                else return true;
            }        
        }
        return true;        
      }),   
    body("code")
      .trim()
      .isLength({ min: 1})
      .withMessage('El camp codi és massa curt.')   
      .isLength({ max: 6})
      .withMessage('El camp codi és massa llarg.')       
      .escape()
      .custom(async function(value, {req}) {                 
        const cf = await CF.findOne({code:value});          
        if (cf) {          
            if(!req.params.id) throw new Error('El nom del cicle formatiu ja existeix.');
            else {
                if(req.params.id!==cf.id)      
                   throw new Error('El nom del cicle formatiu ja existeix.'); 
                else return true;
            }                
        }
        return true;        
      }),   
    body("family")
      .trim()
      .isMongoId()
      .withMessage("L'identificador de la família no és correcte.")
      .custom(async function(value, {req}) {                 
        const family = await Family.findById(value);          
        if (!family) {          
            throw new Error('La família professional no existeix.');              
        }
        return true;        
      }),  
    body("grade")
        .isIn(["GM","GS"])
        .withMessage('El valor del grau és incorrecte: valors permesos GM o GS') ,
    body("career_opportunities")
      .isArray({min:1})
      .withMessage("S'ha de tenir almenys una sortida professional"),
    body("info_modules")
      .isArray({min:1})
      .withMessage("S'ha de tenir almenys un mòdul professional"),
    body("info_modules.*.number")            
      .isInt({min:1, max:20})
      .withMessage("El número de mòdul ha d'estar entre 1 i 20"),
      body("info_modules.*.name")
      .trim()   
      .escape()
      .isLength({ min: 1})
      .withMessage('El camp nom del mòdul és massa curt.'),
   
  ];
    
  module.exports = {   
    rules,
  }