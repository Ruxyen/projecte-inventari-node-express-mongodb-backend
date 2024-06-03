const { body } = require("express-validator");

loginRules = [
    // Validate and sanitize fields.
    body("email")
      .trim()
      .notEmpty()
      .withMessage("L'Email és obligatori."), 
    body("password")
      .trim()
      .notEmpty()
      .withMessage('El Password és obligatori'),    
  ];



  module.exports = {   
    loginRules
  }