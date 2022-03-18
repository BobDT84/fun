class Game{
    constructor(){
        this.word = '';
        this.wordsArray = [];
        this.randomIndex ;
        this.maxAttempts;
        this.currentAttempt = '0';
        this.attemptID;
        this.letterCount;
        this.playersGuess = [];
    }
    isCorrectLetterSetup(){
        if(this.letterCount < 4 || this.letterCount > 8){
            alert('letter count not set properly');
            return false;
        }
        return true;
    }
    isCorrectAttemptSetup(){
        if(this.maxAttempts < 2 || this.maxAttempts > 10){
            alert('Attempt count not set properly');
            return false;
        }
        return true;
    }
    setRandomIndex(max = this.wordsArray.length){
        if(max > 0){
            this.randomIndex = Math.floor(Math.random() * max);
        }
    }
    setArray() {
        if(this.isCorrectLetterSetup() && this.isCorrectAttemptSetup()){
            let array,string;
            let path = './words/words' + this.letterCount.toString() + '.csv'
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
    setWord(i=0){
        if(this.wordsArray.length > 0 && this.randomIndex > -1){
            this.word = this.wordsArray[this.randomIndex].toUpperCase();
        } else if(i < 10){
            this.setRandomIndex();
            this.setArray();
            console.log('setWord attempts - ' + i);
            i++;
            this.setWord(i);
        } else {
            alert('word not set');
        }
    }
    setupGameBoard(){
        if(this.isCorrectLetterSetup() && this.isCorrectAttemptSetup()){
            let gameBoard = document.querySelector('#game');
            this.clearBoard(gameBoard);
            let attemptRowDiv,letterDiv;
            for(let i = 0; i<this.maxAttempts; i++){
                let attemptID = 'attempt' + i.toString();
                attemptRowDiv = document.createElement('div');
                attemptRowDiv.id = attemptID;
                attemptRowDiv.className = 'attempt';
                for(let j = 0; j<this.letterCount; j++){
                    letterDiv = document.createElement('div');
                    letterDiv.id = attemptID + ' l' + j.toString();
                    letterDiv.className = 'letter-block';
                    attemptRowDiv.appendChild(letterDiv);
                }
                gameBoard.appendChild(attemptRowDiv);
            }
        }
    }
    setupKeyboard(){
        let keyboard = document.querySelector('#keyboard');
        this.clearBoard(keyboard);
        let rows = {
            row1:'QWERTYUIOP',
            row2:'ASDFGHJKL',
            row3:'ZXCVBNM',
        };
        for(let row in rows){
            let div = document.createElement('div');
            div.id = row;
            div.className = 'keyRow';
            for(let letter of rows[row]){
                let key = document.createElement('div');
                key.className = 'key';
                key.innerText = letter;
                key.id = letter;
                div.appendChild(key);
            }
            keyboard.appendChild(div);
        }
    }
    setupEnterDelete(){
        let row3 = document.querySelector('#row3');
        let key = document.createElement('div');

        key.className = 'enter';
        key.innerText = 'Enter';
        key.onclick = () => {this.submitGuess();};
        row3.appendChild(key);

        key = document.createElement('div');
        key.className = 'delete';
        key.innerText = 'Del';
        key.onclick = () => {
            this.playersGuess.pop();
            this.clearGuessDisplay();
            this.displayGuess();
        };
        row3.appendChild(key);
    }
    setupGame(){
        this.setupGameBoard();
        this.setupKeyboard();
        this.setupEnterDelete();
        this.addKeyboardListeners();
        this.setWord();
        this.setAttemptID();
        this.test();
    }
    addKeyboardListeners(){
        let keys = document.getElementsByClassName('key');
        for(let key of keys){
            key.onclick = (e) => {
                let letter = e.path[0].innerText;
                this.addToGuess(letter);
            };
        }
    }
    addToGuess(text){
        if(this.playersGuess.length < this.letterCount){
            this.playersGuess.push(text);
            this.displayGuess();
        }
    }
    setAttemptID(){
        this.attemptID = 'attempt' + this.currentAttempt;
    }
    displayGuess(){
        let attempt = document.getElementById(this.attemptID);
        for(let i=0; i<this.playersGuess.length; i++){
            let letter = document.getElementById(this.attemptID + ' l' + i);
            letter.innerText = this.playersGuess[i];
        }
    }
    clearGuessDisplay(){
        let guessBoxes = document.getElementById(this.attemptID).childNodes;
        for(let box of guessBoxes){ box.innerText = ''; }
    }
    clearBoard(element){
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    }
    submitGuess(){
        this.checkLetters();
        this.updateKeys();
        this.nextAttempt();
    }
    checkLetters(){
        let guess = this.playersGuess;
        for(let i=0; i<guess.length; i++){
            let boxID = this.attemptID + ' l' + i.toString();
            let box = document.getElementById(boxID);
            //let letter = guess[i];
            if(this.isCorrectLetter(guess[i],i)){
                box.classList.add('correct');
            } else if( this.isClose(guess[i])){
                box.classList.add('close');
            } else {
                box.classList.add('incorrect');
            }
        }
    }
    isCorrectLetter(guessLetter, index){
        let word = this.word.split('');
        if(guessLetter == word[index]){return true;} else {return false;}
    }
    isClose(guessLetter){
        let word = this.word.split('');
        return word.includes(guessLetter);
    }
    updateKeys(){
        let guessBoxes = document.getElementById(this.attemptID).childNodes;
        let statuses = ['correct', 'incorrect', 'close'];
        for(let box of guessBoxes){
            let letter = box.innerText;
            let key = document.getElementById(letter);
            for(let status of statuses){
                console.log(box.classList);
                if([...box.classList].includes(status) && ![...key.classList].includes(status)){
                    key.classList.add(status);
                }
            }
        }
    }
    nextAttempt(){
        if(this.currentAttempt < this.maxAttempts){
            this.currentAttempt++;
            this.setAttemptID();
            this.playersGuess = [];
        }
    }
    cheat(){
        let cheat = document.getElementById('cheat');
        cheat.onclick = () =>{ console.log(this.word) };
    }
    test(){
        //run in setup to test current method that is work in progress
        this.cheat();
    }
}


function newGame(e){
    let game = new Game();
    game.letterCount = document.getElementById('letterCount').value;
    game.maxAttempts = document.getElementById('maxAttempts').value;
    game.setupGame();
    return game;
}


let newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', newGame);
