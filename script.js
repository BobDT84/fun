class Game {
    constructor() {
        this.word = '';
        this.wordsArray = [];
        this.randomIndex;
        this.maxAttempts;
        this.currentAttempt = '0';
        this.attemptID;
        this.letterCount;
        this.playersGuess = [];
    }
    isCorrectLetterSetup() {
        if (this.letterCount < 4 || this.letterCount > 8) {
            alert('letter count not set properly');
            return false;
        }
        return true;
    }
    isCorrectAttemptSetup() {
        if (this.maxAttempts < 2 || this.maxAttempts > 10) {
            alert('Attempt count not set properly');
            return false;
        }
        return true;
    }
    setRandomIndex(max = this.wordsArray.length) {
        if (max > 0) {
            this.randomIndex = Math.floor(Math.random() * max);
        }
    }
    setArray() {
        if (this.isCorrectLetterSetup() && this.isCorrectAttemptSetup()) {
            let array, string;
            let path = './words/words' + this.letterCount.toString() + '.csv'
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', path, false);
            xmlhttp.send();
            if (xmlhttp.status == 200) {
                string = xmlhttp.responseText;
            }
            array = string.split(',');
            this.wordsArray = array;
        } else {
            alert('did not set array');
        }
    }
    setWord(i = 0) {
        if (this.wordsArray.length > 0 && this.randomIndex > -1) {
            this.word = this.wordsArray[this.randomIndex].toUpperCase();
            //For testing purposes only REMOVE LATER
            this.word = 'ABBA'
            //REMOVE ABBA WHEN DONE TESTING
        } else if (i < 10) {
            this.setRandomIndex();
            this.setArray();
            console.log('setWord attempts - ' + i);
            i++;
            this.setWord(i);
        } else {
            alert('word not set');
        }
    }
    setupGameBoard() {
        if (this.isCorrectLetterSetup() && this.isCorrectAttemptSetup()) {
            let gameBoard = document.querySelector('#game');
            this.clearBoard(gameBoard);
            let attemptRowDiv, letterDiv;
            for (let i = 0; i < this.maxAttempts; i++) {
                let attemptID = 'attempt' + i.toString();
                attemptRowDiv = document.createElement('div');
                attemptRowDiv.id = attemptID;
                attemptRowDiv.className = 'attempt';
                for (let j = 0; j < this.letterCount; j++) {
                    letterDiv = document.createElement('div');
                    letterDiv.id = attemptID + ' l' + j.toString();
                    letterDiv.setAttribute('letter', j.toString());
                    attemptRowDiv.appendChild(letterDiv);
                }
                gameBoard.appendChild(attemptRowDiv);
            }
        }
    }
    setupKeyboard() {
        let keyboard = document.querySelector('#keyboard');
        this.clearBoard(keyboard);
        let rows = {
            row1: 'QWERTYUIOP',
            row2: 'ASDFGHJKL',
            row3: 'ZXCVBNM',
        };
        for (let row in rows) {
            let div = document.createElement('div');
            div.id = row;
            div.className = 'keyRow';
            for (let letter of rows[row]) {
                let key = document.createElement('div');
                key.className = 'key';
                key.innerText = letter;
                key.id = letter;
                div.appendChild(key);
            }
            keyboard.appendChild(div);
        }
    }
    setupEnterDelete() {
        let row3 = document.querySelector('#row3');
        let key = document.createElement('div');

        key.className = 'enter';
        key.innerText = 'Enter';
        key.onclick = () => { this.submitPlayersGuess(); };
        row3.appendChild(key);

        key = document.createElement('div');
        key.className = 'delete';
        key.innerText = 'Del';
        key.onclick = () => {
            this.playersGuess.pop();
            this.clearPlayersGuessDisplay();
            this.displayPlayersGuess();
        };
        row3.appendChild(key);
    }
    setupGame() {
        this.setupGameBoard();
        this.setupKeyboard();
        this.setupEnterDelete();
        this.addKeyboardListeners();
        this.setWord();
        this.setAttemptID();
        this.test();
    }
    addKeyboardListeners() {
        let keys = document.getElementsByClassName('key');
        for (let key of keys) {
            key.onclick = (e) => {
                let letter = e.path[0].innerText;
                this.addToPlayersGuess(letter);
            };
        }
    }
    addToPlayersGuess(text) {
        if (this.playersGuess.length < this.letterCount) {
            this.playersGuess.push(text);
            this.displayPlayersGuess();
        }
    }
    setAttemptID() {
        this.attemptID = 'attempt' + this.currentAttempt;
    }
    displayPlayersGuess() {
        let attempt = document.getElementById(this.attemptID);
        for (let i = 0; i < this.playersGuess.length; i++) {
            let letter = document.getElementById(this.attemptID + ' l' + i);
            letter.innerText = this.playersGuess[i];
        }
    }
    clearPlayersGuessDisplay() {
        let guessBoxes = document.getElementById(this.attemptID).childNodes;
        for (let box of guessBoxes) { box.innerText = ''; }
    }
    clearBoard(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    submitPlayersGuess() {
        //Need to add an animation to the currentAttempt row to show the results one at a time
        this.checkLetters();
        if (this.isWordWithRepeatLetters()) {
            console.log('letters repeat');
            this.updateKeys();
        } else {
            this.updateKeys();
        }
        this.nextAttempt();
    }
    checkLetters() {
        let guess = this.playersGuess;
        for (let i = 0; i < guess.length; i++) {
            let boxID = this.attemptID + ' l' + i.toString();
            let guessBox = document.getElementById(boxID);
            if (this.isCorrectLetter(guess[i], i)) {
                guessBox.classList.add('correct');
            } else if (this.isClose(guess[i])) {
                guessBox.classList.add('close');
            } else {
                guessBox.classList.add('incorrect');
            }
        }
    }
    isCorrectLetter(guessLetter, index) {
        let word = this.word.split('');
        if (guessLetter == word[index]) { return true; } else { return false; }
    }
    isClose(guessLetter) {
        let word = this.word.split('');
        return word.includes(guessLetter);
    }
    isWordWithRepeatLetters() {
        let word = this.word.split('');
        let wordSet = new Set(word);
        return word.length != [...wordSet].length;
    }
    updateKeys() {
        console.log('updateKeys');
        for (let i = 0; i < this.letterCount; i++) {
            let attemptLetters = document.querySelectorAll('[letter = "' + i + '"]')
            for (let attempt of attemptLetters) {
                //Maybe try adding all statuses to an array and check if includes correct
                //then only update key that is correct
                //if there are no correct them update keys that include close
                //else all other keys are incorrect
                if ([...attempt.classList].includes('correct')) {
                    let letter = attempt.innerText;
                    let key = document.getElementById(letter);
                    key.classList.add('correct');
                }
            }
        }


        //This is not a good way to do this
        /*
        let guessBoxes = document.getElementById(this.attemptID).childNodes;
        let statuses = ['correct', 'incorrect', 'close'];
        for(let box of guessBoxes){
            let letter = box.innerText;
            let key = document.getElementById(letter);
            if([...key.classList].includes('correct')){
                continue;
            } else {
                key.classList.add(box.classList[1]);
            }
        }
        */
    }
    nextAttempt() {
        if (this.currentAttempt < this.maxAttempts) {
            this.currentAttempt++;
            this.setAttemptID();
            this.playersGuess = [];
        }
        //TODO add something to make the player start a new game if they failed the last attempt
    }
    cheat() {
        let cheat = document.getElementById('cheat');
        cheat.onclick = () => { console.log(this.word) };
    }
    test() {
        //run in setup to test current method that is work in progress
        this.cheat();
    }
}


function newGame(e) {
    let game = new Game();
    game.letterCount = document.getElementById('letterCount').value;
    game.maxAttempts = document.getElementById('maxAttempts').value;
    game.setupGame();
    return game;
}


let newGameButton = document.getElementById('newGame');
newGameButton.addEventListener('click', newGame);
