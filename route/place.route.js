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
   *      parameters:
   *        - in: query
   *          name: limit
   *          schema:
   *            type: integer
   *            required: false
   *          description: Maximum number of result objects
   *        - in: query
   *          name: filter
   *          schema:
   *            type: string
   *            required: false
   *          description: CQL-like filter (only 'equals' at the moment) in the form 'name=Mutterstadt'
   *        - in: query
   *          name: order_by
   *          schema:
   *            type: string
   *            required: false
   *          description: Field to use to order results by
   *        - in: query
   *          name: order_dir
   *          schema:
   *            type: string
   *            required: false
   *            default: ASC
   *          description: Order direction, either 'ASC' or 'DESC'
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
