const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start');
const levelDisplay = document.querySelector('#level');
const nexLevelBtn = document.querySelector('#nextlevel');

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;
let gameLevel = 1;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
};

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.append(block)
    }
};

addBlocks();
levelDisplay.innerHTML = 'Level ' + gameLevel;

const user = document.createElement('div');
user.classList.add('user');
grid.append(user);
drawUser();

const ball = document.createElement('div');
ball.classList.add('ball');
grid.append(ball);
drawBall();

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 15
                console.log(currentPosition[0] > 0)
                drawUser()
            }
            break
        case 'ArrowRight':
            if (currentPosition[0] < (boardWidth - blockWidth)) {
                currentPosition[0] += 15
                console.log(currentPosition[0])
                drawUser()
            }
            break
    }
};

document.addEventListener('keydown', moveUser);

function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
};

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
};

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
};

function nextLevel() {
    gameLevel += 1;
    levelDisplay.innerHTML = 'Level ' + gameLevel;
};

startBtn.addEventListener('click', () => {
    if (gameLevel === 1) timerId = setInterval(moveBall, 30)
    if (gameLevel === 2) timerId = setInterval(moveBall, 24)
    if (gameLevel === 3) timerId = setInterval(moveBall, 18)
    if (gameLevel === 4) timerId = setInterval(moveBall, 12)
    if (gameLevel === 5) timerId = setInterval(moveBall, 6)
});

nexLevelBtn.addEventListener('click', nextLevel);

function checkForCollisions() {

    for (let i = 0; i < blocks.length; i++) {
        if
            (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
            if (blocks.length == 0) {
                scoreDisplay.innerHTML = 'You Win!'
                gameLevel += 1
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
                nexLevelBtn.style.display = 'inline-block'
            }
        }
    }

    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        changeDirection()
    }

    if
        (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose!'
        document.removeEventListener('keydown', moveUser)
    }
};

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
};