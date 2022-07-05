// for (let i = 0; i < 5 * 3; i++) {
//   const img = document.createElement("img");
//   img.src = `https:/source.unsplash.com/random/${
//     Math.floor(Math.random() * 10) + 300
//   }x${Math.floor(Math.random() * 10) + 300}`;
//   document.querySelector(".container").appendChild(img);
// }

const container = document.querySelector(".container");
const sourceURL = "https:/source.unsplash.com/random/";
const rows = 5;

const getRandomNr = () => {
  return Math.floor(Math.random() * 10) + 300;
};

const getRandomSize = () => {
  return `${getRandomNr()}x${getRandomNr()}`;
};

for (let i = 0; i < rows * 3; i++) {
  const img = document.createElement("img");
  img.src = `${sourceURL}${getRandomSize()}`;
  container.appendChild(img);
}
