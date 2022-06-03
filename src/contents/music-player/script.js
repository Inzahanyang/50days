const musicContainer = document.getElementById("music-container");
const play = document.getElementById("play");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const image = document.getElementById("image");

const songs = [
  "Alla-Turca",
  "Brandenburg-Concerto-no.-3-BWV-1048-Complete-Performance",
  "Handel-Xerxes-HWV-40",
  "Kevin_MacLeod_-_Canon_in_D_Major",
  "keys-of-moon-white-petals",
  "Piano-Concerto-no.-21-in-C-major-K.-467-II.-Andante",
];

let songIndex = 5;

play.addEventListener("click", () => {
  title.innerText = songs[songIndex];
  image.src = `images/${songs[songIndex]}.jpg`;
  audio.src = `music/${songs[songIndex]}.mp3`;

  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});
