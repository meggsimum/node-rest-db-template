const env = {
  dialect: 'sqlite',
  storage: './rest-storage-db.sqlite',
  logging: process.env.REST_DB_LOGGING === true || process.env.REST_DB_LOGGING === 'true' ? console.log : false
};

export default env;
