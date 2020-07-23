/**
 * REST server implementation with Node.js / Express and Sequelize ORM.
 *
 * @author C. Mayer (meggsimum)
 */
const express = require('express');

const port = process.env.REST_PORT || 8888;
const initDb = process.env.REST_INIT_DB || false;

// REST server
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./route/place.route.js')(app);

// DB / ORM
const db = require('./config/db.config.js');
db.sequelize.sync({ force: initDb }).then(() => {
  console.log('-----------------------------------------------');
  console.log(`Drop and resync with { force: ${initDb} }`);
  console.log('-----------------------------------------------');

  if (initDb) {
    // Init data for 'places' table in database
    // TODO check if data init is possible with Sequelize
    const Places = db.places;
    Places.bulkCreate([
      { name: 'Mutterstadt', lat: 49.433333, lon: 8.35 }
    ]);

    verboseLogging('Created initial dataset(s)');
  }
});

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsonDoc = require('swagger-jsdoc');
const swaggerOpts = require('./swagger/global-opts');
const specs = swaggerJsonDoc(swaggerOpts);
app.use('/docs', swaggerUi.serve);
app.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: false
  })
);

const verbose = true;

// start server and export the instance (for unit tests mainly)
module.exports = app.listen(port, () =>
  console.log(`REST server listening on port ${port}!`)
);

/**
 * Logs the given message, when `verbose` flag is set to true.
 *
 * @param {*} msg
 */
function verboseLogging (msg) {
  if (verbose) {
    console.log.apply(console, arguments);
  }
}
