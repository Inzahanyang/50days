const toggles = document.querySelectorAll(".toggle");
const good = document.getElementById("good");
const cheap = document.getElementById("cheap");
const fast = document.getElementById("fast");

toggles.forEach((toggle) =>
  toggle.addEventListener("change", (e) => someFunc(e.target))
);

function someFunc(clickedOne) {
  if (good.checked && cheap.checked && fast.checked) {
    if (clickedOne === good) {
      fast.checked = false;
    }
    if (clickedOne === cheap) {
      good.checked = false;
    }
    if (clickedOne === fast) {
      cheap.checked = false;
    }
  }
}
