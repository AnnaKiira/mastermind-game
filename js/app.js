/*-------------------------------- Constants --------------------------------*/
const rows = 8;
const columns = 9; /* Maybe add two columns consts for feedbackPegs and may need a second one for static guess row */
const totalSquareCount = columns * rows;
const colorOptions = ['green', 'red', 'blue', 'brown', 'orange', 'yellow']; /* These are my chosen colors that are hidden and has to be guessed */
const maximumAttempts = 7;


/*-------------------------------- Variables (state) --------------------------------*/
let hiddenColors; /* the array of generated colors */
let playerAttempts; /* this starts at 0 since player hasn't used any attempts when starting game */
let playerGuess; /* the array of the players guesses */
let targetCell;
let currentRow;
let feedbackSquare;
let winAudio = new Audio('./audio/Winner.wav');
let loseAudio = new Audio('./audio/Game over.wav');


/*------------------------ Cached Element References ------------------------*/
const grid = document.querySelector('.grid');
/* console.log(grid) */
const squareElements = []; //This will contain all of the divs representing squares on my display
const displayResult = document.querySelector('#display-result');
/* console.log(displayResult) */
const undoBtn = document.querySelector('#undo-button');
const resetBtn = document.querySelector('#reset-button');
/* console.log(undoBtn)
console.log(resetBtn) */
const colorPegsBtn = document.querySelectorAll('.color-peg');

/*------------------------ Grid Creation ------------------------*/
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

/*-------------------------------- Functions --------------------------------*/
function init() {
    hiddenColors = colorReveal();
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
    console.log(hiddenColors);
};

init();

/* 
function render() { ------- remember to look into render if it is strictly necessary for this game/code
    updateDisplay();
    updateResult();
} */

function colorReveal() {
    let hidden = []; /* this will initialize my empty array that will keep my generated colors once they're generated  */
    for (let i = 0; i < 4; i++) { /* Choosing a for loop that runs 4 times (the amount of hidden pegs) */
        let randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]; /* using Math.floor and math.random methods to select random colors from my colors array */
        hidden.push(randomColor); /* this pushes the random selected color to the empty hidden array */
    }
    return hidden; /* this is returning the hidden array now with the generated colors */
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

function revealHiddenColors() {
    for (let i = 0; i < hiddenColors.length; i++) {
        const hiddenColorElements = document.getElementById(`hidden-color-${i+1}`);
        if (hiddenColorElements) {
            hiddenColorElements.style.backgroundColor = hiddenColors[i];
        }
    }
}

function checkPlayerGuess() {
    return playerGuess.every((color, index) => color === hiddenColors[index]); /* using array every method to check if playerGuess chose the same color pegs as the hiddenColors have generated (both the color and at the same index in the array) */
}
/* 
function updateResult() {
    if (checkPlayerGuess()) {
        displayResult.innerText = 'Congratulations, you won!';
    } else if (playerAttempts >= maximumAttempts) {
        displayResult.innerText = `Game over! The correct color pegs were ${hiddenColors.join(', ')}.`;
    }
} */

function clearDisplay() {
    for (let i = 0; i < squareElements.length; i++) {
        squareElements[i].style.backgroundColor = 'white';
    }
    displayResult.innerText = '';
}

 /* For EACH player guess, check color and index = black & just color = white. How to update display only after guess? */
function feedbackPegs() {
    let usedSquare = new Set();
    for (let i = 0; i < playerGuess.length; i++) {
        if (playerGuess[i] === hiddenColors[i]) {
            const feedbackCell = document.querySelector(`.row[data-row="${currentRow}"] .sqr[data-column="${feedbackSquare}"]`);
            if (feedbackCell) {
                feedbackCell.style.backgroundColor = 'black';
                feedbackSquare++;
                usedSquare.add(i)
            }
        }
    }
    for (let i = 0; i < playerGuess.length; i++) {
        if (hiddenColors.includes(playerGuess[i])) {
            const feedbackCell = document.querySelector(`.row[data-row="${currentRow}"] .sqr[data-column="${feedbackSquare}"]`);
            if (feedbackCell) {
                feedbackCell.style.backgroundColor = 'pink';
                feedbackSquare++;
                break;
            }
        }
    }
}

/* maybe reuse .every in checkPlayerGuess but remove index? 
        however not sure how to not count colors twice for guesses with 2x of the same color
        Also can't count the black pegs*/
/*----------------------------- Event Listeners -----------------------------*/
resetBtn.addEventListener('click', init);

undoBtn.addEventListener('click', () => {
    if (checkPlayerGuess() || playerAttempts >= maximumAttempts) {
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
        const color = button.dataset.color; /* this part is defining the actual color from my data-color in html and CSS, without it my event listener wont work */
        if (playerGuess.length < 4) {
            playerGuess.push(color);
            console.log(playerGuess);
            updateDisplay();
        }
    });
});


/*----------------------------- Calling the functions -----------------------------*/
/* render();
updateResult();
colorReveal();
checkPlayerGuess();
updateDisplay(); */
/* feedbackPegs(); */
/* revealHiddenColors(); */