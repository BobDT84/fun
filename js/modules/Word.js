function Word(wordSize) {
    //document.addEventListener('DOMContentLoaded', Words.init);

    const arrayOfWords = setArrayOfWords(wordSize);
    const arrayLength = arrayOfWords.length;
    let wordIndex = getRandomIndex(arrayLength);
    let word = getWord(wordSize);
    let words = fetchArray(wordSize);
    let fword = fetchWord(wordSize);

    function setArrayOfWords(wordSize) {
        let array, string;
        let path = '../../words/words' + wordSize.toString() + '.csv'
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', path, false);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
            string = xmlhttp.responseText;
        }
        return string.split(',');
    }

    async function fetchArray(wordSize) {
        let path = '../../words/words' + wordSize.toString() + '.csv'
        let response = await fetch(path);
        let string = await response.text()
        let array;
        let b = () => { return string.split(',') };
        return await b();
    }

    function getRandomIndex(max) {
        if (max > 0) {
            return Math.floor(Math.random() * max); //generate a random number between 0 and max
        }
    }

    function getNewRandomIndex() {
        return getRandomIndex(arrayLength);
    }

    function getWord(wordSize) {
        return arrayOfWords[wordIndex].toUpperCase();
    }

    function getNewWord(index) {
        return (function () { return arrayOfWords[index].toUpperCase() })();
    }

    async function fetchWord(wordSize) {
        return await words[wordIndex];
    }
    return {
        getNewWord,
        getNewRandomIndex,
        word,
        arrayOfWords,
        wordIndex,
    }
}

export { Word };
