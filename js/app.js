/*-------------------------------- Constants --------------------------------*/
const rows = 8;
const columns = 9; /* Maybe add two columns consts for feedbackPegs and may need a second one for static guess row */
const totalSquareCount = columns * rows;
const colorOptions = ['green', 'red', 'blue', 'brown', 'orange', 'yellow']; /* These are my chosen colors that are hidden and has to be guessed */
const maximumAttempts = 8;


/*-------------------------------- Variables (state) --------------------------------*/
let hiddenColors; /* the array of generated colors */
let playerAttempts; /* this starts at 0 since player hasn't used any attempts when starting game */
let playerGuess; /* the array of the players guesses */
let targetCell;
let currentRow;
/* let feedbackCell; */


/*------------------------ Cached Element References ------------------------*/
const grid = document.querySelector('.grid')
/* console.log(grid) */
const squareElements = [] //This will contain all of the divs representing squares on my display
const displayResult = document.querySelector('#display-result')
/* console.log(displayResult) */
const undoBtn = document.querySelector('#undo-button')
const resetBtn = document.querySelector('#reset-button')
/* console.log(undoBtn)
console.log(resetBtn) */
const colorPegsBtn = document.querySelectorAll('.color-peg')

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
    /* feedbackCell = 5; */
    render();

};


function render() {
    updateDisplay();
    updateResult();
}



function colorReveal() {
    let hidden = []; /* this will initialize my empty array that will keep my generated colors once they're generated  */
    for (let i = 0; i < 4; i++) { /* Choosing a for loop that runs 4 times (the amount of hidden pegs) */
        let randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]; /* using Math.floor and math.random methods to select random colors from my colors array */
        hidden.push(randomColor); /* this pushes the random selected color to the empty hidden array */
    }
    return hidden; /* this is returning the hidden array now with the generated colors */
}

function checkPlayerGuess() {
    if (playerGuess.every((color, index) => color === hiddenColors[index])) ; /* using array every method to check if playerGuess chose the same color pegs as the hiddenColors have generated (both the color and at the same index in the array) */
}

function updateResult() {
    if (playerGuess == hiddenColors) {
        displayResult.innerText = 'Congratulations, you won!';
        return;
    } else if (playerAttempts >= maximumAttempts) {
        displayResult.innerText = `Game over! The correct color pegs was ${hiddenColors}`;
        return;
    }
}

/* might need reset function called on reset button click? Currently render/display and hiddenColors doesn´t reset with init being called on reset button click

function resetGame() {
    playerAttempts = 0;
    playerGuess = [];
    targetCell = 0;
    currentRow = 0;
    updateDisplay();
    updateResult();
    hiddenColors = colorReveal();

} */

/*  For EACH player guess, check color and index = black & just color = white. How to update display only after guess?
function feedbackPegs() {
    if (playerGuess.every((color, index) => color === hiddenColors[index])) ;
} */

function updateDisplay() {
    for (let i = 0; i < playerGuess.length; i++) {
        const color = playerGuess[i];
        const currentColumn = targetCell + i;
        const square = document.querySelector(`.row[data-row="${currentRow}"] .sqr[data-column="${currentColumn}"]`);
        if (square) {
            square.style.backgroundColor = color;
        }
        /* if (resetGame()) {
            square.style.backgroundColor = [data-color, "white"] -------Need to figure out how to reset color-----
        } */
        
    }

    if (playerGuess.length === 4) {
        playerAttempts++;
        currentRow++;
        playerGuess = [];
    }
}


/*----------------------------- Event Listeners -----------------------------*/
resetBtn.addEventListener('click', init);

undoBtn.addEventListener('click', () => {
    if (playerGuess.length > 0) {
        playerGuess.pop();
        targetCell++;
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
init();
console.log(hiddenColors);
/* render();
updateResult();
colorReveal();
checkPlayerGuess();
updateDisplay(); */
/* feedbackPegs(); */