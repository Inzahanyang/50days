const panel = document.getElementById("panel");
const ratingsContainer = document.querySelector(".ratings-container");
const ratings = document.querySelectorAll(".rating");
const send = document.getElementById("send");
let selected = "Satisfied";

const removeActive = () => {
  for (let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove("active");
  }
};

ratingsContainer.addEventListener("click", (e) => {
  if (
    e.target.parentNode.classList.contains("rating") &&
    e.target.nextElementSibling
  ) {
    removeActive();
    e.target.parentNode.classList.add("active");
    selected = e.target.nextElementSibling.innerHTML;
  } else if (
    e.target.parentNode.classList.contains("rating") &&
    e.target.previousSibling &&
    e.target.previousElementSibling.nodeName === "IMG"
  ) {
    removeActive();
    e.target.parentNode.classList.add("active");
    selected = e.target.innerHTML;
  }
});

send.addEventListener("click", () => {
  panel.innerHTML = `
  <i class="fas fa-heart"></i>
  <strong>Thank You!</strong>
  <br>
  <strong>Feedback: ${selected}</strong>
  <p>We'll use your feedback to improve our<br> customer support</p>
`;
});
