const express = require("express");
const pool = require("./db");
const importPlayers = require("./importPlayers");

const app = express();
const port = 8000;

app.get("/api/team", async (req, res) => {
  try {
    const result = await pool.query("SELECT team_name FROM teams;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failed");
  }
});

app.get("/api/players", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT player_id, full_name, position FROM players ORDER BY full_name;"
    );
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failed");
  }
});

app.get("/api/import-players", async (req, res) => {
  console.log("Get import-players called");
  await importPlayers();

  res.send("ok");
});

app.use(express.static("./frontend"));

app.listen(port, () => {
  console.log(`Example app listending on port ${port}`);
});
