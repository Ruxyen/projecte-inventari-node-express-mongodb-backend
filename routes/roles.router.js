var express = require("express");
var router = express.Router();

const roles_controller = require("../controllers/roles.controller.js");
const {validateInput} = require('../middlewares/validateInput');
const {rules} = require('../middlewares/validations/roles.validation');

var auth_middleware = require("../middlewares/auth.middleware");
var upload = require('../libs/storage');

router.use([auth_middleware.isAuth]);

router.get('/', roles_controller.all); 

router.get('/list',[auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])],roles_controller.paginatedFiltered);

router.get('/:id',[auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])],  roles_controller.show);

router.post('/',[auth_middleware.isAuth,auth_middleware.withRole(['Admin'])], rules, validateInput,roles_controller.create);

router.delete('/:id',[auth_middleware.isAuth,auth_middleware.withRole(['Admin'])],roles_controller.destroy);

router.put('/:id',[auth_middleware.isAuth,auth_middleware.withRole(['Admin'])], rules, validateInput, roles_controller.update);

module.exports = router;