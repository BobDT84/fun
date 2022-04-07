function newGame(e) {
    e.preventDefault();
    console.log(e);
    console.log(`Pointer ID ${e.pointerId}`);
    if(e.pointerId >= 0){
        let wordSize = document.getElementById('wordSize').value;
        let maxAttempts = document.getElementById('maxAttempts').value;
        let game = new Game(wordSize, maxAttempts);
        game.setupGame();
    }
}

function main() {
    let newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', newGame);
}

main();
