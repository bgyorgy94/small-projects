let startBtn = document.querySelector("#start");
let rockBtn = document.querySelector("#rock");
let paperBtn = document.querySelector("#paper");
let scissorsBtn = document.querySelector("#scissors");
let resultDOM = document.querySelector("#result");
let newGameBtn = document.querySelector("#newgame");

let choices = ["rock", "paper", "scissors"];
let computerChoice = null;
let playerChoice = null;
let interval = null;
let points = 0;
let gamesPlayed = 0;

if (JSON.parse(localStorage.getItem("points")) != null) points = JSON.parse(localStorage.getItem("points"));
if (JSON.parse(localStorage.getItem("gamesPlayed")) != null) gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));

function setLocalStorage() {
    localStorage.setItem("points", JSON.stringify(points));
    localStorage.setItem("gamesPlayed", JSON.stringify(gamesPlayed));
}

function playerChoose(choice) {
    clearInterval(interval);
    playerChoice = choice;
    decide();
}

function computerChoose() {
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
}

function writeResult(result) {
    resultDOM.innerHTML = "<p> Computer's choice: " + computerChoice + "</p> <p>" + result + "</p> <p> Your points: " + points + "</p> <p> Win percentage: " + (points / gamesPlayed) * 100 + " % </p>";
}

function loseGame() {
    gamesPlayed++;
    writeResult("You lost!");
    newGameBtn.classList.remove("hide");
    setLocalStorage();
}

function winGame() {
    gamesPlayed++;
    points++;
    writeResult("You won!");
    newGameBtn.classList.remove("hide");
    setLocalStorage();
}

function drawGame() {
    writeResult("Draw!");
    newGameBtn.classList.remove("hide");
}


function decide() {
    if (playerChoice === "rock") {
        if (computerChoice === "rock") drawGame();
        else if (computerChoice === "paper") loseGame();
        else if (computerChoice === "scissors") winGame();
    }
    else if (playerChoice === "paper") {
        if (computerChoice === "rock") winGame();
        else if (computerChoice === "paper") drawGame();
        else if (computerChoice === "scissors") loseGame();
    }
    else if (playerChoice === "scissors") {
        if (computerChoice === "rock") loseGame();
        else if (computerChoice === "paper") winGame();
        else if (computerChoice === "scissors") drawGame();
    }
};

startBtn.addEventListener("click", () => {
    rockBtn.classList.remove("hide");
    paperBtn.classList.remove("hide");
    scissorsBtn.classList.remove("hide");
    computerChoose();
    interval = setInterval(loseGame, 3000);
});

newGameBtn.addEventListener("click", () => {
    newGameBtn.classList.add("hide");
    rockBtn.classList.add("hide");
    paperBtn.classList.add("hide");
    scissorsBtn.classList.add("hide");
    resultDOM.innerHTML = "";
});

rockBtn.addEventListener("click", () => { playerChoose("rock") });
paperBtn.addEventListener("click", () => { playerChoose("paper") });
scissorsBtn.addEventListener("click", () => { playerChoose("scissors") });