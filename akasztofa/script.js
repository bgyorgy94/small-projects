let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let maxSteps = 9;
let words = ['APPLE', 'BANANA', 'WORD', 'MOUSE', 'COMPUTER', 'SECRET', 'LOVE', 'HELP', 'PLEASURE', 'SCIENCE', 'HISTORY', 'CLEAR', 'JUICY', 'RANDOM', 'GIRLFRIEND', 'MIND', 'SOUL', 'SELFISH', 'CREATE'];
let gameState = null;
let trueLetters = null;
let falseLetters = null;
let word = null;
let wordArray = [];

let screenDOM = document.querySelector("#screen");
let wordDOM = document.querySelector("#word");
let lettersDOM = document.querySelector("#letters");
let resultDOM = document.querySelector("#result");
let newGameBtn = document.querySelector("#newgame");

function initGameState() {
    gameState = "init";
}

function randomWord () {
    word = words[Math.floor(Math.random() * words.length)];
    wordArray = Array.from(word);
}

function initGame () {
    initScreen();
    for (let i = 0; i < word.length; i++) {
        let wordSpan = document.createElement("span");
        wordSpan.innerHTML = "__  ";
        wordDOM.append(wordSpan); 
    }; 
    trueLetters = [];
    falseLetters = [];
    gameState = "playing";
}

function gameStateCheck() {
    if (wordArray.sort().join(',') === trueLetters.sort().join(',')) {
        gameState = "win";
        resultDOM.classList.add("green");
        resultDOM.innerHTML = "You won!";
    }
    else if (falseLetters.length === maxSteps) {
        gameState = "lose";
        resultDOM.classList.add("red");
        resultDOM.innerHTML = "You lost! The correct word was: " + word;
    }
}

function createLetterBoxes () {
    abc.forEach((letter) => {
        let letterBox = document.createElement("button");
        letterBox.innerHTML = letter;
        lettersDOM.append(letterBox);
        letterBox.addEventListener("click", (evt) => {
            handleLetter(evt.target.innerHTML);
            evt.target.classList.add("black");
        })
    });
}

function initScreen () {
    screenDOM.innerHTML = "<img src='./kepek/1.png'>";
    wordDOM.innerHTML = "";
    lettersDOM.innerHTML = "";
    createLetterBoxes();
    resultDOM.innerHTML = "";
    resultDOM.className = "";
    initGameState();
}

function picChange (picNumber) {
    screenDOM.innerHTML = "<img src='./kepek/" + picNumber + ".png'>";
}

function showLetter (letter) {
    let wordSpan = document.querySelectorAll("#word span");
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) wordSpan[i].innerHTML = letter;
    };
}

function handleLetter (letter) {
    if (gameState !== "playing") return;
    if (wordArray.includes(letter)) {
        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === letter) {
                trueLetters.push(letter); 
            };
        };
        showLetter(letter);
    }
    else if (wordArray.includes(letter) === false){
        falseLetters.push(letter);
        picChange(falseLetters.length+1);
    }
    gameStateCheck();
}

newGameBtn.addEventListener("click", () => {
    randomWord();
    initScreen();
    initGame();
})