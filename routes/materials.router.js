var express = require("express");
var router = express.Router();
var upload = require('../libs/storage');

const materials_controller = require("../controllers/materials.controller")
const {validateInput} = require('../middlewares/validateInput')
const {rules} = require('../middlewares/validations/materials.validation')

var auth_middleware = require("../middlewares/auth.middleware");

router.use([auth_middleware.isAuth]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]);

//Nomes Admin i Teacher poden modifcar/crear/eliminar materials (modificable)

/**
 * @swagger
 * /api/materials:
 *   get:
 *     summary: Get all materials
 *     tags: [Materials]
 *     responses:
 *       200:
 *         description: A list of materials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Material'
 */
router.get('/', materials_controller.all);

/**
 * @swagger
 * /api/materials:
 *   post:
 *     summary: Create a new material
 *     tags: [Materials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       201:
 *         description: The created material
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       400:
 *         description: Bad request, material data is invalid
 */
router.post('/', [auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])], rules, validateInput, materials_controller.create);

/**
 * @swagger
 * /api/materials/list:
 *   get:
 *     summary: Get paginated list of materials
 *     tags: [Materials]
 *     responses:
 *       200:
 *         description: A paginated list of materials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Material'
 */
router.get('/list', materials_controller.paginedFiltered);

/**
 * @swagger
 * /api/materials/{id}:
 *   get:
 *     summary: Get a material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The material ID
 *     responses:
 *       200:
 *         description: A single material
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 */
router.get('/:id', materials_controller.show);

/**
 * @swagger
 * /api/materials/{id}:
 *   delete:
 *     summary: Delete a material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The material ID
 *     responses:
 *       200:
 *         description: Material deleted successfully
 *       404:
 *         description: Material not found
 */
router.delete('/:id', [auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])], materials_controller.destroy);

/**
 * @swagger
 * /api/materials/{id}:
 *   put:
 *     summary: Update a material by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The material ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       200:
 *         description: Updated material information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       404:
 *         description: Material not found
 */
router.put('/:id', [auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])], materials_controller.update);

/**
 * @swagger
 * /api/materials/image/{id}:
 *   put:
 *     summary: Update materials image by ID
 *     tags: [Materials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The material ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       200:
 *         description: Updated material information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       404:
 *         description: Material not found
 *       400:
 *         description: Image not found
 */
router.put('/image/:id', upload.single('image'), materials_controller.image);






module.exports = router;
