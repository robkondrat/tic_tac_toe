// selecting all required elements 
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players");

window.onload = () => { // once window is loaded
  for (let i = 0; i < allBox.length; i++) { // add onclick attribute in all available section's spans
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
  selectXBtn.onclick = () => {
    selectBox.classList.add("hide"); // hide the select box on the playerX button clicked
    playBoard.classList.add("show"); // show the playboard on playerX button clicked
  }
  selectOBtn.onclick = () => {
    selectBox.classList.add("hide"); // hide the select box on the playerO button clicked
    playBoard.classList.add("show"); // show the playboard on playerO button clicked
    players.setAttribute("class", "players active player"); 
  }
}

let playerXIcon = "fas fa-times"; // class names of fontawesome icons
let playerOIcon = "far fa-circle";

// user click function 
function clickedBox(element) {
  if (players.classList.contains("player")) {
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.add("active");
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active");
  }
  element.style.pointerEvents = "none"; // once user selects any box then that box can't be selected again
}