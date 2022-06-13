const result = document.getElementById("result");
const filter = document.getElementById("filter");
const listItems = [];

const getData = async () => {
  const res = await fetch("https://randomuser.me/api?results=10");
  const { results } = await res.json();

  result.innerHTML = "";

  results.forEach((user) => {
    const li = document.createElement("li");

    listItems.push(li);

    li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `;

    result.appendChild(li);
  });
};

getData();

const filtering = (term) => {
  listItems.forEach((list) => {
    if (list.innerText.toLowerCase().includes(term.toLowerCase())) {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  });
};

filter.addEventListener("input", (e) => filtering(e.target.value));
