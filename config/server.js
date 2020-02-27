'use strict';

const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const knex = require('./postgres');

const routes = require('../src/routes');
const swagger = require('./swagger');
const logger = require('pino')({name: 'peoplepower',  level: process.env.LOG_LEVEL || 'trace'});

exports.deployment = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8080,
        routes: {
            validate: {
                options: {abortEarly: false},
                failAction: async (request, response, err) => {
                    throw Boom.badRequest(err.details.map(error => error.message).join("/"));
                },
                options: { abortEarly: false }
            },

            cors: {
            origin: ['*'],
            additionalHeaders: ['X-Data-Offset','X-Data-Limit']
        }
        },
    });
      
    //Knex API Client & initialization
    server.bind({ knex: knex });
    require('./initpostgres').init();
    
    for (const route in routes) {
        server.route(routes[route]);
    }

    server.register({
        plugin: require('@hapi/good'),
        options: require('./good')
    });

    await swagger.register(server);

    return server;
};
