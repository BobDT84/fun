function newGame(e) {
    let game = new Game();
    game.letterCount = document.getElementById('letterCount').value;
    game.maxAttempts = document.getElementById('maxAttempts').value;
    game.setupGame();
    return game;
}

function main() {
    let newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', newGame);
}

main()
