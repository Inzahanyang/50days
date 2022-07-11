const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeopleKR = [
  "서정진",
  "이재용",
  "김정주",
  "김범수",
  "권혁빈",
  "홍라희",
  "정몽구",
  "이부진",
  "서경배",
  "이서현",
];

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];

let dragStartIndex;

const checkOrder = () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeopleKR[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
};

const swapItems = (startIdx, endIdx) => {
  const itemOne = listItems[startIdx].querySelector(".draggable");
  const itemTwo = listItems[endIdx].querySelector(".draggable");

  listItems[startIdx].appendChild(itemTwo);
  listItems[endIdx].appendChild(itemOne);
};

const dragStart = (e) => {
  dragStartIndex = +e.target.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
};
const dragEnter = (e) => {
  e.target.closest("li").classList.add("over");
};
const dragLeave = (e) => {
  e.target.closest("li").classList.remove("over");
};
const dragOver = (e) => {
  e.preventDefault();
};
const dragDrop = (e) => {
  const dragEndIndex = +e.target.closest("li").getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  e.target.closest("li").classList.remove("over");
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) =>
    draggable.addEventListener("drag", dragStart)
  );
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
};

const createList = () => {
  [...richestPeopleKR]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.style.display = "flex";

      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
              <a class="a-tag" href="https://namu.wiki/w/${person}" target="_blank">
                <p class="person-name">${person}</p>
              </a>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

createList();
check.addEventListener("click", checkOrder);
