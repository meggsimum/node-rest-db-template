/**
 * REST routes for places
 *
 * @author C. Mayer (meggsimum)
 */
module.exports = function (app) {
  const places = require('../controller/place.controller.js');
  const basePath = '/api/places';

  /**
   * Retrieves all places
   *
   * @swagger
   * path:
   *  /api/places:
   *    get:
   *      summary: Retrieve all places
   *      responses:
   *        "200":
   *          description: JSON with all places objects as array
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/definitions/Place'
   */
  app.get(basePath, places.findAll);

  /**
   * Retrieves a single place by ID
   *
   * @swagger
   * path:
   *  /api/places/:id:
   *    get:
   *      summary: Retrieve a place by ID
   *      parameters:
   *      - name: "id"
   *        in: "path"
   *        description: "ID of place to return"
   *        required: true
   *        type: "integer"
   *      responses:
   *        "200":
   *          description: JSON with place object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/definitions/Place'
   */
  app.get(basePath + '/:id', places.findByPk);

  /**
   * Creates a new place
   *
   * @swagger
   * path:
   *  /api/places:
   *    post:
   *      summary: Create a new place
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/definitions/NewPlace'
   *      responses:
   *        "201":
   *          description: JSON with created place object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/definitions/Place'
   */
  app.post(basePath, places.create);

  /**
   * Updates a place (ID in body)
   *
   * @swagger
   * path:
   *  /api/places:
   *    put:
   *      summary: Update a place (ID has to be specfied in request body)
   *      requestBody:
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/definitions/Place'
   *      responses:
   *        "200":
   *          description: JSON with updated place object
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/definitions/Place'
   *        "400":
   *          description: Invalid ID given
   */
  app.put(basePath, places.update);

  // delete a place by ID
  app.delete(basePath + '/:id', places.delete);
};
