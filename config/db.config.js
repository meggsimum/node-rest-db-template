/**
 * DB Connection by ORM Sequelize
 *
 * @author C. Mayer (meggsimum)
 */
import Sequelize from 'sequelize';
import envSqlite from './env-sqlite.js';
import envPg from './env-pg.js';
import placeModel from '../model/place.model.js';

const dbType = 'sqlite';

let sequelize;
if (dbType === 'sqlite') {
  sequelize = new Sequelize(envSqlite);
} else {
  sequelize = new Sequelize(envPg.database, envPg.username, envPg.password, {
    host: envPg.host,
    port: envPg.port,
    dialect: envPg.dialect,
    operatorsAliases: false,

    pool: {
      max: envPg.max,
      min: envPg.pool.min,
      acquire: envPg.pool.acquire,
      idle: envPg.pool.idle
    }
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models / tables
db.places = placeModel(sequelize, Sequelize);

export default db;
