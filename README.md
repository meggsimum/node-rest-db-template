# node-rest-db-template

Template for a Node.js based REST API with a database and an ORM support.

## Main components / libraries

The following components are used in this template

  - [Express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework for Node.js
  - [Sequelize](https://sequelize.org/): ORM for several databases, which abstracts the data access
  - [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express): Serves auto-generated [swagger-ui](https://swagger.io/tools/swagger-ui/) generated API docs from Express
  - [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc): Enables the integration of Swagger using JSDoc comments in code

## ENV VARs

  - REST_PORT
  - REST_INIT_DB
  - REST_DB_NAME
  - REST_DB_USER
  - REST_DB_PASS
  - REST_DB_HOST
  - REST_DB_PORT
  - REST_DB_LOGGING
  - REST_LOGLEVEL

## Dev-Setup

### Run dev-server

```
git clone <this-repo>

cd node-rest-db-template

npm install

npm run start-dev
```

### Run unit tests

```
cd /path/to/this/checkout

npm run test
```

## Production setup

### Run server

```
cd /path/to/this/checkout

npm start
```
#### Run server with database initialization

```
cd /path/to/this/checkout

REST_INIT_DB=true npm start
```

#### Run server with different port (defaults to 8888)

```
cd /path/to/this/checkout

REST_PORT=8888 npm start
```

### Run with Docker

```
cd /path/to/this/checkout

# docker build -t <image-name> .
docker build -t my_rest_server .

# docker run -e REST_API_PORT=9999 -p 9999:9999 <image-name>
docker run -e REST_API_PORT=9999 -p 9999:9999 my_rest_server
```
