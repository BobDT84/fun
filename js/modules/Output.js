function Output(){



    addToPlayersGuess(text) {
        if (this.playing && this.playersGuess.length < this.wordSize) {
            this.playersGuess.push(text);
            this.displayPlayersGuess();
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

}

export { Output };