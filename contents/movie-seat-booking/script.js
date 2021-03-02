const minari =
  "https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/a24-A24_Minari-Full-Image_GalleryBackground-en-US-1614247647057._SX2160_.jpg";

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const container = document.querySelector(".container");
const screen = document.querySelector(".screen");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  console.log(localStorage.getItem("selectedSeats"));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = ticketPrice * selectedSeatsCount;
};

// Get data from localsorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    +selectedMovieIndex === 0
      ? (screen.style.backgroundImage =
          "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/nbcu-89L57-Full-Image_GalleryBackground-en-US-1582838410350._SX1080_.jpg)")
      : +selectedMovieIndex === 1
      ? (screen.style.backgroundImage =
          "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/wb-2077491_6000120912-Full-Image_GalleryBackground-en-US-1596111305395._SX1080_.jpg)")
      : +selectedMovieIndex === 2
      ? (screen.style.backgroundImage =
          "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/disney-4931-Full-Image_GalleryBackground-en-US-1572504034682._SX1080_.jpg)")
      : +selectedMovieIndex === 3
      ? (screen.style.backgroundImage =
          "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/a24-A24_Minari-Full-Image_GalleryBackground-en-US-1614247647057._SX1080_.jpg)")
      : "";
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  +e.target.selectedIndex === 0
    ? (screen.style.backgroundImage =
        "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/nbcu-89L57-Full-Image_GalleryBackground-en-US-1582838410350._SX1080_.jpg)")
    : +e.target.selectedIndex === 1
    ? (screen.style.backgroundImage =
        "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/wb-2077491_6000120912-Full-Image_GalleryBackground-en-US-1596111305395._SX1080_.jpg)")
    : +e.target.selectedIndex === 2
    ? (screen.style.backgroundImage =
        "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/disney-4931-Full-Image_GalleryBackground-en-US-1572504034682._SX1080_.jpg)")
    : +e.target.selectedIndex === 3
    ? (screen.style.backgroundImage =
        "url(https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/a24-A24_Minari-Full-Image_GalleryBackground-en-US-1614247647057._SX1080_.jpg)")
    : "";
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});

updateSelectedCount();
