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

  const people = json?.people ?? [];
  console.log(`Fetched ${people.length} players`);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

  const sql = `
    INSERT INTO players (player_id, full_name, position)
    VALUES ($1, $2, $3)
    ON CONFLICT (player_id)
    DO UPDATE SET
      full_name = EXCLUDED.full_name,
      position = EXCLUDED.position;
  `;


    let importedCount = 0;
    for (const person of people) {
      const playerId = person.id;
      const fullName = person.fullName;
      const position = person.primaryPosition.abbreviation;
      if (!playerId || !fullName || !position) continue;

      await client.query(sql, [playerId, fullName, position]);
      importedCount += 1;
    }

    await client.query("COMMIT");
    console.log(`Imported ${importedCount} players`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Import failed:", err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = importPlayers;
