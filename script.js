function newGame(e) {
    e.preventDefault();
    console.log(e);
    if(e.pointerId >= 0){
        let game = new Game();
        game.letterCount = document.getElementById('letterCount').value;
        game.maxAttempts = document.getElementById('maxAttempts').value;
        game.setupGame();
    }
}

function main() {
    let newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', newGame);
}

main();
