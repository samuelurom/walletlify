const pg = require("pg");

const db = new pg.Pool({
  connectionString: process.env.CONNECTION_STRING,
});

module.exports = db;
