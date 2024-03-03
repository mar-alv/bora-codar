let currentScore = 2;
const correctAnswer = "b";
const answers = [...document.querySelectorAll("article")];
const answersContainer = document.querySelector("section");

function handleAnswer(element, answer) {
  if (answersContainer.dataset.answered === "true") return;

  answer === correctAnswer ? updateScore() : updateMissedIcon(element);

  updateScoredIcon();

  answersContainer.dataset.answered = "true";
  element.dataset.chosen = "true";
}

function updateScoredIcon() {
  const icon = answers
    .find((i) => i.dataset.answer === "true")
    .querySelector("i");

  icon.classList = "ph-bold ph-check";
}

function updateMissedIcon(element) {
  const icon = element.querySelector("i");

  icon.classList = "ph-bold ph-x";
}

function updateScore() {
  ++currentScore;

  const score = document.getElementById("score");
  score.innerText = currentScore;
}
