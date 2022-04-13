class Game {
    constructor(wordSize, maxAttempts, activatedModes = []) {
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
        this.activatedModes = activatedModes;
    }
    setGameModeStatus() {
        //toggle modes from false to true for every mode listed in activatedModes
        let modes = {
            strict: 'strictMode',
            fiveWord: 'fiveWordMode',
        };
        let listOfModes = Object.keys(modes);
        for (let mode of this.activatedModes) {
            if (listOfModes.includes(mode)) {
                this[modes[mode]] = true;
            }
        }
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
    setArrayOfWords() {
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
            //this.setArrayOfWords();
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
    setupGameBoard(wordSize = this.wordSize, maxAttempts = this.maxAttempts) {
        if (this.isCorrectLetterSetup() && this.isCorrectAttemptSetup()) {
            let gameBoard = document.querySelector('#game');
            this.clearBoard(gameBoard);
            let attemptRowDiv, letterDiv;
            for (let i = 0; i < maxAttempts; i++) {
                let attemptID = 'attempt' + i.toString();
                attemptRowDiv = document.createElement('div');
                attemptRowDiv.id = attemptID;
                attemptRowDiv.className = 'attempt';
                for (let j = 0; j < wordSize; j++) {
                    letterDiv = document.createElement('div');
                    letterDiv.className = 'guess';
                    letterDiv.id = attemptID + ' l' + j.toString();
                    letterDiv.setAttribute('letter', j.toString());
                    attemptRowDiv.appendChild(letterDiv);
                }
                gameBoard.appendChild(attemptRowDiv);
            }
            let message = document.createElement('div');
            message.id = 'message';
            gameBoard.appendChild(message);
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
    setupFiveWordMode() {
        this.totalAttempts = Number(this.maxAttempts) * 5;
        this.attemptsUsed = 0;
        this.fiveWords = [];
    }
    createDefinitionCard(cardID, word, phonetic, phoneticAudio, partOfSpeech, definitions) {
        let card = document.createElement('div');
        card.id = cardID;
        card.className = 'definition-card popup-window hide';
        let header = document.createElement('h4');
        header.className = 'definition-content definition-header';
        header.innerHTML = `The word was ${this.word}.<br>Reference# ${this.randomIndex}`;
        //Reference for testing purposes, to remove words that don't work or are too difficult
        card.appendChild(header);

        if (cardID == 'card1') {
            card.classList.toggle('hide');
        }

        let definition = {
            word: ['p', 'definition-content defintion-word', word],
            phonetic: ['p', 'definition-content', phonetic],
            phoneticAudio: ['audio', 'definition-content phonetic-audio', phoneticAudio],
            partOfSpeech: ['span', 'defintion-content part-of-speech button no-click', partOfSpeech],
            definitions: ['div', 'definition-content defintions', this.firstTwoDefinitions(definitions)],
            reference: ['a', 'definition-content definition-api', 'Definition provided by dictionaryapi.dev/']
        }

        for (let id in definition) {
            let elementTag = definition[id][0],
                className = definition[id][1],
                content = definition[id][2],
                element = document.createElement(elementTag);
            if (!content) { continue; }
            element.className = className;
            element.id = id + cardID;
            if (id == 'phoneticAudio') {
                element.controls = true;
                element.src = content;
            } else if (id == 'definitions') {
                for (let definition of content) {
                    let p = document.createElement('p');
                    p.innerText = definition;
                    element.appendChild(p);
                }
            }
            else {
                element.innerText = content;
            }
            if (id == 'reference') {
                element.href = 'https://dictionaryapi.dev/';
            }
            card.appendChild(element);
        }
        let closeButton = document.createElement('div');
        closeButton.className = 'button definition-close';
        closeButton.id = 'closeButton' + cardID;
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', (e) => { this.showHideDefinition(e.path[1].id) });
        //Either change to card.remove() or add a feature to make the definition
        //card reappear after it is closed at the end of a game
        card.appendChild(closeButton);
        let layer = document.getElementById('layer1');
        layer.appendChild(card);
    }
    setupNewGame() {
        this.setGameModeStatus();
        this.resetGame();
        this.addKeyPressListeners();
        if (this.fiveWordMode) { this.setupFiveWordMode(); }
    }
    resetGame() {
        this.currentAttempt = '0';
        this.playersGuess = [];
        this.guessAccuracy = [];
        this.guessLetterStatus = {};
        this.setupGameBoard();
        this.setupKeyboard();
        this.setupEnterDelete();
        this.addKeyClickListeners();
        this.setWord();
        this.setAttemptID();
        this.setGuessAccuracy();
        this.clearDefinitionCards();
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
        if (this.playing) {
            this.playersGuess.pop();
            this.clearPlayersGuessDisplay();
            this.displayPlayersGuess();
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
    displayPlayersGuess(playersGuess = this.playersGuess, currentAttempt = this.currentAttempt) {
        let attemptID = `attempt${currentAttempt}`;
        for (let i = 0; i < playersGuess.length; i++) {
            let letter = document.getElementById(attemptID + ' l' + i);
            letter.innerText = playersGuess[i];
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
        if (this.playing) {
            if (this.strictMode) {
                this.checkWithStrictMode();
            } else {
                this.processGuess();
            }
        }
    }
    processGuess() {
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
    checkWithStrictMode() {
        let guess = this.playersGuess.join('').toLowerCase();
        let word = this.word;
        let wordsArray = this.arrayOfWords;
        if (guess.length != this.word.length) {
            alert('Not a valid guess.  Word length not long enough');
        } else if (!wordsArray.includes(guess)) {
            alert('Not a valid word.  Word not found.');
        } else {
            this.processGuess();
        }
    }
    isCorrectGuess() {
        return this.playersGuess.join('') == this.word;
    }
    createPopup(
      popupMessages = ['No Message'],
      buttons = [{ text: 'Close', onClick: (element) =>{element.remove()}, onClickTarget: 'self'}],
      appendTo = document.getElementById('layer1')
      ) {
        let popup = document.createElement('div');
        popup.className = 'popup-window';

        for (let popupMessage of popupMessages) {
            let message = document.createElement('p');
            message.className = 'popup-message';
            message.innerText = popupMessage;
            popup.appendChild(message);
        }

        let buttonContainer = document.createElement('div');
        buttonContainer.className = 'popup-buttons';
        for (let button of buttons) {
            let newButton = document.createElement('div');
            newButton.className = 'button popup-button';
            newButton.innerText = button.text;
            let target;
            if(button.onClickTarget == 'self'){
                target = popup;
            } else {
                target = button.onClickTarget;
            }
            console.log(target);
            newButton.addEventListener('click', (e) =>{button.onClick(target)});
            buttonContainer.appendChild(newButton);
        }
        popup.appendChild(buttonContainer);
        appendTo.appendChild(popup);
    }
    gameLost() {
        if (this.fiveWordMode) {
            this.attemptsUsed++;
            this.nextWordOfFiveWord('Sorry, you missed that word.');
        } else {
            this.createPopup(['Sorry, you lost.', 'Better luck next time.']);
            this.playing = false;
        }
        this.getDefinition();
    }
    gameWon() {
        if (this.fiveWordMode) {
            this.attemptsUsed++;
            this.nextWordOfFiveWord('You guessed it!');
        } else {
            this.createPopup(['You Won!']);
            this.playing = false;
        }
        this.getDefinition();
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
            if (this.fiveWordMode) { this.attemptsUsed++ }
            this.currentAttempt++;
            this.setAttemptID();
            this.playersGuess = [];
        }
    }
    nextWordOfFiveWord(message) {
        let word = this.word + (+this.currentAttempt + 1).toString();
        //unary operator to convert currentAttempt from string to number
        this.fiveWords.push(word);
        if (this.fiveWords.length < 5) {
            let quit = (element) => {
                this.endFiveWord();
                element.remove();
            };
            let nextWord = (element) => {
                this.setRandomIndex();
                this.resetGame();
                element.remove();
            };
            let buttons = [
                {text: 'Quit', onClick: quit, onClickTarget: 'self'},
                {text: 'Next', onClick: nextWord, onClickTarget: 'self'},
            ]
            this.createPopup([message],buttons);
        } else {
            this.endFiveWord();
        }
    }
    fiveWordFormatGameBoard(column) {
        column--;
        for (let i = 0; i < 5; i++) {
            let id = `attempt${i} l${column}`;
            let box = document.getElementById(id);
            box.classList.add('guessCount');
        }
        let header = document.createElement('div');
        let wordHeader = document.createElement('span')
        let attemptHeader = document.createElement('span')
        header.id = 'fiveWordHeader';
        wordHeader.id = 'fiveWordWordHeader';
        attemptHeader.id = 'fiveWordAttemptHeader';
        wordHeader.innerText = 'Words';
        attemptHeader.innerText = 'Attempts';
        header.appendChild(wordHeader);
        header.appendChild(attemptHeader);
        let gameBoard = document.getElementById('game');
        gameBoard.insertBefore(header, gameBoard.firstChild);
    }
    endFiveWord() {
        //Create a new game board to display the previous words and
        //the attempts it took to guess them
        let columns = Number(this.wordSize) + 1;
        let rows = 5;
        this.setupGameBoard(columns, rows);
        for (let [i, word] of this.fiveWords.entries()) {
            this.displayPlayersGuess(word.split(''), i);
        }
        this.fiveWordFormatGameBoard(columns);
        this.writeMessage(`You guessed 5 words in ${this.attemptsUsed} out of ${this.totalAttempts} tries.`);
    }
    writeMessage(text) {
        let message = document.getElementById('message');
        message.innerText = text;
    }
    showHideDefinition(cardID) {
        let card = document.getElementById(cardID);
        card.classList.toggle('hide');
    }
    async getDefinition(word = this.word) {
        this.clearDefinitionCards();
        let apiAddress = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
        let apiCallAddress = apiAddress + word;
        let response = await fetch(apiCallAddress, { method: 'GET', credentials: 'omit' });
        //credentials: 'omit' does not send or receive cookies
        let data = await response.json();
        console.log('API Definition Data');
        console.log(data);
        let i = 1;
        for (let object of data) {
            let cardID = 'card' + i.toString();
            i++;
            let apiWord = await object.word,
                phonetic = await object.phonetic,
                partOfSpeech = await object.meanings[0].partOfSpeech,
                definitions = await object.meanings[0].definitions;
            let phoneticAudio = false;
            if (await object.phonetics.length > 0) {
                let phoneticAudio = await object.phonetics[0].audio;
            }
            this.createDefinitionCard(cardID, apiWord, phonetic, phoneticAudio, partOfSpeech, definitions);
        }
        this.linkDefinitionCards();
    }
    firstTwoDefinitions(definitions) {
        let firstDefinition = "1.  " + definitions[0].definition;
        if (definitions.length < 2) { return [firstDefinition]; }
        let secondDefinition = "2.  " + definitions[1].definition;
        return [firstDefinition, secondDefinition];
    }
    clearDefinitionCards() {
        let cards = document.getElementsByClassName('definition-card');
        for (let card of cards) {
            card.remove();
        }
    }
    linkDefinitionCards() {
        let cardsByClassName = document.getElementsByClassName('definition-card');
        if (cardsByClassName.length > 1) {
            let cards = {};
            let numbers = [];
            for (let domElement of cardsByClassName) {
                let cardID = domElement.id;
                let partOfSpeechID = 'partOfSpeech' + cardID;
                let partOfSpeechDOM = document.getElementById(partOfSpeechID);
                let partOfSpeechText = partOfSpeechDOM.innerText;
                let number = Number(cardID.split('').pop())
                numbers.push(number);
                cards[number] = {
                    cardID: cardID,
                    partOfSpeechDOM: partOfSpeechDOM,
                    partOfSpeechText: partOfSpeechText,
                }
            }
            numbers.sort();
            function toggleHide(cardID) {
                let card = document.getElementById(cardID);
                card.classList.toggle('hide');
            }
            for (let currentCard in cards) {
                let currentCardNumber = Number(currentCard);
                let currentCardID = cards[currentCard].cardID;
                for (let number of numbers) {
                    if (number == currentCardNumber) { continue; }
                    let toCardID = cards[number].cardID;
                    let tooltip = document.createElement('p');
                    tooltip.className = 'tooltip-text';
                    tooltip.innerText = toCardID;
                    let button = document.createElement('span');
                    button.className = 'defintion-content part-of-speech button to-other-card'
                    button.id = 'to' + toCardID;
                    button.innerText = cards[number].partOfSpeechText;
                    button.addEventListener('click', (e) => {
                        toggleHide(currentCardID);
                        toggleHide(toCardID);
                    })
                    let domElement = cards[currentCard].partOfSpeechDOM;
                    domElement.after(button);
                    domElement.before(tooltip);
                }
            }
        }
    }
    test() {
        //run in setup to test current method that is work in progress
        console.log(this.word);
    }
}