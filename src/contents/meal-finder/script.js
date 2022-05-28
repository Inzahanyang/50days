const submit = document.getElementById("submit");
const search = document.getElementById("search");
const heading = document.getElementById("result-heading");
const meals = document.getElementById("meals");
const singleMeal = document.getElementById("single-meal");
const random = document.getElementById("random");

function getMeal(e) {
  e.preventDefault();
  singleMeal.innerHTML = "";
  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        heading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          heading.innerHTML = `<p>There are no meals. Try again!</p>`;
        } else {
          meals.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
        search.value = "";
      });
  } else {
    alert("Please enter a search term");
  }
}

function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addToMeal(meal);
    });
}

function randomMeal() {
  meals.innerHTML = "";
  heading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addToMeal(meal);
    });
}

function addToMeal(meal) {
  let ingredients = [];

  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
      <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

submit.addEventListener("submit", getMeal);
random.addEventListener("click", randomMeal);

meals.addEventListener("click", (e) => {
  const mealInfo = e.path.find((meal) => {
    if (meal.classList) {
      return meal.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
