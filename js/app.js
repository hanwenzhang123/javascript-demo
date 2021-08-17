//PROGRESS
const btn = document.querySelector(".btn");
btn.textContent = "STOP";
btn.addEventListener("click", changeInnerHTML);
function changeInnerHTML() {
  btn.textContent = btn.textContent === "STOP" ? "RESUME" : "STOP";
  if (btn.textContent === "RESUME") {
    isPlaying = false;
  } else if (btn.textContent === "STOP") {
    isPlaying = true;
  }
}

let isPlaying = true;
updateBar();

function updateBar() {
  const filling = document.querySelector(".progress-filling");
  let width = 0;
  let step = 1;
  const intervalId = setInterval(update, 10);

  if (isPlaying == false && intervalId) {
    clearInterval(intervalId);
  }

  function update() {
    if (isPlaying == false) return;

    width += step;
    filling.style.width = width + "%";
    if (width >= 100 || width <= 0) step = -step; //reverse
  }
}

//API
const apiDiv = document.getElementsByClassName("api");
const apiInput = document.getElementById("api");
const pokeAPI = "https://pokeapi.co/api/v2/pokemon/?limit=100";

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
const options = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];
const noApiDiv = document.getElementsByClassName("no-api");
const noApiInput = document.getElementById("no-api");
const list = document.getElementById("list");

function setList(states) {
  clearList();
  for (const state of states) {
    const item = document.createElement("li");
    const text = document.createTextNode(state);
    item.appendChild(text);
    list.appendChild(item);

    item.addEventListener("click", (e) => {
      console.log(e.target.innerHTML);
      noApiInput.value = `${e.target.innerHTML}`;
    });
  }
}

function clearList() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

noApiInput.addEventListener("keyup", (e) => {
  let userInput = e.target.value;
  if (userInput) {
    value = userInput.toUpperCase();
    setList(
      options.filter((states) => {
        return states.includes(value);
      })
    );
  } else {
    clearList();
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
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerWon(currentPlayer)) {
      playText.innerHTML = `GAME OVER!`;
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

// cells.forEach((cell) => {
//   cell.addEventListener("click", handleClick);
// });

document.querySelector(".game").addEventListener("click", handleClick); //event delegation

const winningCondition = [
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
  const playerLine = (line) => line.every((step) => spaces[step] === player);
  return winningCondition.some((line) => playerLine(line));
}

const restart = () => {
  spaces.forEach((space, index) => {
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
