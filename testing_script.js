function newGame(e) {
    e.preventDefault();
    console.log(e);
    if(e.pointerId >= 0){
        let wordSize = document.getElementById('wordSize').value;
        let maxAttempts = document.getElementById('maxAttempts').value;
        let strictMode = document.getElementById('strictMode').checked;
        let game = new Game(wordSize, maxAttempts, strictMode);
        game.setupGame();
    }
}

function main() {
    let newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', newGame);
}

main();
