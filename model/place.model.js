/**
 * DB ORM model for places table
 *
 * @author C. Mayer (meggsimum)
 */
const model = (sequelize, Sequelize) => {
  /**
   * @swagger
   *
   * definitions:
   *   NewPlace:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *       lat:
   *         type: double
   *       lon:
   *         type: double
   *     example:
   *       name: "Mutterstadt"
   *       lat: 49.43
   *       lon: 8.35
   *   Place:
   *     allOf:
   *       - $ref: '#/definitions/NewPlace'
   *       - required:
   *          - id
   *       - properties:
   *          id:
   *            type: integer
   *       - example:
   *          id: 1
   *          name: "Mutterstadt"
   *          lat: 49.43
   *          lon: 8.35
   */
  const Place = sequelize.define('place', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.DOUBLE
    },
    lon: {
      type: Sequelize.DOUBLE
    }
  }
  // ,
  // {
  //   schema: 'mySchema'
  // }
  );

  return Place;
};

export default model;
