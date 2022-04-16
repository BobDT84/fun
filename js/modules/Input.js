function Input(){


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
        key.id = 'enter';
        key.innerText = 'Enter';
        key.onclick = () => { this.submitPlayersGuess(); };

        key.id = 'delete';
        key.innerText = 'Del';
        key.onclick = () => { this.deletePreviousLetter(); };
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



}

export { Input };