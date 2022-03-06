const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = `0`;

  const updateCounter = (a) => {
    const target = +counter.getAttribute("data-target");
    const c = +counter.innerHTML;

    const increment = target / 200;

    if (c < target) {
      console.log((counter.innerText = `${Math.ceil(c + increment)}`));
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
