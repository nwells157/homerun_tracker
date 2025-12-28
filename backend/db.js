const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "secret",
  database: "hr_tracker_db",
});

module.exports = pool;
