// Fruktplukkerspill med poengtavle, timer og flere frukttyper

const fruktTyper = ["🍎", "🍌", "🍐", "🍊", "🍓", "🍒", "🍇", "🥝", "🍍"];
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const gameOverMsg = document.getElementById("game-over");

let score = 0;
let tidIgjen = 30;
let spillAktiv = false;
let fruktInterval;
let timerInterval;

function startSpill() {
  // Nullstill
  score = 0;
  tidIgjen = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = tidIgjen;
  gameArea.innerHTML = "";
  gameOverMsg.classList.add("d-none");
  spillAktiv = true;
  startBtn.disabled = true;

  fruktInterval = setInterval(genererFrukt, 700);
  timerInterval = setInterval(oppdaterTimer, 1000);
}

function genererFrukt() {
  if (!spillAktiv) return;
  const frukt = document.createElement("div");
  frukt.className = "frukt animate__animated animate__bounceIn";
  frukt.innerHTML = fruktTyper[Math.floor(Math.random() * fruktTyper.length)];
  frukt.style.fontSize = "2.5em";

  // Plasser frukten tilfeldig i spillområdet
  const areaW = gameArea.offsetWidth;
  const areaH = gameArea.offsetHeight;
  frukt.style.position = "absolute";
  frukt.style.left = Math.random() * (areaW - 40) + "px";
  frukt.style.top = Math.random() * (areaH - 40) + "px";

  frukt.addEventListener("click", plukkFrukt);
  gameArea.appendChild(frukt);

  // Fjern frukten automatisk etter 2 sek hvis ikke plukket
  setTimeout(() => {
    if (gameArea.contains(frukt)) gameArea.removeChild(frukt);
  }, 2000);
}

function plukkFrukt(e) {
  if (!spillAktiv) return;
  score++;
  scoreDisplay.textContent = score;
  e.target.classList.add("animate__fadeOut");
  setTimeout(() => {
    if (gameArea.contains(e.target)) gameArea.removeChild(e.target);
  }, 500);
}

function oppdaterTimer() {
  tidIgjen--;
  timerDisplay.textContent = tidIgjen;
  if (tidIgjen <= 0) {
    sluttSpill();
  }
}

function sluttSpill() {
  spillAktiv = false;
  clearInterval(fruktInterval);
  clearInterval(timerInterval);
  startBtn.disabled = false;
  gameOverMsg.textContent = `Spillet er over! Du plukket ${score} frukter. Prøv igjen?`;
  gameOverMsg.classList.remove("d-none");
}

// Start-knapp
startBtn.addEventListener("click", startSpill);
