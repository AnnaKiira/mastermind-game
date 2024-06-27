const rows = 8;
const columns = 9; 
const totalSquareCount = columns * rows;
const colorOptions = ['green', 'red', 'blue', 'brown', 'orange', 'yellow']; 
const maximumAttempts = 7;

let hiddenColors; 
let playerAttempts; 
let playerGuess; 
let targetCell;
let currentRow;
let feedbackSquare;
let winAudio = new Audio('./audio/Winner.wav');
let loseAudio = new Audio('./audio/Game over.wav');

const grid = document.querySelector('.grid');
const squareElements = [];
const displayResult = document.querySelector('#display-result');
const undoBtn = document.querySelector('#undo-button');
const resetBtn = document.querySelector('#reset-button');
const colorPegsBtn = document.querySelectorAll('.color-peg');

for (let i = rows -1; i >= 0; i--) {
    const row = document.createElement('div')
    row.classList.add('row')
    row.dataset.row = i
    for (let i = 0; i < columns; i++) {

        const square = document.createElement('div')
        square.innerText = i
        square.classList.add('sqr')
        square.dataset.column = i
        squareElements.push(square)
        row.appendChild(square)
    }
    grid.appendChild(row)
}

function init() {
    hiddenColors = colorGenerator();
    playerAttempts = 0;
    playerGuess = [];
    targetCell = 0;
    currentRow = 0;
    feedbackSquare = 5;
    clearDisplay();
    updateDisplay();
    const hiddenColorElements = document.querySelectorAll('.hidden-color');
    hiddenColorElements.forEach(element => {
        element.style.backgroundColor = 'white';
    });
};

init();

function colorGenerator() {
    let hidden = [];
    for (let i = 0; i < 4; i++) {
        let randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        hidden.push(randomColor); 
    }
    return hidden;
}

function updateDisplay() {
    for (let i = 0; i < playerGuess.length; i++) {
        const color = playerGuess[i];
        const currentColumn = targetCell + i;
        const square = document.querySelector(`.row[data-row="${currentRow}"] .sqr[data-column="${currentColumn}"]`);
        if (square) {
            square.style.backgroundColor = color;
        }
    }
    if (playerGuess.length === 4) {
        if (checkPlayerGuess()) {
            displayResult.innerText = 'Congratulations, you won!';
            winAudio.play();
            feedbackPegs();
            revealHiddenColors();
        } else if (playerAttempts >= maximumAttempts) {
            displayResult.innerText = `Game over! The correct color pegs were ${hiddenColors.join(', ')}.`;
            loseAudio.play();
            feedbackPegs();
            revealHiddenColors();
        } else {
            feedbackPegs();
            playerAttempts++;
            currentRow++;
            playerGuess = [];
            feedbackSquare = 5;
        }
    }
}

function checkPlayerGuess() {
    return playerGuess.every((color, index) => color === hiddenColors[index]);
}

function revealHiddenColors() {
    for (let i = 0; i < hiddenColors.length; i++) {
        const hiddenColorElements = document.getElementById(`hidden-color-${i+1}`);
        if (hiddenColorElements) {
            hiddenColorElements.style.backgroundColor = hiddenColors[i];
        }
    }
}

function clearDisplay() {
    for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].style.backgroundColor = 'white';
    }
    displayResult.innerText = '';
}

function feedbackPegs() {
    let usedSquare = new Set();
    for (let i = 0; i < playerGuess.length; i++) {
        if (playerGuess[i] === hiddenColors[i]) {
            const feedbackCell = document.querySelector(`.row[data-row="${currentRow}"] .sqr[data-column="${feedbackSquare}"]`);
            if (feedbackCell) {
                feedbackCell.style.backgroundColor = 'black';
                feedbackSquare++;
                usedSquare.add(i);
            }
        }
    }
    for (let i = 0; i < playerGuess.length; i++) {
        if (hiddenColors.includes(playerGuess[i])) {
            const feedbackCell = document.querySelector(`.row[data-row="${currentRow}"] .sqr[data-column="${feedbackSquare}"]`);
            if (feedbackCell) {
                feedbackCell.style.backgroundColor = 'hotpink';
                feedbackSquare++;
                break;
            }
        }
    }
}

resetBtn.addEventListener('click', init);

undoBtn.addEventListener('click', () => {
    if (checkPlayerGuess() || playerAttempts > maximumAttempts) {
    } else if (playerGuess.length > 0) {
        playerGuess.pop();
        const previousColumn = playerGuess.length;
        const square = document.querySelector(`.row[data-row="${currentRow}"] .sqr[data-column="${previousColumn}"]`);
        if (square) {
            square.style.backgroundColor = 'white';
        }
        updateDisplay();
    }
    });

colorPegsBtn.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color;
        if (playerGuess.length < 4) {
            playerGuess.push(color);
            updateDisplay();
        }
    });
});
