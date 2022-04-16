function Guess() {

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
    isCorrectLetter(guessLetter, index) {
        let word = this.word.split('');
        if (guessLetter == word[index]) { return true; } else { return false; }
    }
    isClose(guessLetter) {
        return this.word.includes(guessLetter);
    }

}

export { Guess };