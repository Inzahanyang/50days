const cardContainer = document.getElementById("cards-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const addContainer = document.getElementById("add-container");

const cardsData = [
  {
    question: "What must a variable begin with?",
    answer: "A Letter, $ or _",
  },
  {
    question: "What is a variable?",
    answer: "Container for a piece of data",
  },
  {
    question: "Example of Case Sensitive Variable",
    answer: "thisIsAVariable",
  },
];

const cardEl = [];

cardsData.forEach((data, idx) => {
  const card = document.createElement("div");

  card.classList.add("card");

  if (idx === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  cardEl.push(card);

  cardContainer.appendChild(card);
});

let currentActiveCard = 0;

nextBtn.addEventListener("click", () => {
  cardEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardEl.length - 1) {
    currentActiveCard = cardEl.length - 1;
  }
  cardEl[currentActiveCard].className = "card active";
});

prevBtn.addEventListener("click", () => {
  cardEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardEl[currentActiveCard].className = "card active";
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));
