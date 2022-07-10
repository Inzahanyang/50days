const form = document.getElementById("form");
const todosUL = document.getElementById("todos");
const input = document.getElementById("input");

const todos = JSON.parse(localStorage.getItem("todos"));

const updateLs = () => {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todo) => {
    todos.push({
      text: todo.childNodes[0].data,
      completed: todo.classList.contains("completed"),
      date: todo.lastChild.innerText,
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = (todo) => {
  let todoText = input.value;
  let todoDate = new Date().toLocaleString();

  if (todo) {
    todoText = todo.text;
    todoDate = todo.date;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLs();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLs();
    });

    todoEl.innerHTML = `${todoText} <br> <span>${todoDate}</span>`;

    todosUL.appendChild(todoEl);
    input.value = "";

    updateLs();
  }
};

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});
