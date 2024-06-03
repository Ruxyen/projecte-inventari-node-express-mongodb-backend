
var express = require("express");
var router = express.Router();


const zones_controller = require("../controllers/zones.controller")
const {validateInput} = require('../middlewares/validateInput')
const {rules} = require('../middlewares/validations/zones.validation')

var auth_middleware = require("../middlewares/auth.middleware");

router.use([auth_middleware.isAuth]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]);

var upload = require('../libs/storage');



/**
 * @swagger
 * /api/zones:
 *   get:
 *     summary: Get all zones
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: A list of zones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zone'
 */


router.get('/', zones_controller.all);


/**
 * @swagger
 * /api/zones/list:
 *   get:
 *     summary: Get paginated list of zones
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: A paginated list of zones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zone'
 */


router.get('/list', zones_controller.paginedFiltered); 




/**
 * @swagger
 * /api/zones/{id}:
 *   get:
 *     summary: Get a zone by ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The zone ID
 *     responses:
 *       200:
 *         description: A single zone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 */

router.get('/:id', zones_controller.show);

/**
 * @swagger
 * /api/zones:
 *   post:
 *     summary: Create a new zone
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       201:
 *         description: The created zone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 *       400:
 *         description: Bad request, zone data is invalid
 */

router.post('/',([auth_middleware.isAuth,auth_middleware.withRole('Admin')]), zones_controller.create);


/**
 * @swagger
 * /api/zones/{id}:
 *   delete:
 *     summary: Delete a zone by ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The zone ID
 *     responses:
 *       200:
 *         description: Zone deleted successfully
 *       404:
 *         description: Zone not found
 */

router.delete('/:id',([auth_middleware.isAuth,auth_middleware.withRole('Admin')]), zones_controller.destroy);


/**
 * @swagger
 * /api/zones/{id}:
 *   put:
 *     summary: Update a zone by ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The zone ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Zone'
 *     responses:
 *       200:
 *         description: Updated zone information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zone'
 *       404:
 *         description: Zone not found
 */

router.put('/:id',([auth_middleware.isAuth,auth_middleware.withRole('Admin')]), rules, validateInput,zones_controller.update);

router.put('/image/:id', upload.single('blueprint'), zones_controller.image);

module.exports = router;

