const container = document.getElementById("container");
const color = [
  "#37E2D5",
  "#590696",
  "#C70A80",
  "#FBCB0A",
  "#00FFAB",
  "#14C38E",
  "#B8F1B0",
  "#E3FCBF",
];
const SQUARE = 500;

for (let i = 0; i < 500; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => setColor(square));
  square.addEventListener("mouseout", () => removeColor(square));

  container.appendChild(square);
}

function setColor(element) {
  const color = getRandomColor();

  element.style.background = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}
function removeColor(element) {
  element.style.background = "#1d1d1d";
  element.style.boxShadow = "0 0 2px #000";
}

function getRandomColor() {
  return color[Math.floor(Math.random() * color.length)];
}
