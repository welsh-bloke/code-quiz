const questions = [
  {
    title: "When Gmail first launched, how much storage did it provide for your email?",
    options: ["1GB","512MB","5GB","Unlimited"],
    correctAnswerIndex: "0"
  },
  {
    title: "HTML is what type of language?",
    options: ["Macro Language","Markup Language","Programming Language","Scripting Language"],
    correctAnswerIndex: "1"
  },
  {
    title: "Which computer hardware device provides an interface for all other connected devices to communicate?",
    options: ["Central Processing Unit","Motherboard","Hard Disk Drive","Random Access Memory"],
    correctAnswerIndex: "1"
  },
  {
    title: "What is the domain name for the country Tuvalu?",
    options: [".tu",".tt",".tv",".tl"],
    correctAnswerIndex: "2"
  },
  {
    title: "How many kilobytes in one gigabyte (in decimal)?",
    options: ["1024","1000000","1000","1048576"],
    correctAnswerIndex: "1"
  }
]

// fetch the users array from local storage or or create an empty array
let users = JSON.parse(localStorage.getItem("users") || "[]");

const startScreen = document.querySelector('#start-screen');
const endScreen = document.querySelector('#end-screen');
const timer = document.querySelector('#time');
const feedback = document.querySelector('#feedback');
const startQuizBtn = document.querySelector('#start');
const questionsDiv = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-title');
const choicesContainer = document.querySelector('#choices');
const buttons = Array.from(choicesContainer.children);
const finalScore = document.querySelector('#final-score');
const enterInitialsInput = document.querySelector('#initials');
const enterInitialsSubmitButton = document.querySelector('#submit');

let time = 90;

let currentQuestionIndex = 0;

function play(url) {
  var audio = new Audio(url);
  audio.play();
}



// Event delagation
choicesContainer.addEventListener('click', (e) => {
  if (e.target.className === 'answerButton') {
    let chosenAnswer = e.target.dataset.index;
    let correctAnswer = questions[currentQuestionIndex].correctAnswerIndex;
    let answeredCorrectly = chosenAnswer === correctAnswer;

    if (!answeredCorrectly) {
      time -= 10;
      play('assets/sfx/incorrect.wav');
    } else {
      play('assets/sfx/correct.wav')
    }

    currentQuestionIndex++;

    feedback.className = 'show';
    answeredCorrectly ? feedback.textContent = 'Correct answer' : feedback.textContent = 'Wrong answer';

    setTimeout(() => {
      if (currentQuestionIndex < questions.length) {
        nextQuestion();
      } else {
        endGame();
      }
    }, "1000");
  }
})

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
const prependZero = (num, targetLength) => {
  return num.toString().padStart(targetLength, 0);
}

startQuizBtn.addEventListener('click', beginQuiz);

function beginQuiz() {
  interval = setInterval(countdown, 1000);
  startScreen.className = 'hide';
  questionsDiv.className = 'show';
  nextQuestion();
};

function countdown() {
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  timer.textContent = `${prependZero(minutes, 2)}: ${prependZero(seconds, 2)}`;
  time--;

  if (time < 1) {
    endGame();
  }
}

function nextQuestion() {
  feedback.className = 'hide';
  showQuestion();
}

function showQuestion() {
    questionTitle.textContent = questions[currentQuestionIndex].title;

    for (let j = 0; j < buttons.length; j++) {
      let button = buttons[j];
      button.textContent = questions[currentQuestionIndex].options[j];
    }
}

function endGame() {
  questionsDiv.className = 'hide';
  feedback.className = 'hide';
  endScreen.className = 'show';
  finalScore.textContent = `${time} seconds`
  clearInterval(interval);
  timer.textContent = time;
}

enterInitialsSubmitButton.addEventListener('click', () => {
  let initials = enterInitialsInput.value;
  console.log(initials.length);
  if (initials === '') {
    alert('Please enter your initials');
    return;
  }

  if (initials.length > 3) {
    alert('Your initials cannot exceet 3 characters');
    return;
  }

  users.push({initials: enterInitialsInput.value, score: time});
  localStorage.setItem("users", JSON.stringify(users));

  console.log(users);
  window.location.href = "highscores.html";
})
