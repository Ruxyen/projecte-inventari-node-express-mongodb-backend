var express = require("express");
var router = express.Router();

const incident_controller = require("../controllers/incidents.controller.js")
const { validateInput } = require('../middlewares/validateInput')
const { rules } = require('../middlewares/validations/incident.validation')

var auth_middleware = require("../middlewares/auth.middleware");

router.use([auth_middleware.isAuth]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]);


/**
 * @swagger
 * tags:
 *   name: Incidents
 *   description: API para gestionar incidentes
 */

/**
 * @swagger
 * /incidents:
 *   get:
 *     summary: Obtener todos los incidentes
 *     tags: [Incidents]
 *     responses:
 *       200:
 *         description: Lista de incidentes
 */
router.get('/', incident_controller.all);

/**
 * @swagger
 * /incidents/list:
 *   get:
 *     summary: Obtener incidentes paginados y filtrados
 *     tags: [Incidents]
 *     responses:
 *       200:
 *         description: Lista de incidentes paginados y filtrados
 */
router.get('/list', incident_controller.paginatedFiltered);

/**
 * @swagger
 * /incidents/{id}:
 *   get:
 *     summary: Obtener un incidente por ID
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del incidente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del incidente
 */
router.get('/:id', incident_controller.show);

/**
 * @swagger
 * /incidents:
 *   post:
 *     summary: Crear un nuevo incidente
 *     tags: [Incidents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncidentInput'
 *     responses:
 *       200:
 *         description: Incidente creado correctamente
 *       400:
 *         description: Error en la validación de entrada
 */
router.post('/',([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]), rules, validateInput, incident_controller.create);

/**
 * @swagger
 * /incidents/{id}:
 *   delete:
 *     summary: Eliminar un incidente por ID
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del incidente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Incidente eliminado correctamente
 */
router.delete('/:id',([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]), incident_controller.destroy);

/**
 * @swagger
 * /incidents/{id}:
 *   put:
 *     summary: Actualizar un incidente por ID
 *     tags: [Incidents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del incidente a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IncidentInput'
 *     responses:
 *       200:
 *         description: Incidente actualizado correctamente
 *       400:
 *         description: Error en la validación de entrada
 */
router.put('/:id', ([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]), rules, validateInput, incident_controller.update);

module.exports = router;