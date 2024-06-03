var express = require("express");
var router = express.Router();

const stocksController = require("../controllers/stocks.controller");

router.get('/', stocksController.all);
router.get('/list', stocksController.paginatedFiltered);
router.get('/:id', stocksController.show);
router.post('/', stocksController.create);
router.delete('/:id', stocksController.destroy);
router.put('/:id', stocksController.update);

module.exports = router;
