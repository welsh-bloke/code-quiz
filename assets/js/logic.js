const startScreen = document.querySelector('#start-screen');
const timer = document.querySelector('#time');
const feedback = document.querySelector('#feedback');
const startQuizBtn = document.querySelector('#start');
const questionsDiv = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-title');
const choicesContainer = document.querySelector('#choices');
const buttons = Array.from(choicesContainer.children);

let time = 90;

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

let currentQuestionIndex = 0;
let currentQuestion = questions[currentQuestionIndex];

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
const prependZero = (num, targetLength) => {
  return num.toString().padStart(targetLength, 0);
}

// const handleAnwerChosen = (e) => {
//   console.log(e.target.dataset.index);

// }

const countdown = () => {
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  timer.textContent = `${prependZero(minutes, 2)}: ${prependZero(seconds, 2)}`;
  time--;
}

startQuizBtn.addEventListener('click', () => {
  interval = setInterval(countdown, 1000);
  startScreen.className = 'hide';
  questionsDiv.className = 'show';

  questionTitle.textContent = currentQuestion.title;

  for (let j = 0; j < buttons.length; j++) {
    let button = buttons[j];
    button.textContent = currentQuestion.options[j];
    button.addEventListener('click', (e) => {
      let answerIndex = e.target.dataset.index;
      let chosenAnswer = e.target.dataset.index;
      let correctAnswer = currentQuestion.correctAnswerIndex;

      feedback.className = 'show';

      chosenAnswer === correctAnswer ? feedback.textContent = 'Correct answer' : feedback.textContent = 'Wrong answer';
      console.log(chosenAnswer, correctAnswer);
    });
  }
})

console.log(questions);
console.log(currentQuestionIndex);
console.log(buttons.length);
// game over function when user options the final question or timer reaches 0
// clearInterval(interval);
// time variable is going to be the user's score
// after answering a question, inctement the currentQuestion - currentQuestion++
// Place the question text within a button
