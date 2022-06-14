const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameOverEl = document.getElementById("end-game-container");
const difficultyEl = document.getElementById("difficulty");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");

let randomWord;
let score = 0;
let time = 12;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

difficultyEl.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

text.focus();

const getRandomWord = async () => {
  const res = await fetch("https://random-word-api.herokuapp.com/word");
  const data = await res.json();
  return data[0];
};

const wordToDOM = async () => {
  randomWord = await getRandomWord();
  word.innerHTML = randomWord;
};

const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

const updateTime = () => {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

const gameOver = () => {
  gameOverEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  gameOverEl.style.display = "flex";
};

const timeInterval = setInterval(updateTime, 1000);

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    console.log(difficulty);

    e.target.value = "";
    wordToDOM();
    updateScore();

    if (difficulty === "hard") {
      time += 3;
    } else if (difficulty === "medium") {
      time += 4;
    } else {
      time += 6;
    }

    updateTime();
  }
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

wordToDOM();
