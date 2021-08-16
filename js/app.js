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
const apiDiv = document.getElementsByClassName("api");
const apiInput = document.getElementById("api");
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/?limit=151";

apiInput.addEventListener("keyup", (e) => {
  console.log(e.target.value);
});

const loadPokemon = async () => {
  try {
    const res = await fetch(pokeAPI);
    let pokemon = await res.json();
    displayPokemon(pokemon);
    console.log(pokemon);
  } catch (e) {
    console.log(e);
  }
};
const displayPokemon = (poke) => {
  const characters = poke
    .map((poke) => {
      return `
    <li class = "character">
      <p>${poke.name}</p>
    `;
    })
    .join("");
  apiDiv.innerHTML(characters);
};

//NO-API
const noApiDiv = document.getElementsByClassName("no-api");
const noApiInput = document.getElementById("no-api");
const options = ["CA", "AZ", "WA"];

noApiInput.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  let userInput = e.target.value;
  let emptyArray = [];
  if (userInput) {
    emptyArray = options.filter((data) => {
      return data.toLocaleUpperCase();
    });
    console.log(data);
  }
});

//GAME
const cells = document.querySelectorAll(".cell");
const playText = document.getElementById("game-text");
const restartBtn = document.getElementById("restart");

const spaces = [null, null, null, null, null, null, null, null, null];
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

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerWon(player) {
  const playerLine = (line) => line.every((el) => spaces[el] === player);
  return winningLines.some((line) => playerLine(line));
}

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
