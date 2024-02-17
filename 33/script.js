const username = document.querySelector("#username");
const generateButton = document.querySelector("#generate-button");

username.addEventListener("input", (e) => {
  generateButton.disabled = !e.target.value;
});

function handleGenerateTicket(event) {
  event.preventDefault();

  fetchUserInfo();
}

function fetchUserInfo() {
  const url = `https://api.github.com/users/${username.value}`;

  fetch(url)
    .then((response) => {
      console.log(response, url);
      if (!response.ok) {
        toggleError(true);
        throw new Error(`Failed to fetch user info: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      toggleError(false);
      renderImgAndName(data);
    })
    .catch((error) => {
      toggleError(true);
    });
}

function renderImgAndName(data) {
  const name = data.name;
  const userName = document.querySelector("#user-name");
  userName.innerText = name;

  const img = `https://github.com/${data.login}.png`;
  const userImg = document.querySelector("#user-img");
  userImg.src = img;
}

function toggleError(showError) {
  const inputErrorMessage = document.querySelector("#input-error-message");

  inputErrorMessage.style.display = showError ? "inline-flex" : "none";
}
