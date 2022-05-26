const submit = document.getElementById("submit");
const search = document.getElementById("search");
const heading = document.getElementById("heading");
const meals = document.getElementById("meals");

function getMeal(e) {
  e.preventDefault();
  const term = search.value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.meals === null) {
        heading.innerHTML = `<p>There are no meals. Try again!</p>`;
      } else {
        heading.innerHTML = `<h2>Search results for '${term}:'</h2>`;

        meals.innerHTML = `
          ${data.meals
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
            .join("")}
        `;
      }
      search.value = "";
    });
}

submit.addEventListener("submit", getMeal);
