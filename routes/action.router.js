var express = require("express");
var router = express.Router();

const action_controller = require("../controllers/action.controller.js");

const { validateInput } = require('../middlewares/validateInput.js');
const { rules } = require('../middlewares/validations/actions.validation.js');

var auth_middleware = require("../middlewares/auth.middleware");


// router.use([auth_middleware.isAuth]); 
router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);

/**
 * @swagger
 * tags:
 *   name: Actions
 *   description: Endpoints para manejar acciones
 */

/**
 * @swagger
 * /actions:
 *   get:
 *     summary: Obtiene todas las acciones
 *     tags: [Actions]
 *     responses:
 *       '200':
 *         description: Lista de acciones obtenida correctamente
 *       '500':
 *         description: Error del servidor
 */
router.get('/', action_controller.all);

/**
 * @swagger
 * /actions/paginate:
 *   get: 
 *     summary: Obtiene acciones paginadas
 *     tags: [Actions]
 *     responses:
 *       '200':
 *         description: Lista de acciones paginadas obtenida correctamente
 *       '500':
 *         description: Error del servidor
 */
router.get('/list', action_controller.paginate);

/**
 * @swagger
 * /actions/{id}:
 *   get:
 *     summary: Obtiene una acción por su ID
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la acción a obtener
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Acción obtenida correctamente
 *       '404':
 *         description: La acción no fue encontrada
 *       '500':
 *         description: Error del servidor
 */
router.get('/:id', action_controller.show);

/**
 * @swagger
 * /actions:
 *   post:
 *     summary: Crea una nueva acción
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Action'
 *     responses:
 *       '201':
 *         description: Acción creada correctamente
 *       '400':
 *         description: Datos de entrada inválidos
 *       '500':
 *         description: Error del servidor
 */
router.post('/', rules, validateInput, action_controller.create);

/**
 * @swagger
 * /actions/{id}:
 *   delete:
 *     summary: Elimina una acción por su ID
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la acción a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Acción eliminada correctamente
 *       '404':
 *         description: La acción no fue encontrada
 *       '500':
 *         description: Error del servidor
 */
router.delete('/:id', action_controller.destroy);

/**
 * @swagger
 * /actions/{id}:
 *   put:
 *     summary: Actualiza una acción por su ID
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la acción a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Action'
 *     responses:
 *       '200':
 *         description: Acción actualizada correctamente
 *       '400':
 *         description: Datos de entrada inválidos
 *       '404':
 *         description: La acción no fue encontrada
 *       '500':
 *         description: Error del servidor
 */
router.put('/:id', rules, validateInput, action_controller.update);

module.exports = router;
