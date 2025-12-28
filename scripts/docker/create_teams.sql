CREATE TABLE teams (
  team_id INTEGER PRIMARY KEY,
  team_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE players (
  player_id INTEGER PRIMARY KEY NOT NULL,
  full_name TEXT NOT NULL,
  position  TEXT,
  homeRuns  INTEGER
);

CREATE TABLE team_roster (
  team_id   INTEGER NOT NULL,
  player_id INTEGER NOT NULL,
  PRIMARY KEY (team_id, player_id),
  FOREIGN KEY (team_id) REFERENCES teams(team_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id)
);
