class Game{
    constructor(){
        this.word = '';
        this.wordsArray = [];
        this.randomIndex ;
        this.attempts;
        this.currentAttempt = 0;
        this.letters;
        this.guess = [];
    }
    isCorrectLetters(){
        if(this.letters < 4 || this.letters > 8){
            alert('letter count not set properly');
            return false;
        }
        return true;
    }
    isCorrectAttempts(){
        if(this.attempts < 2 || this.attempts > 10){
            alert('Attempt count not set properly');
            return false;
        }
        return true;
    }
    setRandomIndex(max = this.wordsArray.length){
        this.randomIndex = Math.floor(Math.random() * max);
    }
    setArray() {
        if(this.isCorrectLetters() && this.isCorrectAttempts()){
            let array,string;
            let path = './words/words' + this.letters.toString() + '.csv'
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', path, false);
            xmlhttp.send();
            if (xmlhttp.status==200) {
                string = xmlhttp.responseText;
            }
            array = string.split(',');
            this.wordsArray = array;
        } else {
            alert('did not set array');
        }
    }
    setWord(){
        if(this.wordsArray.length > 0 && this.randomIndex !== 'undefined'){
            this.word = this.wordsArray[this.randomIndex];
        } else {
            this.setRandomIndex();
            this.setArray();
            //this.setWord();
            //console.log('is setWord() stuck in a loop?');
        }
    }
    setupGameBoard(){
        if(this.isCorrectLetters() && this.isCorrectAttempts()){
            let gameBoard = document.querySelector('#game');
            this.clearSection(gameBoard);
            let attempt,letter;
            for(let i = 0; i<this.attempts; i++){
                attempt = document.createElement('div');
                attempt.id = 'attempt' + i.toString();
                attempt.className = 'attempt';
                for(let j = 0; j<this.letters; j++){
                    letter = document.createElement('div');
                    letter.id = j.toString();
                    letter.className = 'letter-block';
                    attempt.appendChild(letter);
                }
                gameBoard.appendChild(attempt);
            }
        }
    }
    setupKeyboard(){
        let keyboard = document.querySelector('#keyboard');
        this.clearSection(keyboard);
        let rows = {
            row1:'qwertyuiop',
            row2:'asdfghjkl',
            row3:'zxcvbnm',
        };
        for(let row in rows){
            let div = document.createElement('div');
            div.id = row;
            div.className = 'keyRow';
            for(let letter of rows[row]){
                let key = document.createElement('div');
                key.className = 'key';
                key.innerText = letter;
                div.appendChild(key);
            }
            keyboard.appendChild(div);
        }
        let row3 = document.querySelector('#row3');
        let key = document.createElement('div');
        key.className = 'key enter';
        key.innerText = 'Enter';
        row3.appendChild(key);
    }
    setupGame(){
        this.setupGameBoard();
        this.setupKeyboard();
        this.addKeyboardListeners();
        this.setWord();
    }
    addKeyboardListeners(){
        let keys = document.getElementsByClassName('key');
        for(let key of keys){
            key.addEventListener('click',this.addToGuess);
        }
    }
    addToGuess(element){
        let currentGuess = document.getElementById('guess');
        let newGuess = currentGuess.innerText + element.innerText;
        currentGuess.innerText = newGuess;
    }
    displayGuess(){
        let attemptID = '#attempt' + this.currentAttempt.toString();
        let attempt = document.querySelector(attemptID);
        for(let i=0; i<this.letters; i++){
            let letter = document.querySelector(attemptID + '.' + i);
            letter.innerText = this.guess[i];
        }
    }
    clearSection(element){
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    }
}


function newGame(e){
    let letters = document.getElementById('letters').value;
    let attempts = document.getElementById('attempts').value;
    let guess = document.getElementById('guess');
    let game = new Game();
    game.letters = letters
    game.attempts = attempts;
    //guess.addEventListener()  How to know when this element is updated?
    game.setupGame();
}


let newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', newGame);
