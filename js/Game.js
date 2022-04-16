import { Word } from './modules/Word.js';
import { Board } from './modules/Board.js';

const Game = (function (wordSize, maxAttempts, activatedModes = []) {
    document.addEventListener('DOMContentLoaded', init);
    let word,
        getNewWord,
        arrayOfWords,
        wordIndex,
        getNewRandomIndex;

    function init() {
        const wordObj = Word(wordSize);
        word = wordObj.word;
        arrayOfWords = wordObj.arrayOfWords;
        wordIndex = wordObj.wordIndex;
        getNewRandomIndex = wordObj.getNewRandomIndex;
        getNewWord = wordObj.getNewWord;
        let createBoard = Board();
        createBoard.newGameBoard(wordSize,maxAttempts);
        return wordObj;
    }
    let temp = init();

    return { word, arrayOfWords, wordIndex, getNewRandomIndex, getNewWord };
});

export { Game };

let log = console.log;
let ggg;
//ggg = Game(5, 6);

