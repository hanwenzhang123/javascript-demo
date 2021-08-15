//PROGRESS
const btn = document.querySelector(".btn");
btn.textContent = "STOP";
btn.addEventListener("click", changeInnerHTML);
function changeInnerHTML() {
  btn.textContent = btn.textContent === "STOP" ? "RESUME" : "STOP";
  if (btn.textContent === "RESUME") {
    i = 0;
  } else if (btn.textContent === "STOP") {
    i = 1;
  }
}

let i = 1;
updateBar();

function updateBar() {
  let filling = document.querySelector(".progress-filling");
  let width = 0;
  let step = 1;
  setInterval(update, 10);
  function update() {
    if (i == 0) return;

    width += step;
    filling.style.width = width + "%";
    if (width >= 100 || width <= 0) step = -step; //reverse
  }
}

//API
const apiInput = document.querySelector("#api");
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/?limit=70";
const options = ["CA", "AZ", "WA"];

//GAME
const cells = document.querySelectorAll(".cell");
const playText = document.getElementById("game-text");
const restartBtn = document.getElementById("restart");

const spaces = [];
const OPlayer = "O";
const XPlayer = "X";
let currentPlayer;

function handleClick(e) {
  const id = e.target.id;
  spaces.push[id];
  console.log(spaces);
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerWon(currentPlayer)) {
      const winningAlert = document.createElement("p");
      winningAlert.setAttribute("id", "winning-text");
      winningAlert.innerText = `${currentPlayer} HAS WON!`;
      playText.appendChild(winningAlert);

      setTimeout(() => {
        restart();
      }, 4000);
      return;
    }
    currentPlayer = currentPlayer === OPlayer ? XPlayer : OPlayer;
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

const playerWon = (player) => {
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) return true;
    if (spaces[3] === player && spaces[6] === player) return true;
    if (spaces[4] === player && spaces[8] === player) return true;
  }
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) return true;
    if (spaces[6] === player && spaces[7] === player) return true;
  }
  if (spaces[4] === player) {
    if (spaces[1] === player && spaces[7] === player) return true;
    if (spaces[3] === player && spaces[5] === player) return true;
  }
};

const restart = () => {
  spaces.forEach((space, index) => {
    console.log(space);
    spaces[index] = null;
  });
  cells.forEach((cell) => {
    cell.innerText = "";
  });
  playText.innerHTML = `LET'S PLAY!`;
  currentPlayer = OPlayer;
};

restartBtn.addEventListener("click", restart);

restart();
