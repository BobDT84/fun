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
        Board(wordSize,maxAttempts).newGameBoard();
        return wordObj;
    }
    let temp = init();

    return { word, arrayOfWords, wordIndex, getNewRandomIndex, getNewWord };
});

let log = console.log;
let ggg = Game(5, 6);
console.log('gg');
console.log(ggg);
console.log(ggg.getNewWord(55));
console.log(ggg.getNewWord(55));
console.log(ggg.getNewWord(ggg.getNewRandomIndex()));
