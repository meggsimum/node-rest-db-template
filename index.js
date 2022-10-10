/**
 * REST server implementation with Node.js / Express and Sequelize ORM.
 *
 * @author C. Mayer (meggsimum)
 */
import process from 'process';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsonDoc from 'swagger-jsdoc';
import swaggerGlobalOpts from './swagger/global-opts.js';
// import logger from './util/logger.js';
import db from './config/db.config.js';
import placesRoute from './route/place.route.js';

const port = process.env.REST_PORT || 8888;
const initDb = process.env.REST_INIT_DB || false;

// REST server
const app = express();
app.use(bodyParser.json());
placesRoute(app);

// DB / ORM
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
const specs = swaggerJsonDoc(swaggerGlobalOpts);
app.use('/docs', swaggerUi.serve);
app.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: false
  })
);

const verbose = true;

// start server and export the instance (for unit tests mainly)
app.listen(port, () =>
  console.log(`REST server listening on port ${port}!`)
);

// export the instance (for unit tests mainly)
export default app;

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
