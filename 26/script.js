const portions = document.querySelector("#portions");
const ingredientsAmount = [...document.querySelectorAll(".ingredients-amount")];
const countableNouns = [...document.querySelectorAll(".countable-noun")];

function handleDecreaseAmount() {
  const portionsValue = parseInt(portions.innerText);

  if (portionsValue === 1) return;

  const newPortionsValue = portionsValue - 1;

  setPortions(newPortionsValue);
  setIngredients(newPortionsValue);
  setPrepareMode(newPortionsValue);
}

function handleIncreaseAmount() {
  const portionsValue = parseInt(portions.innerText);

  const newPortionsValue = portionsValue + 1;

  setPortions(newPortionsValue);
  setIngredients(newPortionsValue);
  setPrepareMode(newPortionsValue);
}

function setPortions(portionsValue) {
  portions.innerText = portionsValue < 10 ? `0${portionsValue}` : portionsValue;
}

function setIngredients(portionsValue) {
  ingredientsAmount.forEach((i) => {
    i.innerText = portionsValue;
  });
}

function setPrepareMode(portionsValue) {
  const nounForm = portionsValue > 1 ? "data-plural" : "data-singular";

  countableNouns.forEach((i) => {
    i.innerText = i.getAttribute(nounForm);
  });
}
