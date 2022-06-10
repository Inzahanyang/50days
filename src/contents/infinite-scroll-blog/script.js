const postsContainer = document.getElementById("posts-container");
const loading = document.getElementById("loader");
const filter = document.getElementById("filter");

let limit = 7;
let page = 1;

const getData = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  const data = await res.json();
  return data;
};

const showBlogDOM = async () => {
  const posts = await getData();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");

    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="title">${post.title}</h2>
          <p class="body">${post.body}</p>
        </div>
    `;
    postsContainer.appendChild(postEl);
  });
};

const showLoading = () => {
  loading.classList.add("show");

  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showBlogDOM();
    }, 300);
  }, 1000);
};

const filterBlog = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".title").innerText.toUpperCase();
    const body = post.querySelector(".body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

showBlogDOM();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight > scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterBlog);
