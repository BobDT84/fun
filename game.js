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
        this.guessAccuracy = [];
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
            //this.word = 'ABBA'
            //REMOVE ABBA WHEN DONE TESTING
            //REMOVE ABBA WHEN DONE TESTING
            //REMOVE ABBA WHEN DONE TESTING
            //REMOVE ABBA WHEN DONE TESTING
            //REMOVE ABBA WHEN DONE TESTING
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
    setGuessAccuracy() {
        this.guessAccuracy = Array(+this.letterCount).fill(0);
        //unary operator(+) to convert string to number
        console.log(this.guessAccuracy);
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
                    letterDiv.className = 'guess';
                    letterDiv.id = attemptID + ' l' + j.toString();
                    letterDiv.setAttribute('letter', j.toString());
                    attemptRowDiv.appendChild(letterDiv);
                }
                gameBoard.appendChild(attemptRowDiv);
            }
            let answer = document.createElement('div');
            answer.id = 'answer';
            gameBoard.appendChild(answer);
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

        key.id = 'enter';
        key.innerText = 'Enter';
        key.onclick = () => { this.submitPlayersGuess(); };
        row3.appendChild(key);
        () => { document.getElementById('enter').focus(); }
        //Change of focus has to be in a function expression otherwise the focus reverts
        //back to the new game button and pressing the enter key will start a new game

        key = document.createElement('div');
        key.id = 'delete';
        key.innerText = 'Del';
        key.onclick = () => { this.deletePreviousLetter(); };
        row3.appendChild(key);
    }
    setupGame() {
        this.setupGameBoard();
        this.setupKeyboard();
        this.setupEnterDelete();
        this.addKeyClickListeners();
        this.addKeyPressListeners();
        this.setWord();
        this.setAttemptID();
        this.setGuessAccuracy();
        this.test();
    }
    addKeyPressListeners() {
        document.onkeydown = (e) => { this.handleKeyPress(e.key.toUpperCase()) };
    }
    addKeyClickListeners() {
        let keys = document.getElementsByClassName('key');
        for (let key of keys) {
            key.onclick = (e) => {
                let letter = e.path[0].innerText;
                this.addToPlayersGuess(letter);
            };
        }
    }
    deletePreviousLetter() {
        this.playersGuess.pop();
        this.clearPlayersGuessDisplay();
        this.displayPlayersGuess();
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
    handleKeyPress(text) {
        switch (true) {
            case 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(text):
                this.addToPlayersGuess(text);
                break;
            case text == 'BACKSPACE':
                this.deletePreviousLetter();
                break;
            case text == 'ENTER':
                this.submitPlayersGuess();
                break;
        }

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
        this.updateKeyHints();
        if (this.isCorrectGuess()) {
            alert('You WON!');
        }
        console.log('Current Attempt ' + this.currentAttempt);
        console.log('Max Attempts ' + (Number(this.maxAttempts)-1).toString());
        if(this.currentAttempt < Number(this.maxAttempts)-1){
            this.nextAttempt();
        } else {
            this.gameLost();
        }
    }
    isCorrectGuess() {
        let i = 0;
        while (this.guessAccuracy[i] == 'correct') {
            i++;
        }
        if (i == this.guessAccuracy.length) { return true; } else { return false; }
    }
    gameLost(){
        let answer = document.getElementById('answer');
        answer.innerText = 'The word was ' + this.word;
        alert('Sorry, you lost. Better luck next time.');
    }
    checkLetters() {
        let guess = this.playersGuess;
        for (let i = 0; i < guess.length; i++) {
            let boxID = this.attemptID + ' l' + i.toString();
            let guessBox = document.getElementById(boxID);
            if (this.isCorrectLetter(guess[i], i)) {
                guessBox.classList.add('correct');
                this.guessAccuracy[i] = 'correct';
            } else if (this.isClose(guess[i])) {
                guessBox.classList.add('close');
                if (this.guessAccuracy[i] != 'correct') { this.guessAccuracy[i] = 'close'; }
            } else {
                guessBox.classList.add('incorrect');
                this.changeKeyToIncorrect(guessBox.innerText);
            }
        }
        console.log(this.guessAccuracy);
    }
    changeKeyToIncorrect(letter) {
        let key = document.getElementById(letter);
        key.classList.add('incorrect');
    }
    isCorrectLetter(guessLetter, index) {
        let word = this.word.split('');
        if (guessLetter == word[index]) { return true; } else { return false; }
    }
    isClose(guessLetter) {
        return this.word.includes(guessLetter);
    }
    isWordWithRepeatLetters() {
        let word = this.word.split('');
        let wordSet = new Set(word);
        return word.length != [...wordSet].length;
    }
    updateKeyHints() {
        let word = this.word.split('');
        let guess = this.playersGuess;
        let statusOf = {};
        for (let i = 0; i < word.length; i++) {
            let letter = guess[i];
            if (word.includes(letter)) {
                if (!statusOf[letter]) {
                    statusOf[letter] = this.guessAccuracy[i];
                } else if (word.indexOf(letter, 2) > 0) { //if there is a repeating letter
                    if (statusOf[letter] == 'correct' && this.guessAccuracy[i] == 'close') {
                        statusOf[letter] = 'close';
                    }
                }
            }
        }
        for (let letter in statusOf) {
            let key = document.getElementById(letter);
            key.className = 'key ' + statusOf[letter];
        }
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