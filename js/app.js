//PROGRESS
let btn = document.querySelector(".btn");
let filling = document.querySelector(".progress-filling");

filling.setAttribute("id", "bar");

btn.textContent = "STOP";
btn.addEventListener("click", changeInnerHTML);

function changeInnerHTML() {
  btn.textContent = btn.textContent === "STOP" ? "RESUME" : "STOP";
}

//API
let apiInput = document.querySelector("#api");

//GAME
let gameContainer = document.querySelector(".container");
gameContainer.setAttribute("id", "grid");

function createBoxes() {
  for (row = 1; row < 4; row++) {
    for (col = 1; col < 4; col++) {}
  }
}
