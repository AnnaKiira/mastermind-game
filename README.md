# mastermind-game
![Image of game](./image/gameimage.png/?raw=true "Mastermind Game")

Description of the game and why I chose it for my project:
- Mastermind is a code-breaking game. The goal is for the player to guess a generated code of colored pegs. The player has eight attempts to do so. After each guess, feedback is provided:
A black peg will indicate the player guessed correct color in the correct position, while a pink
peg will indicate the player guessed the correct color but in the wrong position.

- I chose Mastermind as my game project because I like the logical challenge of the game. Additionally, I was also interested in developing a single-player game, as our class primarily focused on multiplayer games like tic-tac-toe.

- [Link to Game](https://annakiira.github.io/mastermind-game/)
- [Planning Materials Document](https://docs.google.com/document/d/1cjcZTjijnJ6sMgfoG4z_IcGP5rwZv1Q7NydrabWlPio/edit?usp=sharing)

Challenges:
- One of the challenges I faced while developing my Mastermind game was the grid. Initially, the grid was a single large grid, making it difficult to code for each column in each row. I redesigned the grid to be more dynamic, allowing easier targeting of individual columns within each row. This was useful for targeting specific columns for both the player guesses and the feedback pegs. 
- Another unexpected challenge was coding the logic for the pink feedback pegs. I had to use two separate loops within one function to manage the feedback pegs correctly. These loops needed to be separate yet still interact with each other to function as intended. 

Key learnings:
- Adding audio to events. 
- Creating a grid directly in JavaScript.
- Using two for loops within one function, enabling them to perform different tasks while still interacting effectively.

Technologies used:
- For the completion of this project, JavaScript, HTML, CSS and Audio have been used.

Future enhancements for this Mastermind project include:
- Styling improvements: Enhancing the overall design of the game to add a personal touch with custom colors, as the current color scheme is generic.
- Player feedback: Improving the visibility of player attempts by adding level indicators (1-8) in the middle of the grid.
