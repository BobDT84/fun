async function getDefinitionOf(word) {
    let apiAddress = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    let apiCallAddress = apiAddress + word;
    let response = await fetch(apiCallAddress);
    let data = await response.json()[0];
    let word = data.word;
    let phonetics = data.phonetic;
    let partOfSpeech = data.meanings[0].partOfSpeech;
    let definition = data.meanings[0].definitions[0].definition;
    /*
    past trial and error to learn my way around
    let logResponse = function(){console.log(response)};
    let logData = function(){console.log(data)};
    let word = data[0].word;
    let wordWait = await data[0].word;
    console.log(word);
    console.log(wordWait);
    console.log(data[0]);
    console.log(data[0].meanings);
    console.log(data[0].meanings[0].definitions[0].definition);
    console.log(data[0].word);
    */
}

getDefinition('manse');