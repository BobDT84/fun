function FiveWord() {

    setupFiveWordMode() {
        this.totalAttempts = Number(this.maxAttempts) * 5;
        this.attemptsUsed = 0;
        this.fiveWords = [];
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


}

export { FiveWord };