const express           = require("express");
const pool              = require("./db");
const importPlayers     = require("./importPlayers");
const updatePlayerStats = require("./updatePlayerStats")

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

app.get("/api/leaderboard", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT player_id, full_name, homeRuns FROM players ORDER BY homeRuns DESC NULLS LAST LIMIT 100;"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failed");
  }
});

app.get("/api/team-roster", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.team_id,
              t.team_name,
              p.player_id,
              p.full_name,
              p.homeRuns
       FROM team_roster tr
       JOIN teams t ON tr.team_id = t.team_id
       JOIN players p ON tr.player_id = p.player_id
       ORDER BY t.team_name, p.full_name;`
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

app.get("/api/update-player-stats", async (req, res) => {
  console.log("Get update-player-stats called");
  await updatePlayerStats();

  res.send("ok");
});

app.use(express.static("./frontend"));

app.listen(port, () => {
  console.log(`Example app listending on port ${port}`);
});
