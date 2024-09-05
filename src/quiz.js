class Quiz {
    // YOUR CODE HERE:
    //
    // 1. constructor (questions, timeLimit, timeRemaining)
    constructor (questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }
    // 2. getQuestion() Returns the question from the questions array at the position of currentQuestionIndex
    getQuestion(){
        return this.questions[this.currentQuestionIndex];
    }
    
    // 3. moveToNextQuestion() When called, increments the currentQuestionIndex by 1.
    moveToNextQuestion(){
        
        this.currentQuestionIndex++;
    }
    // 4. shuffleQuestions() Shuffles the elements stored in the questions array of the Quiz.
    shuffleQuestions(){
        this.questions.sort((question1, question2) => {
            return Math.floor(Math.random()*3) -1;
        });
    }

    // 5. checkAnswer(answer) Checks if the passed answer is correct for the current question and increments correctAnswers by 1 if the answer is correct.
    checkAnswer(answer){
        if(answer === this.questions[this.currentQuestionIndex].answer){
            this.correctAnswers+=1;
            return true;
        }
    }

    // 6. hasEnded() Returns true if the quiz has ended (the last question has been answered), and false otherwise
    hasEnded() {
        if(this.currentQuestionIndex < this.questions.length) return false;
        else if (this.currentQuestionIndex === this.questions.length) return true;
    }

    // 7. filterQuestionsByDifficulty(difficulty) Filters the questions array by the difficulty level passed as an argument.
    filterQuestionsByDifficulty(difficulty){
        if(difficulty >= 1 && difficulty <= 3) {
            // array.filter(elemento => condición)
            this.questions = this.questions.filter((question) => question.difficulty === difficulty);
        }
    }

    //8. You should use the reduce() method to sum the difficulty of all the questions and then divide the sum by the number of questions to get the average difficulty.
    averageDifficulty(){
        // array.reduce( funcion, valor inicial)
        // array.reduce( (acumulador, elemento) => acumulador + elemento, valor inicial )
        let totalDifficulty = this.questions.reduce((accumulator, question) => accumulator + question.difficulty, 0);
        //console.log(totalDifficulty);
        return totalDifficulty/this.questions.length;
    }

}

