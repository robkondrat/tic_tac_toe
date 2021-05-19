// selecting all required elements 
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

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
let runBot = true;

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
  selectWinner(); // call the winner function
  element.style.pointerEvents = "none"; // once user selects any box then that box can't be selected again
  playBoard.style.pointerEvents = "none"; 
  let randomDelayTime = ((Math.random() * 1000) + 300).toFixed(); // generating random time delay so bot will delay randomly to select box
  setTimeout(() => {
    bot(runBot); // calling bot function
  }, randomDelayTime); // passing random delay time
}

function bot(runBot) {
  let array = []; // creating empty array where we'll store unselected boxes
  if (runBot) {
    playerSign = "O";
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
      selectWinner();
    }
    allBox[randomBox].style.pointerEvents = "none"; // user can't select bot selected boxes
    playBoard.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

// show the winner
function getId(idname) {
  return document.querySelector(".box" + idname).id; // returning id name
}

function checkThreeIds(val1, val2, val3, sign) {
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}

function selectWinner() { // if one combination of these return true then select the winner
  if (checkThreeIds(1,2,3,playerSign) || checkThreeIds(4,5,6,playerSign) || checkThreeIds(7,8,9,playerSign) || checkThreeIds(1,4,7,playerSign) || checkThreeIds(2,5,8,playerSign) || checkThreeIds(3,6,9,playerSign) || checkThreeIds(1,5,9,playerSign) || checkThreeIds(3,5,7,playerSign)){
    // when the match is won stop the bot
    runBot = false;
    bot(runBot);
    setTimeout(() => { // delay to show result box
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700);

    // show the result box with the the winner
    wonText.innerHTML = `Player <p>${playerSign}</p> wins!`;
  } else {
    // draw scenario
    if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
      runBot = false;
      bot(runBot);
      setTimeout(() => { // delay to show result box
        playBoard.classList.remove("show");
        resultBox.classList.add("show");
      }, 700);
  
      // show the result box with the the winner
      wonText.textContent = `It's a draw!`;
    }
  }
}

replayBtn.onclick = () => {
  window.location.reload(); // reload the current page;
}