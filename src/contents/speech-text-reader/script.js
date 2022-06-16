const main = document.querySelector("main");
const select = document.getElementById("select");
const text = document.getElementById("text");
const sendBtn = document.getElementById("send");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

const message = new SpeechSynthesisUtterance();

sendBtn.addEventListener("click", () => {
  message.text = text.value;
  speechSynthesis.speak(message);
});

data.forEach((item) => {
  const box = document.createElement("div");

  box.classList.add("box");

  const { image, text } = item;

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>  
  `;

  box.addEventListener("click", () => {
    message.text = text;
    speechSynthesis.speak(message);
  });

  main.appendChild(box);
});

let voices = [];

const getVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;

    option.innerText = `${voice.name} ${voice.lang}`;

    select.appendChild(option);
  });
};

speechSynthesis.addEventListener("voiceschanged", getVoices);

select.addEventListener("change", (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
});

getVoices();
