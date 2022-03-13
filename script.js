function setupGame(letters, rounds){
    let gameBoard = document.querySelector('#game');
    let round,letter;
    for(let i = 0; i<rounds; i++){
        round = document.createElement('div');
        round.id = 'round' + i.toString();
        round.className = 'round';
        for(let j = 0; j<letters; j++){
            letter = document.createElement('div');
            letter.id = 'letter' + j.toString();
            letter.className = 'letter-block';
            round.appendChild(letter);
        }
        gameBoard.appendChild(round);
        console.log(round.className);
    }
}

setupGame(5,4);