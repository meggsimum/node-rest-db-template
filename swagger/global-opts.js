const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js REST API',
      version: '0.0.1',
      description:
        'Node.js based REST API with database / ORM support',
      license: {
        name: 'BSD-2-Clause'
      },
      contact: {
        name: 'meggsimum - Christian Mayer',
        url: 'https://meggsimum.de',
        email: 'info@meggsimum.de'
      }
    },
    servers: [
      {
        url: 'http://localhost:8888/'
      }
    ]
  },
  apis: [
    './model/place.model.js',
    './route/place.route.js'
  ]
};

module.exports = swaggerOptions;
