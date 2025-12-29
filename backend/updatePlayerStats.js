const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "secret",
  database: "hr_tracker_db",
});

async function updatePlayerStats() {
  console.log("updatePlayerStats Called");

  const url = `https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories=homeRuns&season=2025&statGroup=hitting&limit=500&fields=leagueLeaders,leaders,rank,value,person,id,fullName`;
  const res = await fetch(url);
  const json = await res.json();

  const leaders = json?.leagueLeaders?.[0]?.leaders ?? [];

  console.log(leaders);
  console.log(`Fetched ${leaders.length} players`);

  const client = await pool.connect();

  const sql = `
    INSERT INTO players (player_id, full_name, homeRuns)
    VALUES ($1, $2, $3)
    ON CONFLICT (player_id)
    DO UPDATE SET
      full_name = EXCLUDED.full_name,
      homeRuns = EXCLUDED.homeRuns;
  `;

  let importedCount = 0;
  try {
    await client.query("BEGIN");
    for (const leader of leaders) {
      const playerId  = leader.person.id;
      const fullName = leader.person.fullName;
      const homeRuns  = leader.value;
      if (!playerId || !fullName || !homeRuns) continue;

      await client.query(sql, [playerId, fullName, homeRuns]);
      importedCount += 1;
    }

    await client.query("COMMIT");
    console.log(`Imported ${importedCount} players`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Update player stats failed:", err);
    throw err;
  } finally {
    client.release();
  }

}

module.exports = updatePlayerStats;
