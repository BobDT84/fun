import { Game } from './Game.js';

function newGame(e) {
    e.preventDefault();
    console.log(e);
    console.log(`Pointer ID ${e.pointerId}`);
    if(e.pointerId >= 0){
        let wordSize = document.getElementById('wordSize').value;
        let maxAttempts = document.getElementById('maxAttempts').value;
        Game(wordSize, maxAttempts);
    }
}

function main() {
    let newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', newGame);
}

main();
