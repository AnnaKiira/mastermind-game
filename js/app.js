/*-------------------------------- Constants --------------------------------*/
const height = 8
const width = 9
const totalSquareCount = width * height
const colorOptions = ['green', 'red', 'blue', 'brown', 'orange', 'yellow']; /* These are my chosen colors that are hidden and has to be guessed */ 


/*-------------------------------- Variables (state) --------------------------------*/
let hiddenColors = []; /* This empty array will store my chosen colors I defined in my const colors array */
let attempts; 8
let gameResult;
let display = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; 


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
const colorPegsBtn = document.querySelectorAll('.color-pegs')

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
    render();

}


function render () {
}

function gridNumber() {
    let display = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; 
}

function updateResult () {

}

function colorReveal () {
    let hidden = []; /* this will initialize my empty array that will keep my generated colors once they're generated  */
    for (let i = 0; i < 4; i++) { /* Choosing a for loop that runs 4 times (the amount of hidden pegs) */
        let randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)]; /* using Math.floor and math.random methods to select random colors from my colors array */
        hidden.push(randomColor); /* this pushes the random selected color to the empty hidden array */
    }
    return hidden; /* this is returning the hidden array now with the generated colors */
}

function guess (evt) { /* this is an event that checks if the guess if matching the hiddenColors */
    return evt.length === hiddenColors.length && evt.every((colorPeg, index) => colorPeg === hiddenColors[index]); /* using array every method to check if every guess (the event that is happening) is the same length as the hiddenColors (4 guesses and 4 generated colors) and that they're at the same index*/
}

function updateDisplay () {
    display.forEach((sqr, index) => {
        if (sqr === '#greenBtn') {
            squareElements[index].textContent = 
        }
    
    });
};

/* function handleClick (evt) {
    const squareIndex = evt.target.id;
    if (display[squareIndex] === '#greenBtn' && display[squareIndex] === '#redBtn' && display[squareIndex] === '#blueBtn' && display[squareIndex] === '#brownBtn' && display[squareIndex] === '#orangeBtn' && display[squareIndex] === '#yellowBtn' &&) {

    }
} */

/*----------------------------- Event Listeners -----------------------------*/
resetBtn.addEventListener('click', init)
undoBtn.addEventListener('click', init)
/* colorPegsBtn.addEventListener('click', init) */


/*----------------------------- Event Listeners -----------------------------*/
init();
/* console.log(hiddenColors); */
render ();
updateResult();
colorReveal();