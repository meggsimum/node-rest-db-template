const env = {
  database: process.env.REST_DATABASE || 'myDB',
  username: process.env.REST_USER || 'myUser',
  password: process.env.REST_PASS || 'lorem',
  host: process.env.REST_HOST || 'localhost',
  port: process.env.REST_PORT || 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;
