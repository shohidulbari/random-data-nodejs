"use strict";

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
  }
});

var fs = require("fs");

exports.init = function() {
  fs.readFile("./scripts/country.sql", "utf8", function(err, contents) {
    knex.schema.raw(contents).then(function(resp) {});
  });

  fs.readFile("./scripts/job.sql", "utf8", function(err, contents) {
    knex.schema.raw(contents).then(function(resp) {});
  });

  fs.readFile("./scripts/company.sql", "utf8", function(err, contents) {
    knex.schema.raw(contents).then(function(resp) {});
  });
};
