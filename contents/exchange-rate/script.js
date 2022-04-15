const currencyElOne = document.getElementById("currency-one");
const currencyElTwo = document.getElementById("currency-two");
const amountElOne = document.getElementById("amount-one");
const amountElTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/9d62ef979400d77b00ad9fcd/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountElTwo.value = (amountElOne.value * rate).toFixed(2);
    });
}

//Event listeners
currencyElOne.addEventListener("change", calculate);
currencyElTwo.addEventListener("input", calculate);
amountElOne.addEventListener("change", calculate);
amountElTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
  calculate();
});

calculate();
