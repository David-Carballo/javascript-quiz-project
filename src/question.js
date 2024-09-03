class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)
    constructor(text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty; //a number between 1 and 3, with 1 being the easiest and 3 being the hardest
    }

    shuffleChoices() {
        this.choices.sort((choice1, choice2)=>{
            return Math.floor(Math.random()*3) -1;
        });
    }
}

