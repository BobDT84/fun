function Player(){

    setAttemptID() {
        this.attemptID = 'attempt' + this.currentAttempt;
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
    /*
    SHOULD THIS BE INSIDE GAME??
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
    nextAttempt() {
        if (this.currentAttempt < this.maxAttempts) {
            if (this.fiveWordMode) { this.attemptsUsed++ }
            this.currentAttempt++;
            this.setAttemptID();
            this.playersGuess = [];
        }
    }
    */

}

export { Player };