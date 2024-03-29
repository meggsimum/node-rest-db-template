const env = {
  database: process.env.REST_DB_NAME || 'myDB',
  username: process.env.REST_DB_USER || 'myUser',
  password: process.env.REST_DB_PASS || 'lorem',
  host: process.env.REST_DB_HOST || 'localhost',
  port: process.env.REST_DB_PORT || 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.REST_DB_LOGGING === true || process.env.REST_DB_LOGGING === 'true' ? console.log : false
};

export default env;
