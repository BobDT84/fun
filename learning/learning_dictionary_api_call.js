/*
let apiAddress = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let word = 'house';
let apiCallAddress = apiAddress + word;
*/
async function getDefinitionOf(word) {
    let apiAddress = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    let apiCallAddress = apiAddress + word;
    console.log('getDefinitionOf running')
    let response = await fetch(apiCallAddress);
    let data = await response.json();
    let definitionObject = {};
    if(data[0]){
        console.log('there was data');
        let dataWord = await data[0].word;
        definitionObject.word = await data[0].word;
        definitionObject.phonetic = await data[0].phonetic;
        if(data[0].phonetics[0]){
            definitionObject.audioURL = await data[0].phonetics[0].audio;
        }
        if(data[0].meanings[0]){
            definitionObject.partOfSpeech = await data[0].meanings[0].partOfSpeech;

        }
        console.log(definitionObject);
        return await definitionObject;
    }
}

//Seems to always return a promise
let obj = getDefinitionOf('house');