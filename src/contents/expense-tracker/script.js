const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const plus = document.getElementById("money-plus");
const minus = document.getElementById("money-minus");

const localItem = JSON.parse(localStorage.getItem("transactions"));

let transactions =
  localStorage.getItem("transactions") !== null ? localItem : [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter a text and amount");
  } else {
    const transaction = {
      id: Math.floor(Math.random() * 1000000),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateBalance();

    updateLocalstorage();

    text.value = "";
    amount.value = "";
    text.focus();
  }
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
        ${transaction.text} 
        <span>${sign}${Math.abs(transaction.amount)}</span> 
        <button class="delete-btn" onclick="deleteTransaction(${
          transaction.id
        })">x</button>
    `;

  list.appendChild(item);
}

function updateBalance() {
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  plus.innerText = `$${income}`;
  minus.innerText = `$${expense}`;
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalstorage();

  init();
}

function updateLocalstorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);

  updateBalance();
}

init();

form.addEventListener("submit", addTransaction);
