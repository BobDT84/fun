class Game{
    constructor(){
        this.word = '';
        this.wordsArray = [];
        this.randomIndex ;
        this.rounds ;
        this.letters ;
    }
    isCorrectLetters(){
        if(this.letters < 4 || this.letters > 8){
            alert('letter count not set properly');
            return false;
        }
        return true;
    }
    isCorrectRounds(){
        if(this.rounds < 2 || this.rounds > 10){
            alert('Round count not set properly');
            return false;
        }
        return true;
    }
    setRandomIndex(max = this.wordsArray.length){
        this.randomIndex = Math.floor(Math.random() * max);
    }
    setArray() {
        if(this.isCorrectLetters() && this.isCorrectRounds()){
            let array,string;
            let path = './words/words' + this.letters.toString() + '.csv'
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', path, false);
            xmlhttp.send();
            if (xmlhttp.status==200) {
                string = xmlhttp.responseText;
            }
            array = string.split(',');
            this.wordsArray = array;
        } else {
            alert('did not set array');
        }
    }
    setWord(){
        if(this.wordsArray.length > 0 && this.randomIndex !== 'undefined'){
            this.word = this.wordsArray[this.randomIndex];
        } else {
            this.setRandomIndex();
            this.setArray();
            this.setWord();
            console.log('is setWord() stuck in a loop?');
        }
    }
    setupGameBoard(){
        if(this.isCorrectLetters() && this.isCorrectRounds()){
            let gameBoard = document.querySelector('#game');
            let round,letter;
            for(let i = 0; i<this.rounds; i++){
                round = document.createElement('div');
                round.id = 'round' + i.toString();
                round.className = 'round';
                for(let j = 0; j<this.letters; j++){
                    letter = document.createElement('div');
                    letter.id = 'letter' + j.toString();
                    letter.className = 'letter-block';
                    round.appendChild(letter);
                }
                gameBoard.appendChild(round);
            }
        }
    }
    setupGame(){
        this.setupGameBoard();
        this.setWord();
    }
}

let game = new Game();
game.letters = 5;
game.rounds = 6;
game.setupGame();

