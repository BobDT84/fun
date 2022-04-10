function newGame(e) {
    e.preventDefault();
    if(e.pointerId >= 0){
        let wordSize = document.getElementById('wordSize').value;
        let maxAttempts = document.getElementById('maxAttempts').value;
        let modes = document.getElementsByClassName('mode');
        let activeModes = [];
        for(let mode of modes){
            if(mode.checked){
                activeModes.push(mode.id);
            }
        }
        let game = new Game(wordSize, maxAttempts, activeModes);
        game.setArrayOfWords();
        game.setupNewGame();
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
