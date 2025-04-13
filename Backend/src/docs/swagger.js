const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Event Logs API',
      version: '1.0.0',
      description: 'API para registro y consulta de eventos',
    },
  },
  apis: ['./src/interfaces/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
