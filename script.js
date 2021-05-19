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
let playerSign = "X";

// user click function 
function clickedBox(element) {
  if (players.classList.contains("player")) {
    playerSign = "O";
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  element.style.pointerEvents = "none"; // once user selects any box then that box can't be selected again
  let randomDelayTime = ((Math.random() * 1000) + 300).toFixed(); // generating random time delay so bot will delay randomly to select box
  setTimeout(() => {
    bot(); // calling bot function
  }, randomDelayTime); // passing random delay time
}

function bot() {
  playerSign = "O";
  let array = []; // creating empty array where we'll store unselected boxes
  for (let i = 0; i < allBox.length; i++) {
    if (allBox[i].childElementCount == 0) { 
      array.push(i);
    }
  }
  let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array so bot will select random unselected box
  if (array.length > 0) {
    if (players.classList.contains("player")) {
      playerSign = "X";
      allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
      players.classList.remove("active");
      allBox[randomBox].setAttribute("id", playerSign);
    } else {
      allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
      players.classList.remove("active");
      allBox[randomBox].setAttribute("id", playerSign);
    }
  }
  allBox[randomBox].style.pointerEvents = "none"; // user can't select bot selected boxes
  playerSign = "X";
  // console.log(array);
}