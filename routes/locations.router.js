/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: The locations managing API
 * /api/locations:
 *   get:
 *     summary: Lists all the locations
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: The list of the locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *   post:
 *     summary: Create a new location
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: The created location.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       500:
 *         description: Some server error
 * /api/locations/{id}:
 *   get:
 *     summary: Get the location by id
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The location id
 *     responses:
 *       200:
 *         description: The location response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: The location was not found
 *   put:
 *    summary: Update the location by the id
 *    tags: [Locations]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The location id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Location'
 *    responses:
 *      200:
 *        description: The location was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Location'
 *      404:
 *        description: The location was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the location by id
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The location id
 *
 *     responses:
 *       200:
 *         description: The location was deleted
 *       404:
 *         description: The location was not found
 */


var express = require("express");
var router = express.Router();


const locations_controller = require("../controllers/locations.controller")
const {validateInput} = require('../middlewares/validateInput')
const {rules} = require('../middlewares/validations/locations.validation')

var auth_middleware = require("../middlewares/auth.middleware");

//router.use([auth_middleware.isAuth]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]);


router.get('/',[auth_middleware.isAuth], locations_controller.all); 
router.get('/list',[auth_middleware.isAuth], locations_controller.paginedFiltered); 
router.get('/:id',[auth_middleware.isAuth], locations_controller.show);
router.post('/',[auth_middleware.isAuth,auth_middleware.withRole('Admin')], rules, validateInput, locations_controller.create);
router.delete('/:id',[auth_middleware.isAuth,auth_middleware.withRole('Admin')], locations_controller.destroy);
router.put('/:id',[auth_middleware.isAuth,auth_middleware.withRole('Admin')],rules, validateInput, locations_controller.update);


module.exports = router;