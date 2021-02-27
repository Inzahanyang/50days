const leftContainer = document.querySelector(".split.left");
const rightContainer = document.querySelector(".split.right");
const container = document.querySelector(".container");

leftContainer.addEventListener("mouseenter", () =>
  container.classList.add("hover-left")
);
leftContainer.addEventListener("mouseleave", () =>
  container.classList.remove("hover-left")
);

rightContainer.addEventListener("mouseenter", () =>
  container.classList.add("hover-right")
);
rightContainer.addEventListener("mouseleave", () =>
  container.classList.remove("hover-right")
);
