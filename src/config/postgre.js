const { Pool } = require("pg");
//const {pool} = pg;

const db = new Pool({
  host: "localhost",
  user: "arsyad",
  database: "arsyad",
  password: "1234",
  port: "5432",
});

module.exports = db;
