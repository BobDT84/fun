function Definition() {

    //Some parts a redundant and can be abstracted to Popup
    //I'm sure there are things that repeat, and I need to polish the code

    showHideDefinition(cardID) {
        let card = document.getElementById(cardID);
        card.classList.toggle('hide');
    }
    async getDefinition(word = this.word) {
        this.clearDefinitionCards();
        let apiAddress = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
        let apiCallAddress = apiAddress + word;
        let response = await fetch(apiCallAddress, { method: 'GET', credentials: 'omit' });
        //credentials: 'omit' does not send or receive cookies
        let data = await response.json();
        console.log('API Definition Data');
        console.log(data);
        if (data.title == "No Definitions Found") { return }
        let i = 1;
        for (let object of data) {
            let cardID = 'card' + i.toString();
            i++;
            let apiWord = await object.word,
                phonetic = await object.phonetic,
                partOfSpeech = await object.meanings[0].partOfSpeech,
                definitions = await object.meanings[0].definitions;
            let phoneticAudio = false;
            if (await object.phonetics.length > 0) {
                let phoneticAudio = await object.phonetics[0].audio;
            }
            this.createDefinitionCard(cardID, apiWord, phonetic, phoneticAudio, partOfSpeech, definitions);
        }
        this.linkDefinitionCards();
    }
    firstTwoDefinitions(definitions) {
        let firstDefinition = "1.  " + definitions[0].definition;
        if (definitions.length < 2) { return [firstDefinition]; }
        let secondDefinition = "2.  " + definitions[1].definition;
        return [firstDefinition, secondDefinition];
    }
    clearDefinitionCards() {
        let cards = document.getElementsByClassName('definition-card');
        for (let card of cards) {
            card.remove();
        }
    }
    linkDefinitionCards() {
        let cardsByClassName = document.getElementsByClassName('definition-card');
        if (cardsByClassName.length > 1) {
            let cards = {};
            let numbers = [];
            for (let domElement of cardsByClassName) {
                let cardID = domElement.id;
                let partOfSpeechID = 'partOfSpeech' + cardID;
                let partOfSpeechDOM = document.getElementById(partOfSpeechID);
                let partOfSpeechText = partOfSpeechDOM.innerText;
                let number = Number(cardID.split('').pop())
                numbers.push(number);
                cards[number] = {
                    cardID: cardID,
                    partOfSpeechDOM: partOfSpeechDOM,
                    partOfSpeechText: partOfSpeechText,
                }
            }
            numbers.sort();
            function toggleHide(cardID) {
                let card = document.getElementById(cardID);
                card.classList.toggle('hide');
            }
            for (let currentCard in cards) {
                let currentCardNumber = Number(currentCard);
                let currentCardID = cards[currentCard].cardID;
                for (let number of numbers) {
                    if (number == currentCardNumber) { continue; }
                    let toCardID = cards[number].cardID;
                    let tooltip = document.createElement('p');
                    tooltip.className = 'tooltip-text';
                    tooltip.innerText = toCardID;
                    let button = document.createElement('span');
                    button.className = 'defintion-content part-of-speech button to-other-card'
                    button.id = 'to' + toCardID;
                    button.innerText = cards[number].partOfSpeechText;
                    button.addEventListener('click', (e) => {
                        toggleHide(currentCardID);
                        toggleHide(toCardID);
                    })
                    let domElement = cards[currentCard].partOfSpeechDOM;
                    domElement.after(button);
                    domElement.before(tooltip);
                }
            }
        }
    }

    createDefinitionCard(cardID, word, phonetic, phoneticAudio, partOfSpeech, definitions) {
        let card = document.createElement('div');
        card.id = cardID;
        card.className = 'definition-card popup-window hide';
        let header = document.createElement('h4');
        header.className = 'definition-content definition-header';
        header.innerHTML = `The word was ${this.word}.<br>Reference# ${this.randomIndex}`;
        //Reference for testing purposes, to remove words that don't work or are too difficult
        card.appendChild(header);

        if (cardID == 'card1') {
            card.classList.toggle('hide');
        }

        let definition = {
            word: ['p', 'definition-content defintion-word', word],
            phonetic: ['p', 'definition-content', phonetic],
            phoneticAudio: ['audio', 'definition-content phonetic-audio', phoneticAudio],
            partOfSpeech: ['span', 'defintion-content part-of-speech button no-click', partOfSpeech],
            definitions: ['div', 'definition-content defintions', this.firstTwoDefinitions(definitions)],
            reference: ['a', 'definition-content definition-api', 'Definition provided by dictionaryapi.dev/']
        }

        for (let id in definition) {
            let elementTag = definition[id][0],
                className = definition[id][1],
                content = definition[id][2],
                element = document.createElement(elementTag);
            if (!content) { continue; }
            element.className = className;
            element.id = id + cardID;
            if (id == 'phoneticAudio') {
                element.controls = true;
                element.src = content;
            } else if (id == 'definitions') {
                for (let definition of content) {
                    let p = document.createElement('p');
                    p.innerText = definition;
                    element.appendChild(p);
                }
            }
            else {
                element.innerText = content;
            }
            if (id == 'reference') {
                element.href = 'https://dictionaryapi.dev/';
            }
            card.appendChild(element);
        }
        let closeButton = document.createElement('div');
        closeButton.className = 'button definition-close';
        closeButton.id = 'closeButton' + cardID;
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', (e) => { this.showHideDefinition(e.path[1].id) });
        //Either change to card.remove() or add a feature to make the definition
        //card reappear after it is closed at the end of a game
        card.appendChild(closeButton);
        let layer = document.getElementById('layer1');
        layer.appendChild(card);
    }

}

export { Definition };