let interval = null;
let minuteCounter = 60;
let hoursCounter = 3600;
const timerInputs = [...document.querySelectorAll('input[type="number"]')];
const timerButton = document.querySelector('#timer-btn');

// TODO: More animation on buttons and input hover
// TODO: Add mask of 00:01 to inputs
timerInputs.forEach((i) => {
  i.addEventListener("keydown", (e) => {
    const key = e.key;

    if (isNaN(key) && key !== "Backspace" && key !== "Delete")
      e.preventDefault();
  });

  i.addEventListener("input", () => {
    let newValue = i.value.replace(/\D/g, "");
    const maxValue = parseInt(i.getAttribute("max"), 10) || Infinity;
    newValue = Math.min(parseInt(newValue, 10), maxValue);
    i.value = newValue;

    if (!i.value) i.value = "0";
  });
});

function handleTimer() {
  interval ? handlePause() : handleStart();
}

function handleStart() {
  timerButton.innerHTML = 'Pausar <i class="ph ph-pause"></i>';

  let hoursLeft = parseInt(timerInputs[0].value);
  let minutesLeft = parseInt(timerInputs[1].value);

  interval = setInterval(() => {
    if (!hoursCounter) {
      hoursLeft--;
      hoursCounter = 3600;

      updateTimer(timerInputs[0], hoursLeft);
    }

    if (!minuteCounter) {
      minutesLeft--;
      minuteCounter = 60;

      updateTimer(timerInputs[1], minutesLeft);
    }

    if (!hoursLeft && !minutesLeft) {
      // TODO: Create function onTimerEnd() and handle there whats below, daily meta increase, inputs disabled, percentage and "Meta: 3L"
      clearInterval(interval);
      toggleModal();

      interval = null;
    } else {
      hoursCounter--;
      minuteCounter--;
    }

    console.log(hoursLeft + ':' + minutesLeft, minuteCounter);
  }, 1000);

  toggleInputsDisabled();
}

function handlePause() {
  clearInterval(interval);
  toggleInputsDisabled();
  
  interval = null;
  timerButton.innerHTML = 'Começar <i class="ph ph-caret-right"></i>';
}

function updateTimer(timer, time) {
  timer.value = time;
}

function toggleModal() {
  const modal = document.querySelector("dialog");
  const isModalOpen = modal.dataset.open === "true";

  modal.dataset.open = isModalOpen ? "false" : "true";
}

function toggleInputsDisabled() {
  const inputs = [...document.querySelectorAll("input")];

  inputs.forEach((i) => {
    i.disabled = !i.disabled;
  });
}
