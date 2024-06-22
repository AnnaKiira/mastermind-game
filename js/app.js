/*-------------------------------- Constants --------------------------------*/
const height = 8
const width = 9
const totalSquareCount = width * height


/*-------------------------------- Variables --------------------------------*/


/*------------------------ Cached Element References ------------------------*/
const grid = document.querySelector('.grid')
/* console.log(grid) */
const squareElements = [] //This will contain all of the divs representing squares on my display

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
/* function init () {

}

init () */
/*----------------------------- Event Listeners -----------------------------*/
