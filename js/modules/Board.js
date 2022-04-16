function Board(wordSize, maxAttempts) {
    const GAME = document.getElementById('game');
    const KEYBOARD = document.getElementById('keyboard');

    function newGameBoard(wordSize, maxAttempts) {
        console.log('new game board');
        if (isCorrectAttemptSetup && isCorrectLetterSetup) {
            clearBoard(GAME);
            clearBoard(KEYBOARD);
            setupGameBoard(wordSize, maxAttempts);
            setupKeyboard();
            setupEnterDelete();
        }

    }
    function isCorrectLetterSetup() {
        if (wordSize < 4 || wordSize > 8) {
            alert('letter count not set properly');
            return false;
        }
        return true;
    }
    function isCorrectAttemptSetup() {
        if (maxAttempts < 2 || maxAttempts > 10) {
            alert('Attempt count not set properly');
            return false;
        }
        return true;
    }

    function setupGameBoard(wordSize, maxAttempts) {
        let attemptRowDiv, letterDiv, attemptID;
        console.log('setup game board');
        for (let i = 0; i < maxAttempts; i++) {
            attemptID = 'attempt' + i.toString();
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
            GAME.appendChild(attemptRowDiv);
            console.log(i);
        }
        let message = document.createElement('div');
        message.id = 'message';
        GAME.appendChild(message);
    }

    function setupKeyboard() {
        let keyboard = document.querySelector('#keyboard');
        clearBoard(keyboard);
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

    function setupEnterDelete() {
        let row3 = document.querySelector('#row3');
        let key = document.createElement('div');

        key.id = 'enter';
        key.innerText = 'Enter';
        key.onclick = () => { submitPlayersGuess(); };
        row3.appendChild(key);

        key = document.createElement('div');
        key.id = 'delete';
        key.innerText = 'Del';
        key.onclick = () => { deletePreviousLetter(); };
        row3.appendChild(key);
    }

    function addKeyPressListeners() {
        document.onkeydown = (e) => { handleKeyPress(e.key.toUpperCase()) };
    }

    function addKeyClickListeners() {
        let keys = document.getElementsByClassName('key');
        for (let key of keys) {
            key.onclick = (e) => {
                let letter = e.path[0].innerText;
                addToPlayersGuess(letter);
            };
        }
    }

    function clearBoard(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    return {
        newGameBoard,
    }
}

export { Board };