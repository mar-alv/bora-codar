const hour = document.getElementById("hour");

window.onload = function () {
  updateHour();
};

let hourTimer = setInterval(() => {
  updateHour();
}, 60000);

function updateHour() {
  const now = new Date();

  hour.innerText = `${now.getHours()}:${now.getMinutes()}`;
}

const watchSleepsWrapper = document.querySelector(".watch-sleeps");

watchSleepsWrapper.addEventListener("scroll", (e) => {
  const wrapperRect = watchSleepsWrapper.getBoundingClientRect();
  const watchSleeps = watchSleepsWrapper.querySelectorAll(".watch-sleep");

  let lastActiveIndex = -1;

  watchSleeps.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const isVisible =
      rect.top >= wrapperRect.top && rect.bottom <= wrapperRect.bottom;

    if (isVisible) {
      lastActiveIndex = index;
    }
  });

  watchSleeps.forEach((element, index) => {
    element.dataset.active = index === lastActiveIndex ? "true" : "false";
  });
});
