const button = document.getElementsByTagName('button')[0];
const input = document.getElementsByTagName('input')[0];

button.disabled = true;

function handleSend() {
  input.value = '';
  button.disabled = true;
}

function handleEmailChange() {
  button.disabled = !input.value;
}

input.addEventListener('input', handleEmailChange);
    button.addEventListener('click', handleSend);
