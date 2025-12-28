const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "secret",
  database: "hr_tracker_db",
});

async function importPlayers() {
  console.log("importPlayers Called");
  const url = `https://statsapi.mlb.com/api/v1/sports/1/players?season=2025&fields=people,id,fullName,primaryPosition,abbreviation`;
  const res = await fetch(url);
  const json = await res.json();

}
