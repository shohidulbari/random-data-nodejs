'use strict'

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');

module.exports.register = async (server) => {
  const swaggerOptions = {
    info: {
      description: "This is a DRAFT API of the ISDP",
      version: Pack.version,
      title: "Integrated Service Delivery Platform",
      termsOfService: "http://isdp.innovatorslab.net/terms/",
      contact: {
        email: "api@isdp.innovatorslab.net"
      },
      license: {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      }
    },
    grouping: 'tags',
    tags: [
        {
          name: "id",
          description: "ID registry related endpoints"
        },
        {
          name: "code",
          description: "Code registry related endpoints"
        },
        {
          name: "message key",
          description: "Message Key related endpoints"
        },
        {
          name: "microservice",
          description: "Microservice related endpoints"
        }
      ],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
        },
      },
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ])
}
