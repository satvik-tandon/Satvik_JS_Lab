(function () {
  function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  function Question(questionText, choices, answer) {
    this.questionText = questionText;
    this.answer = answer;
    this.choices = choices;
  }

  Question.prototype.isCorrectAnswer = function (userAnswer) {
    return this.answer === userAnswer;
  };

  Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
  };

  Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
  };

  Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  };

  function loadQuestions() {
    if (quiz.isEnded()) {
      showScores();
    } else {
      var currentQuestion = quiz.getQuestionByIndex();

      // show question
      document.getElementById("question").innerHTML =
        currentQuestion.questionText;

      // show options
      currentQuestion.choices.forEach(function (choice, index) {
        var element = document.getElementById("choice" + index);
        element.innerHTML = choice;
        handleOptionButton("btn" + index, choice);
      });

      showProgress();
    }
  }

  function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
      quiz.checkOptionWithAnswer(choice);
      loadQuestions();
    };
  }

  function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    document.getElementById("progress").innerHTML =
      "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  }

  function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML +=
      "<h2>Your Scores: " +
      quiz.score +
      "<br><br>Marks percentage: " +
      (quiz.score / questions.length) * 100 +
      "%" +
      "</h2>";
    gameOverHTML += '<button id="backToQuiz">Back to Quiz</button>';

    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

    document.getElementById("backToQuiz").onclick = function () {
      location.reload();
    };
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  var questions = [
    new Question(
      "How can you detect the client's browser name?",
      [
        "browser.name",
        "client.navName",
        "navigator.appName",
        "browser.appName",
      ],
      "navigator.appName"
    ),
    new Question(
      'How do you write "Hello World" in an alert box?',
      [
        'alertBox("Hello World");',
        'alert("Hello World");',
        'msgBox("Hello World");',
        'msg("Hello World");',
      ],
      'alert("Hello World");'
    ),
    new Question(
      "How to write an IF statement in JavaScript?",
      ["if i == 5 then", "if i = 5 then", "if i = 5", "if (i == 5)"],
      "if (i == 5)"
    ),
    new Question(
      "Which event occurs when the user clicks on an HTML element?",
      ["onmouseover", "onclick", "onmouseclick", "onchange"],
      "onclick"
    ),
    new Question(
      "What is the correct way to write a JavaScript array?",
      [
        'var colors = ["red", "green", "blue"]',
        'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        'var colors = "red", "green", "blue"',
        'var colors = (1:"red", 2:"green", 3:"blue")',
      ],
      'var colors = ["red", "green", "blue"]'
    ),
  ];

  shuffleArray(questions);
  var quiz = new Quiz(questions);

  loadQuestions();
})();
