const cardsContainer = document.getElementById("cards-container");
const currentEl = document.getElementById("current");
const showEl = document.getElementById("show");
const hideEl = document.getElementById("hide");
const addContainer = document.getElementById("add-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const clearBtn = document.getElementById("clear");
const addCard = document.getElementById("add-card");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const deleteCard = document.getElementById("delete-card");

let currentActive = 0;
const cardEl = [];

const getCardsData = () => {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
};

const cardsData = getCardsData();

const setCardsData = (data) => {
  localStorage.setItem("cards", JSON.stringify(data));
  window.location.reload();
};

const updateCurrent = () => {
  currentEl.innerText = `${currentActive + 1} / ${cardsData.length}`;
};

const createCard = (data, idx) => {
  const card = document.createElement("div");
  card.classList.add("card");
  if (idx === 0) {
    card.classList.add("active");
  }

  deleteCard.innerHTML = '<i class="fas fa-trash-arrow-up"></i>';
  card.innerHTML = `  
    <div id="popopo" class="inner-card">
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

  cardsContainer.appendChild(card);

  updateCurrent();
};

const createCards = () =>
  cardsData.forEach((data, idx) => createCard(data, idx));

nextBtn.addEventListener("click", () => {
  cardEl[currentActive].className = "card left";
  currentActive++;
  if (currentActive + 1 > cardsData.length) {
    currentActive = 0;
  }

  cardEl[currentActive].className = "card active";

  updateCurrent();
});

prevBtn.addEventListener("click", () => {
  cardEl[currentActive].className = "card right";
  currentActive--;
  if (currentActive < 0) {
    currentActive = cardsData.length - 1;
  }

  cardEl[currentActive].className = "card active";

  updateCurrent();
});

showEl.addEventListener("click", () => addContainer.classList.add("show"));
hideEl.addEventListener("click", () => addContainer.classList.remove("show"));
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});

addCard.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";
    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

deleteCard.addEventListener("click", () => {
  const newCardsData = cardsData.filter((card, idx) => idx !== currentActive);
  setCardsData(newCardsData);
});

createCards();
