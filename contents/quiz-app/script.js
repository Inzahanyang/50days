const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const aText = document.getElementById("aText");
const bText = document.getElementById("bText");
const cText = document.getElementById("cText");
const dText = document.getElementById("dText");
const submitBtn = document.getElementById("submit");
const quiz = document.getElementById("quiz");

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
  answerEls.forEach((answerEl) => (answerEl.checked = false));

  questionEl.innerText = quizData[currentQuiz].question;
  aText.innerText = quizData[currentQuiz].a;
  bText.innerText = quizData[currentQuiz].b;
  cText.innerText = quizData[currentQuiz].c;
  dText.innerText = quizData[currentQuiz].d;
};

loadQuiz();

const getAnswerId = () => {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
};

submitBtn.addEventListener("click", () => {
  const answer = getAnswerId();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <button onclick="location.reload()">Reload</button>
      `;
    }
  }
});
