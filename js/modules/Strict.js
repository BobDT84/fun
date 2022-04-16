function Strict() {
    //Might keep strict separate, or consolidate it into Guess.  Not sure at the moment

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


}

export { Strict };