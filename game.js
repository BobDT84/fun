class Game {
    constructor(wordSize, maxAttempts, strictMode = false) {
        this.word = '';
        this.arrayOfWords = [];
        this.randomIndex;
        this.maxAttempts = maxAttempts;
        this.currentAttempt = '0';
        this.attemptID;
        this.wordSize = wordSize;
        this.playersGuess = [];
        this.guessAccuracy = [];
        this.guessLetterStatus = {};
        this.playing = true;
        this.strictMode = strictMode;
    }
    isCorrectLetterSetup() {
        if (this.wordSize < 4 || this.wordSize > 8) {
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
    setRandomIndex(max = this.arrayOfWords.length) {
        if (max > 0) {
            this.randomIndex = Math.floor(Math.random() * max);
        }
    }
    setArray() {
        if (this.isCorrectLetterSetup() && this.isCorrectAttemptSetup()) {
            let array, string;
            let path = './words/words' + this.wordSize.toString() + '.csv'
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', path, false);
            xmlhttp.send();
            if (xmlhttp.status == 200) {
                string = xmlhttp.responseText;
            }
            array = string.split(',');
            this.arrayOfWords = array;
        } else {
            alert('did not set array');
        }
    }
    setWord(i = 0) {
        if (this.arrayOfWords.length > 0 && this.randomIndex > -1) {
            this.word = this.arrayOfWords[this.randomIndex].toUpperCase();
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
        this.guessAccuracy = Array(+this.wordSize).fill(0);
        //unary operator(+) to convert string to number
    }
    setGuessLetterStatus(word = this.word.split('')) {
        this.guessLetterStatus = {};
        for (let letter of word) {
            if (this.guessLetterStatus[letter]) {
                this.guessLetterStatus[letter][0] += 1
            } else {
                this.guessLetterStatus[letter] = [1, 0];
            }
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
                for (let j = 0; j < this.wordSize; j++) {
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
        this.playing = true;
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
        if(this.playing){
            this.playersGuess.pop();
            this.clearPlayersGuessDisplay();
            this.displayPlayersGuess();A
        }
    }
    addToPlayersGuess(text) {
        if (this.playing && this.playersGuess.length < this.wordSize) {
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
        if(this.playing){
            if(this.strictMode){
                this.checkWithStrictMode();
            } else {
                this.processGuess();
            }
        }
    }
    processGuess(){
        this.checkLetters();
        this.updateKeyHints();
        if (this.isCorrectGuess()) {
            this.gameWon();
        } else if (this.currentAttempt < Number(this.maxAttempts) - 1) {
            this.nextAttempt();
        } else {
            this.gameLost();
        }
    }
    updateGuessLetterStatus() {
        let word = this.word.split('');
        this.setGuessLetterStatus();
        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            let status = this.guessAccuracy[i];
            if (status == 'correct') {
                this.guessLetterStatus[letter][1] += 1;
            }
        }
    }
    checkWithStrictMode(){
        let guess = this.playersGuess.join('').toLowerCase();
        let word = this.word;
        let wordsArray = this.arrayOfWords;
        console.log(`Guess length ${this.playersGuess.length}`);
        console.log(`Word length ${this.wordSize}`);
        if(guess.length != this.word.length){
            alert('Not a valid guess.  Word length not long enough');
        } else if (!wordsArray.includes(guess)){
            alert('Not a valid word.  Word not found.');
        } else {
            this.processGuess();
        }
    }
    isCorrectGuess() {
        let i = 0;
        while (this.guessAccuracy[i] == 'correct') {
            i++;
        }
        if (i == this.guessAccuracy.length) { return true; } else { return false; }
    }
    gameLost() {
        let answer = document.getElementById('answer');
        answer.innerText = `The word was ${this.word}.  Index reference is ${this.randomIndex}`;
        alert('Sorry, you lost. Better luck next time.');
        this.playing = false;
    }
    gameWon(){
        alert('You WON!');
        this.playing = false;
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
    updateKeyHints() {
        this.updateGuessLetterStatus();
        for (let letter in this.guessLetterStatus) {
            let status = this.guessLetterStatus[letter];
            let key = document.getElementById(letter);
            if (status[0] == status[1]) {
                key.className = 'key correct';
            } else if (status[1] > 0) {
                key.className = 'key close';
            } else if (this.playersGuess.includes(letter)) {
                key.className = 'key close';
            }
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
    test() {
        //run in setup to test current method that is work in progress
        console.log(this.word);
        console.log(this.strictMode);
    }
}