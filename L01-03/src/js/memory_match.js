// Lab 03 - Memory Match (dynamic board + matching logic)

const EMOJIS = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝", "🍍", "🍑"];
const TOTAL_PAIRS = 8;
const TOTAL_CARDS = 16;

let deck = [];                 // current deck order (length 16)
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matches = 0;
let timeElapsed = 0;
let timerId = null;
let gameActive = false;

function $(id) {
  return document.getElementById(id);
}

//  Bulma burger toggle 
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

// Utility 
function shuffle(array) {
  // Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function makeNewDeck() {
  const faces = [];
  for (let i = 0; i < TOTAL_PAIRS; i++) {
    faces.push(EMOJIS[i], EMOJIS[i]); // duplicate each for pair
  }
  return shuffle(faces);
}

function clearBoard() {
  const board = $("board");
  board.innerHTML = "";
}

function setMessage(text) {
  const msg = $("message");
  msg.textContent = text || "";
}

function updateStatusPanel() {
  $("moves").textContent = String(moves);
  $("matches").textContent = String(matches);
  $("total-pairs").textContent = String(TOTAL_PAIRS);
  $("time").textContent = String(timeElapsed);
}

// Timer 
function startTimer() {
  stopTimer();
  timeElapsed = 0;
  gameActive = true;
  updateStatusPanel();

  timerId = setInterval(() => {
    if (!gameActive) return;
    timeElapsed += 1;
    $("time").textContent = String(timeElapsed);
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  gameActive = false;
}

// Card creation / board build 
function createCard(faceValue, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.face = faceValue;
  card.dataset.index = String(index);
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", "Memory card");
  card.setAttribute("tabindex", "0");

  const face = document.createElement("div");
  face.classList.add("card-face");
  face.textContent = faceValue;

  card.appendChild(face);

  card.addEventListener("click", () => onCardClick(card));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick(card);
    }
  });

  return card;
}

function buildBoardFromDeck(deckOrder) {
  clearBoard();
  const board = $("board");

  deckOrder.forEach((faceValue, idx) => {
    const card = createCard(faceValue, idx);
    board.appendChild(card);
  });
}

//  Game state reset 
function resetGameStatsOnly() {
  moves = 0;
  matches = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  setMessage("");
  updateStatusPanel();
  startTimer();
}

function flipAllDown() {
  const allCards = document.querySelectorAll("#board .card");
  allCards.forEach((c) => {
    c.classList.remove("flipped", "matched", "wrong");
  });
}

//  Click logic
function onCardClick(cardEl) {
  if (lockBoard) return;
  if (!gameActive) return; // after win
  if (cardEl.classList.contains("matched")) return;
  if (cardEl === firstCard) return;

  // flip it
  cardEl.classList.add("flipped");

  if (!firstCard) {
    firstCard = cardEl;
    return;
  }

  // second card
  secondCard = cardEl;
  moves += 1;
  $("moves").textContent = String(moves);

  resolvePair();
}

function resolvePair() {
  if (!firstCard || !secondCard) return;
  lockBoard = true;

  const isMatch = firstCard.dataset.face === secondCard.dataset.face;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches += 1;
    $("matches").textContent = String(matches);

    // cleanup
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    // win?
    if (matches === TOTAL_PAIRS) {
      stopTimer();
      setMessage(`You won! ${moves} moves, ${timeElapsed} seconds.`);
    }
    return;
  }

  // not a match
  firstCard.classList.add("wrong");
  secondCard.classList.add("wrong");

  setTimeout(() => {
    firstCard.classList.remove("flipped", "wrong");
    secondCard.classList.remove("flipped", "wrong");

    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }, 800);
}

//  Buttons setup
function setupButtons() {
  $("btn-new-game").addEventListener("click", () => {
    deck = makeNewDeck();
    buildBoardFromDeck(deck);
    resetGameStatsOnly();
  });

  $("btn-reset").addEventListener("click", () => {
    // same deck order,  flip down and reset stats
    buildBoardFromDeck(deck); // rebuild keeps order + clears old classes cleanly
    resetGameStatsOnly();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavbarBurger();
  setupButtons();

  // initial game
  deck = makeNewDeck();
  buildBoardFromDeck(deck);
  resetGameStatsOnly();
});
