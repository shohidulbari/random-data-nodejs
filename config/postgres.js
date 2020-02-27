'use strict'

const config = {
    client: 'pg',
    version: '7.2',
    connection: {
      host : process.env.POSTGRES_HOST,
      user : process.env.POSTGRES_USERNAME,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DATABASE
    }
}

const knex = require('knex')(config);

module.exports = knex;