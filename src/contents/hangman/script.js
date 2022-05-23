const wordEl = document.getElementById("word");
const wrongWordEl = document.getElementById("wrong-letters");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playBtn = document.getElementById("play-button");
const figureParts = document.querySelectorAll(".figure-part");
const notification = document.getElementById("notification-container");

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctWords = [];
const wrongWords = [];

function displayWord() {
  console.log(selectedWord);
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (word) =>
        `<span class="letter">
            ${correctWords.includes(word) ? word : ""}
        </span>`
    )
    .join("")}
  `;

  const innerText = wordEl.innerText.replace(/\n/g, "");
  if (innerText === selectedWord) {
    finalMessage.innerText = "Congratulation! You Won! 😍";
    popup.style.display = "flex";
  }
}

function updateWrongLetters() {
  wrongWordEl.innerHTML = `
  ${wrongWords.length > 0 ? `<p>Wrong</p>` : ""}
  ${wrongWords.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, idx) => {
    const errors = wrongWords.length;

    console.log(idx, errors);
    if (idx < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongWords.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately You Lost!! 😒";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => notification.classList.remove("show"), 2000);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctWords.includes(letter)) {
        correctWords.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongWords.includes(letter)) {
        wrongWords.push(letter);
        updateWrongLetters();
      } else {
        showNotification();
      }
    }
  }
});

playBtn.addEventListener("click", () => {
  correctWords.splice(0);
  wrongWords.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLetters();

  popup.style.display = "none";
});

displayWord();
