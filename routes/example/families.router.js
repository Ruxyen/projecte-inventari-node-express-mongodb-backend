var express = require("express");
var router = express.Router();

const families_controller = require("../../controllers/example/families.controller")


const {validateInput} = require('../../middlewares/validateInput')
const {rules} = require('../../middlewares/validations/example/families.validation')

var auth_middleware = require("../../middlewares/auth.middleware");
var upload = require('../../libs/storage');


//router.use([auth_middleware.isAuth]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]);

router.get('/', families_controller.all); 
router.get('/:id', families_controller.show);
router.post('/', rules, validateInput, families_controller.create);
router.delete('/:id', families_controller.destroy);
router.put('/:id', rules, validateInput,families_controller.update);

router.put('/image/:id', upload.single('image'), families_controller.image);


module.exports = router;