// Lab 03 - High Scores (dynamic table from data structure)

const scores = [
  { player: "Ava",   moves: 22, time: 58,  date: "2026-01-10" },
  { player: "Noah",  moves: 24, time: 63,  date: "2026-01-09" },
  { player: "Mia",   moves: 26, time: 71,  date: "2026-01-08" },
  { player: "Liam",  moves: 27, time: 75,  date: "2026-01-07" },
  { player: "Zoe",   moves: 29, time: 82,  date: "2026-01-06" },
  { player: "Ethan", moves: 30, time: 88,  date: "2026-01-06" },
  { player: "Ivy",   moves: 31, time: 90,  date: "2026-01-05" },
  { player: "Sam",   moves: 33, time: 95,  date: "2026-01-05" },
  { player: "Kai",   moves: 34, time: 101, date: "2026-01-04" },
  { player: "Emma",  moves: 35, time: 104, date: "2026-01-03" },
];

// Bulma navbar burger toggle
function setupNavbarBurger() {
  const burgers = document.querySelectorAll(".navbar-burger");
  burgers.forEach((burger) => {
    burger.addEventListener("click", () => {
      const targetId = burger.dataset.target;
      const target = document.getElementById(targetId);
      burger.classList.toggle("is-active");
      target.classList.toggle("is-active");
    });
  });
}

function populateScoresTable() {
  const tbody = document.getElementById("scores-body");
  tbody.innerHTML = ""; // required: clear first

  scores.forEach((s, idx) => {
    const tr = document.createElement("tr");

    const rankTd = document.createElement("td");
    rankTd.textContent = String(idx + 1);

    const playerTd = document.createElement("td");
    playerTd.textContent = s.player;

    const movesTd = document.createElement("td");
    movesTd.textContent = String(s.moves);

    const timeTd = document.createElement("td");
    timeTd.textContent = String(s.time);

    const dateTd = document.createElement("td");
    dateTd.textContent = s.date;

    tr.append(rankTd, playerTd, movesTd, timeTd, dateTd);
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavbarBurger();
  populateScoresTable();
});
