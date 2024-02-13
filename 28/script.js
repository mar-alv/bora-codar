const input = document.querySelector("input");
const submitButton = document.querySelector("#submit-button");

input.addEventListener("input", (event) => {
  submitButton.disabled = !event.target.value;
});
