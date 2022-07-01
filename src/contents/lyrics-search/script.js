const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

const getMoreSong = async (url) => {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  console.log(res);
  const data = await res.json();
  console.log(data);
};

const showSongs = (data) => {
  result.innerHTML = `
      <ul class="songs">
        ${data.data
          .map(
            (song) => `
        <li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Lyrics</button>
          </li>
        `
          )
          .join("")}
      </ul>
    `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSong('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSong('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    more.innerHTML = "";
  }
};

const getSong = async (term) => {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showSongs(data);
};

const getLyrics = async (artist, song) => {
  const res = await fetch(`${apiURL}/v1/${artist}/${song}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${song}</h2>
    <span>${lyrics}</span>
  `;

  more.innerHTML = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const term = search.value.trim();

  if (!term) {
    alert("Please enter artist or song name...");
  } else {
    getSong(term);
  }
});

result.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const song = clickedEl.getAttribute("data-title");

    getLyrics(artist, song);
  }
});
