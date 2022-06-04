const musicContainer = document.getElementById("music-container");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const image = document.getElementById("image");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const songs = [
  "Alla-Turca",
  "Brandenburg-Concerto-no.-3-BWV-1048-Complete-Performance",
  "Handel-Xerxes-HWV-40",
  "Kevin_MacLeod_-_Canon_in_D_Major",
  "keys-of-moon-white-petals",
  "Piano-Concerto-no.-21-in-C-major-K.-467-II.-Andante",
];

let songIndex = 0;

const loadSong = (songs) => {
  const songName = songs.replaceAll("-", " ").replaceAll("_", " ").slice(0, 40);

  title.innerText = songName;
  image.src = `images/${songs}.jpg`;
  audio.src = `music/${songs}.mp3`;
};

const playSong = () => {
  musicContainer.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
};

const pauseSong = () => {
  musicContainer.classList.remove("play");
  play.querySelector("i.fas").classList.add("fa-play");
  play.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
};

const playNextSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const playPrevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;
};

const setProgress = (e) => {
  const width = progressContainer.clientWidth;

  const clickX = e.offsetX;

  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
};

play.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

next.addEventListener("click", playNextSong);
prev.addEventListener("click", playPrevSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", playNextSong);

loadSong(songs[songIndex]);
