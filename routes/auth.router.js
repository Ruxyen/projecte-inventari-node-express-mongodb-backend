var express = require('express');
var router = express.Router();


var authController = require('../controllers/auth.controller');
const {validateInput} = require('../middlewares/validateInput')
const {loginRules} = require("../middlewares/validations/auth.validation");

router.post('/login',loginRules,validateInput,  authController.login);



module.exports = router;