const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

let idx = 0;
let interval = setInterval(run, 2000);

function run() {
  idx++;
  changeDisplay();
}

function changeDisplay() {
  if (idx > img.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = img.length - 1;
  }
  imgs.style.transform = `translateX(${-idx * 700}px)`;
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 2000);
}

rightBtn.addEventListener("click", () => {
  idx++;
  changeDisplay();
  resetInterval();
});

leftBtn.addEventListener("click", () => {
  idx--;
  changeDisplay();
  resetInterval();
});
