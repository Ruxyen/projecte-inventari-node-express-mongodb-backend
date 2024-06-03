var express = require("express");
var router = express.Router();

const cfs_controller = require("../../controllers/example/cfs.controller")
const {validateInput} = require('../../middlewares/validateInput')
const {rules} = require('../../middlewares/validations/example/cfs.validation')

router.get('/', cfs_controller.all); 
router.get('/list', cfs_controller.paginedFiltered); 
router.get('/:id', cfs_controller.show);
router.post('/', rules, validateInput, cfs_controller.create);
router.delete('/:id', cfs_controller.destroy);
router.put('/:id', rules, validateInput,cfs_controller.update);

module.exports = router;