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

    let modeDropdown = document.getElementById('selectMode');
    let modeList = document.getElementById('mode-list');
    let show = function(){modeList.classList.remove('hide');}
    let hide = function(){modeList.classList.add('hide');}
    modeDropdown.onmouseover = show;
    modeDropdown.onmouseleave = hide;
    modeList.onmouseover = show;
    modeList.onmouseleave = hide;
}

main();
