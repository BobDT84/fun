function newGame(e) {
    e.preventDefault();
    console.log(e);
    console.log(`Pointer ID ${e.pointerId}`);
    if(e.pointerId >= 0){
        let wordSize = document.getElementById('wordSize').value;
        let maxAttempts = document.getElementById('maxAttempts').value;
        let modes = document.getElementsByClassName('mode');
        let strictMode = document.getElementById('strictMode').checked;
        let game = new Game(wordSize, maxAttempts, strictMode);
        game.setupGame();
    }
}

function main() {
    let newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', newGame);

    let modeDropdown = document.getElementById('mode-dropdown');
    let modeList = document.getElementById('mode-list');
    modeDropdown.onmouseover = function(){modeList.classList.remove('hide');}
    modeDropdown.onmouseleave = function(){modeList.classList.add('hide');}
}

main();
