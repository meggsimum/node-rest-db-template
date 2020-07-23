/**
 * DB Connection by ORM Sequelize
 *
 * @author C. Mayer (meggsimum)
 */
const Sequelize = require('sequelize');

const dbType = 'sqlite';

let sequelize;
if (dbType === 'sqlite') {
  const env = require('./env-sqlite.js');
  sequelize = new Sequelize(env);
} else {
  const env = require('./env-pg.js');

  sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
      max: env.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models / tables
db.places = require('../model/place.model.js')(sequelize, Sequelize);

module.exports = db;
