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
    }
}




setupGame(5,4);

async function fetchWord(letters){
    let word;
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    await fetch('./words/allWords.json')
        .then(response => response.json())
        .then(wordsObj => {
            word = [];
            let wordLength = 'words' + letters.toString();
            let randomWord = Math.floor(Math.random()*Number(letters)); //Random Integer used to select random array index
            word.push(wordsObj[wordLength][randomWord]);
            console.log('inside fetch');
            console.log(word[0]);
    });
    let i = 0
    let start = Date.now()
    console.log('While Starts')
    while(typeof word === 'undefined' && i < 20000){
        console.log('loop ' + i.toString());
        console.log((Date.now()-start)/1000);
        await word;
        i++;
    }
    return word[0];
}