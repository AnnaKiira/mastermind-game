/*-------------------------------- Constants --------------------------------*/
const height = 8;
const width = 9;
const totalSquareCount = width * height;
const colorOptions = ['green', 'red', 'blue', 'brown', 'orange', 'yellow']; /* These are my chosen colors that are hidden and has to be guessed */
const maximumAttempts = 8;


/*-------------------------------- Variables (state) --------------------------------*/
let hiddenColors; /* the array of generated colors */
let playerAttempts; /* this starts at 0 since player hasn't used any attempts when starting game */
let playerGuess; /* the array of the players guesses */


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

for (let i = 0; i < totalSquareCount; i++) {
    const square = document.createElement('div')
    square.innerText = i
    square.classList.add('sqr')
    square.id = i
    square.style.height = `${97 / height}%`
    square.style.width = `${95.5 / width}%`
    squareElements.push(square) // This adds square to squareElements array
    grid.appendChild(square) // Add element to the page 
    /* console.log(square) */
    /* console.log(squareElements) */
}

/*-------------------------------- Functions --------------------------------*/
function init () {
    hiddenColors = colorReveal();
    playerAttempts = 0;
    playerGuess = [];
    render();

};


function render () {

}



function colorReveal () {
    let hidden = []; /* this will initialize my empty array that will keep my generated colors once they're generated  */
    for (let i = 0; i < 4; i++) { /* Choosing a for loop that runs 4 times (the amount of hidden pegs) */
        let randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]; /* using Math.floor and math.random methods to select random colors from my colors array */
        hidden.push(randomColor); /* this pushes the random selected color to the empty hidden array */
    }
    return hidden; /* this is returning the hidden array now with the generated colors */
}

function checkPlayerGuess () {
    return playerGuess.every((color, index) => color === hiddenColors[index]); /* using array every method to check if playerGuess chose the same color pegs as the hiddenColors have generated (both the color and at the same index in the array) */
}

function updateDisplay () {


    /* console.log('Buttons clicked') */
}

function updateResult () { 
    if (checkPlayerGuess()) {
        displayResult.innerText = 'Congratulations, you won!';
    } else if (playerAttempts >= maximumAttempts) {
        displayResult.innerText = `Game over! The correct color pegs was ${hiddenColors}`;
    } 
}

function handleClick(evt) {

}

/*----------------------------- Event Listeners -----------------------------*/
resetBtn.addEventListener('click', init);

undoBtn.addEventListener('click', init);

colorPegsBtn.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.dataset.color; /* this part is defining the actual color from my data-color in html and CSS, without it my event listener wont work */
        if (playerGuess.length < width) {
            playerGuess.push(color);
            /* console.log(playerGuess); */
            updateDisplay();
        }
    });
});


/*----------------------------- Calling the functions -----------------------------*/
init();
console.log(hiddenColors);
render ();
updateResult();
colorReveal();
checkPlayerGuess();
updateDisplay();