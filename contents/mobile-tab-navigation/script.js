const listItems = document.querySelectorAll("nav ul li");
const contents = document.querySelectorAll(".content");

listItems.forEach((item, idx) => {
  item.addEventListener("click", () => {
    contents.forEach((content) => content.classList.remove("show"));
    listItems.forEach((item2) => item2.classList.remove("active"));

    item.classList.add("active");
    contents[idx].classList.add("show");
  });
});
