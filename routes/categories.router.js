var express = require("express");
var router = express.Router();

const categoriesController = require('../controllers/categories.controller');
const {validateInput} = require('../middlewares/validateInput');
const {rules} = require('../middlewares/validations/category.validation');

var auth_middleware = require("../middlewares/auth.middleware");

router.use([auth_middleware.isAuth]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole('Admin')]);
//router.use([auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])]);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', categoriesController.all);

/**
 * @swagger
 * /api/categories/tree:
 *   get:
 *     summary: Get a tree structure of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A tree structure of categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryTree'
 */
router.get('/tree/', categoriesController.tree);

/**
 * @swagger
 * /api/categories/list:
 *   get:
 *     summary: Get paginated list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A paginated list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/list', categoriesController.paginedFiltered);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: A single category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.get('/:id', categoriesController.show);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request, category data is invalid
 */
router.post('/', [auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])], rules, validateInput, categoriesController.create);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', [auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])], categoriesController.destroy);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Updated category information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.put('/:id', [auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])], rules, validateInput, categoriesController.update);

/**
 * @swagger
 * /api/categories/recursive/{id}:
 *   delete:
 *     summary: Recursively delete a category and its subcategories by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category and subcategories deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/recursive/:id', [auth_middleware.isAuth,auth_middleware.withRole(['Admin','Teacher'])], categoriesController.deleteRecursive);

module.exports = router;

