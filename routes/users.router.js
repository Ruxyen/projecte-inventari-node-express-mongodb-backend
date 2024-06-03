var express = require("express");
var router = express.Router();

const users_controller = require("../controllers/users.controller.js")
const {validateInput} = require('../middlewares/validateInput.js')
const {rules,rulesUpdate} = require('../middlewares/validations/users.validation.js')

var auth_middleware = require("../middlewares/auth.middleware");
var upload = require('../libs/storage');

router.use([auth_middleware.isAuth]);

router.get('/', users_controller.all); 

router.get('/list',[auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])] ,users_controller.paginated);

router.get('/:id',users_controller.show);

router.post('/',[auth_middleware.isAuth,auth_middleware.withRole(['Admin'])], rules, validateInput, users_controller.create);

router.delete('/:id',[auth_middleware.isAuth,auth_middleware.withRole(['Admin'])], users_controller.destroy);

router.put('/:id',[auth_middleware.isAuth,auth_middleware.withRole(['Admin'])], rulesUpdate, validateInput, users_controller.update);

module.exports = router;
