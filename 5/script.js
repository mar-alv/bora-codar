let value = "0";
const numericKeys = "0123456789";
const operatorKeys = "%/x-+";

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") clearEntry();

  if (event.key === "c" || event.key === "Backspace") clearLast();

  if (event.key === "r") result();

  if (operatorKeys.includes(event.key)) addOperator(event.key);

  if (numericKeys.includes(event.key)) addNumber(event.key);
});

function clearEntry() {
  value = "0";

  updateResult("0");
  updateFormula("0");
}

function clearLast() {
  if (value.length === 1) clearEntry();
  else if (value.at(-2) === " " || isLastKeyAnOperator())
    value = value.slice(0, -2);
  else value = value.slice(0, -1);

  updateFormula(value);
}

function addNumber(number) {
  if (value === "0") {
    value = number;

    updateFormula(value);

    return;
  }

  value += isLastKeyAnOperator() ? ` ${number}` : number;

  updateFormula(value);
}

function isLastKeyAnOperator() {
  return operatorKeys.includes(value.at(-1));
}

function addOperator(operator) {
  if (cannotAddOperator()) return;

  value = `${value} ${operator}`;

  updateFormula(value);
}

function addComma() {
  if (isLastKeyAnOperator()) return;

  value += ",";
}

function changeSign() {
  const lastOperation = /([-+])\s*$/;
  const lastNumber = /([-+]?\d+(\.\d+)?)\s*$/;

  value = value
    .replace(lastOperation, (match) => (match === "+" ? "-" : "+"))
    .replace(lastNumber, (match) => -parseFloat(match));

  updateFormula(value);
}

function result() {
  const expression = value.replace(/,/g, ".");

  try {
    updateResult(eval(expression).toString());
    updateFormula("0");

    value = "0";
  } catch (error) {
    clearEntry();
  }
}

function cannotAddOperator() {
  return isLastKeyAnOperator() || (value === "0" && value.length === 1);
}

function updateResult(updatedResult) {
  [...document.getElementsByTagName("h1")][0].innerText = updatedResult;
}

function updateFormula(updatedFormula) {
  [...document.getElementsByTagName("h2")][0].innerText = updatedFormula;
}
