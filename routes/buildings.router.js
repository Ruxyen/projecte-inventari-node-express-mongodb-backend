var express = require("express");
var router = express.Router();

const buildings_controller = require("../controllers/buildings.controller")
const {validateInput} = require('../middlewares/validateInput')
const {rules} = require('../middlewares/validations/buildings.validation')

var auth_middleware = require("../middlewares/auth.middleware");


//router.use([auth_middleware.isAuth]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]);

router.get('/',[auth_middleware.isAuth], buildings_controller.all);
router.get('/list', [auth_middleware.isAuth], buildings_controller.paginedFiltered); 
router.get('/:id', [auth_middleware.isAuth], buildings_controller.show);
router.post('/', [auth_middleware.isAuth,auth_middleware.withRole('Admin')], rules, validateInput, buildings_controller.create);
router.delete('/:id', [auth_middleware.isAuth,auth_middleware.withRole('Admin')], buildings_controller.destroy);
router.put('/:id', [auth_middleware.isAuth,auth_middleware.withRole('Admin')], buildings_controller.update);


module.exports = router;