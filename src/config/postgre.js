const { Pool } = require("pg");

require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

const db = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

module.exports = db;
