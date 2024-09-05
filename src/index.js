document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");
  const hintButton = document.querySelector("#hintButton");
  const hint2Button = document.querySelector("#hint2Button");
  const questionHint = document.querySelector("#hint2 p");
  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    //  (text, choices, answer, difficulty)

    new Question(
      "¿Qué alimento es la verdadera debilidad de Jorge?",
      ["Patata", "Aguacate", "Tomate", "Manzana"],
      "Patata",
      1,
      "La respuesta a todo, según Jorge: patatas, patatas y más patatas."
    ),
    new Question(
      "¿Cuál es el mejor momento de un día en Ironhack?",
      [
        "El café de las 10:30",
        "Cada vez que Jorge dice -Patata-",
        "Las clases de DOM",
        "Las 18:00 de la tarde",
      ],
      "las 18:00 de la tarde",
      1,
      "Ese punto del día donde todos estamos en modo 'supervivencia'."
    ),
    new Question(
      "¿Cuál es la edad real de Jorge, esa que siempre evita decirnos?",
      ["18", "undefined", "73", "54"],
      "undefined",
      1,
      "Parece que incluso en la base de datos, su edad sigue siendo un misterio"
    ),
    new Question(
      "¿Quién se lleva el título de 'Mejor Sombrero del Año'?",
      ["Jesús", "Perro de Diego", "Pedro", "Sofía", "Cubo de Rubik de Clara"],
      "Jesús",
      1,
      "Cuando te confunden con un espía, pero solo es estilo extremo."
    ),
    new Question(
      "¿Cuál es la serie que tiene un altar en casa de Jorge?",
      ["Naruto", "The Office", "Friends", "Perdidos"],
      "Naruto",
      1,
      "Los adultos también vemos dibujitos"
    ),
    new Question(
      "¿Cómo planea Javi revolucionar su peinado la semana que viene?",
      ["Rosa chicle", "Arcoiris", "Se va a rapar", "Verde fosforito"],
      "Se va a rapar",
      1,
      "A veces, un cambio drástico es justo lo que hace falta."
    ),
    new Question(
      "¿Quién es el miembro más misterioso del grupo?",
      ["Cristina", "Pedro", "Alejandro", "Ángela"],
      "Cristina",
      1,
      "Siempre presente, pero con un toque de enigma."
    ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  let minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer = setInterval(() => {
    quiz.timeRemaining -= 1;

    minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    // console.log(quiz.timeRemaining)
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    if (quiz.timeRemaining === 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  restartButton.addEventListener("click", restartButtonHandler);

  hintButton.addEventListener("click", hintButtonHandler);
  hint2Button.addEventListener("click", hint2ButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results
  // restarButtonHandler()- Handles the click on the restart button

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }
    
    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text;
    // console.log(question);

    // 2. Update the orange progress bar
    // Update the orange progress bar (div#progressBar) width so that it shows the percentage of questions answered

    //console.log(quiz.questions.length);
    progressBar.style.width =
      (quiz.currentQuestionIndex / quiz.questions.length) * 100 + "%"; // This value is hardcoded as a placeholder

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`; //  This value is hardcoded as a placeholder

    //console.log(questionCount.innerText);
    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    // console.log(question.choices);
    question.choices.forEach((choice) => {
      // console.log(question.choices[choice-1]);
      let divChoices = document.createElement("div");
      choiceContainer.append(divChoices);
      divChoices.innerHTML += `<input type="radio" name="choice" value="${choice}">`;
      divChoices.innerHTML += `<label>${choice}</label>`;
    });
    questionHint.style.visibility = "visible";
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
  }

  function nextButtonHandler() {
    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    let selectedAnswer = document.querySelectorAll("#choices div input"); // A variable to store the selected answer value

    console.log(selectedAnswer);
    selectedAnswer.forEach((input) => {
      //Input es cada respuesta
      if (input.checked === true) {
        quiz.checkAnswer(input.value);
        quiz.moveToNextQuestion();
        questionHint.innerText = "";
        questionHint.style.visibility = "hidden";
        showQuestion();
      }
    });
  }

  function hintButtonHandler() {
    quiz.timeRemaining -= 10;
    console.log("PISTA");
    // No esconder la correcta y una random

    // Tenemos toda la lista con los inputs de cada answer
    const divChoicesList = choiceContainer.querySelectorAll("div");

    let remove = 0;

    divChoicesList.forEach((divNode) => {
      //Respuesta correcta
      let correctAnswer = quiz.getQuestion().answer;

      let inputNode = divNode.querySelector("input");

      //input.value es cada respuesta de la pregunta
      if (inputNode.value !== correctAnswer && remove < 2) {
        divNode.remove();
        remove++;
      }
      timeRemainingContainer.style.color = "#FFAA5B";
      timeRemainingContainer.style.transition = "color 0.5s";

      setTimeout(() => {
        timeRemainingContainer.style.color = "#F4FFF8";
      }, 2000);
      hintButton.style.visibility = "hidden";
    });
  }

  
  function hint2ButtonHandler() {
    console.log(questionHint.innerHTML, questionHint, question.hint);
    questionHint.innerHTML = questions[quiz.currentQuestionIndex].hint;
    quiz.timeRemaining -= 20;
    timeRemainingContainer.style.color = "#FFAA5B";
    timeRemainingContainer.style.transition = "color 0.5s";

    hint2Button.style.visibility = "hidden";
    setTimeout(() => {
      timeRemainingContainer.style.color = "#F4FFF8";
    }, 2000);
  }

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)

    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
    clearInterval(timer);
  }


  
  function restartButtonHandler() {
    // Hide the end view
    endView.style.display = "none";
    // Show the quiz view
    quizView.style.display = "block";
    // Reset the quiz:
    //Reset the currentQuestionIndex to 0
    quiz.currentQuestionIndex = 0;
    // Reset the correctAnswers to 0
    quiz.correctAnswers = 0;
    // Shuffle the questions
    quiz.shuffleQuestions();

    // Reset timer
    quiz.timeRemaining = quizDuration;

    minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

    timeRemainingContainer.innerText = `${minutes}:${seconds}`;

    timer = setInterval(() => {
      quiz.timeRemaining -= 1;

      minutes = Math.floor(quiz.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

      console.log(quiz.timeRemaining);
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      if (quiz.timeRemaining === 0) {
        clearInterval(timer);
        showResults();
      }
    }, 1000);

    showQuestion();
    hintButton.style.visibility = "visible";
    hint2Button.style.visibility = "visible";
    questionHint.innerText = "";
    questionHint.style.visibility = "visible";
  }
});
