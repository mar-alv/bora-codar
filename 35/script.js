let interval = null;
let minuteCounter = 60;
let hoursCounter = 3600;
const amountPerTimer = document.getElementById("amount-per-timer");
const dailyMeta = document.getElementById("daily-meta");
const timerInputs = [...document.querySelectorAll('input[type="number"]')];
const timerButton = document.getElementById("timer-btn");

timerInputs.forEach((i) => {
  i.addEventListener("keydown", (e) => {
    const key = e.key;

    if (isNaN(key) && key !== "Backspace" && key !== "Delete")
      e.preventDefault();
  });

  i.addEventListener("input", () => {
    const maxValue = parseInt(i.getAttribute("max"), 10) || Infinity;
    let newValue = i.value.replace(/\D/g, "");

    newValue = Math.min(parseInt(newValue, 10), maxValue);

    i.value = newValue < 10 ? `0${newValue}` : newValue;
    i.dataset.initialValue = newValue < 10 ? `0${newValue}` : newValue;

    if (!i.value) {
      i.value = "00";
      i.dataset.initialValue = "00";
    }

    toggleTimerButtonDisabled();
  });
});

function toggleTimerButtonDisabled() {
  timerButton.disabled =
    timerInputs[1].value === "0" || timerInputs[1].value === "00";
}

function handleTimer() {
  interval ? handlePause() : handleStart();
}

function handlePause() {
  clearInterval(interval);
  toggleInputsDisabled();

  interval = null;
  timerButton.innerHTML = 'Começar <i class="ph ph-caret-right"></i>';
}

function toggleInputsDisabled() {
  const inputs = [...document.querySelectorAll("input")];

  inputs.forEach((i) => {
    i.disabled = !i.disabled;
  });
}

function handleStart() {
  timerButton.innerHTML = 'Pausar <i class="ph ph-pause"></i>';

  let hoursLeft = parseInt(timerInputs[0].value);
  let minutesLeft = parseInt(timerInputs[1].value);

  interval = setInterval(() => {
    if (!hoursLeft && !minutesLeft) onTimerEnd();
    else {
      hoursCounter--;
      minuteCounter--;
    }

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
  }, 1000);

  toggleInputsDisabled();
}

function updateTimer(timer, time) {
  timer.value = `${time < 10 ? "0" : ""}${time}`;
}

function onTimerEnd() {
  clearInterval(interval);
  increaseDailyMeta();
  resetTimer();
  toggleInputsDisabled();
  toggleModal();
  updatePercentage();
  timerButton.innerHTML = 'Começar <i class="ph ph-caret-right"></i>';

  interval = null;
}

function toggleModal() {
  const modal = document.querySelector("dialog");
  const isModalOpen = modal.dataset.open === "true";

  modal.dataset.open = isModalOpen ? "false" : "true";
}

function resetTimer() {
  timerInputs.forEach((i) => {
    i.value = i.dataset.initialValue;
  });
}

function updatePercentage() {
  const percentage = document.getElementById("percentage");

  percentage.innerText = formatPercentage();
}

function formatPercentage() {
  const percentage = (parseInt(dailyMeta.value) * 100) / 3000;

  return `${percentage.toFixed(0)}%`;
}

function increaseDailyMeta() {
  dailyMeta.value = parseInt(dailyMeta.value) + parseInt(amountPerTimer.value);
}

function updateAmountValue() {
  const amountValue = document.getElementById("amount-value");
  amountValue.innerText = `${amountPerTimer.value}ml`;
}
