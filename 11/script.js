const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");

const button = [...document.getElementsByTagName("button")][0];

inputEmail.addEventListener("input", setButtonDisable);
inputPassword.addEventListener("input", setButtonDisable);

function handleTogglePassword() {
  const input = document.getElementById("input-password");
  const icon = [...document.getElementsByTagName("i")][0];

  const isInputTypePassword = input.type === "password";

  icon.className = isInputTypePassword ? "ph ph-eye" : "ph ph-eye-slash";
  input.type = isInputTypePassword ? "text" : "passowrd";
}

function setButtonDisable() {
  button.disabled = !inputEmail.value && !inputPassword.value;
}
