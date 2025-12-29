// Example JavaScript
console.log("Website loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
  const importButton = document.getElementById("import-players-btn");
  if (!importButton) return;

  importButton.addEventListener("click", async () => {
    importButton.disabled = true;
    importButton.textContent = "Importing...";

    try {
      const res = await fetch("/api/import-players", { method: "POST" });
      if (!res.ok) {
        throw new Error("Import failed at FE script.js");
      }
      importButton.textContent = "Import complete";
    } catch (err) {
      console.error(err);
      importButton.textContent = "Import failed";
    } finally {
      setTimeout(() => {
        importButton.disabled = false;
        importButton.textContent = "Import Players";
      }, 2000);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("players-table-body");
  if (!tableBody) return;

  const loadPlayers = async () => {
    try {
      const res = await fetch("/api/players");
      if (!res.ok) {
        throw new Error("Failed to load players");
      }
      const players = await res.json();
      tableBody.innerHTML = "";

      players.forEach((player) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = player.player_id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = player.full_name;
        row.appendChild(nameCell);

        const posCell = document.createElement("td");
        posCell.textContent = player.position;
        row.appendChild(posCell);

        tableBody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
      tableBody.innerHTML =
        "<tr><td colspan=\"3\">Failed to load players.</td></tr>";
    }
  };

  loadPlayers();
});

document.addEventListener("DOMContentLoaded", () => {
  const leaderboardBody = document.getElementById("leaderboard-table-body");
  if (!leaderboardBody) return;

  const loadLeaderboard = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) {
        throw new Error("Failed to load leaderboard");
      }
      const players = await res.json();
      leaderboardBody.innerHTML = "";

      players.forEach((player, index) => {
        const row = document.createElement("tr");

        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const idCell = document.createElement("td");
        idCell.textContent = player.player_id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = player.full_name;
        row.appendChild(nameCell);

        const hrCell = document.createElement("td");
        hrCell.textContent = player.homeruns ?? player.homeRuns ?? 0;
        row.appendChild(hrCell);

        leaderboardBody.appendChild(row);
      });
    } catch (err) {
      console.error(err);
      leaderboardBody.innerHTML =
        "<tr><td colspan=\"4\">Failed to load leaderboard.</td></tr>";
    }
  };

  loadLeaderboard();
});

class Team {
  constructor(name) {
    this.name = name;
  }

  get_hr() {
    return '10';
  }

}

let team1 = new Team("Nick Team");

// document.getElementById("intro_text").innerHTML = team1.name;
