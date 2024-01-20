const cards = [...document.querySelectorAll("article")];
const propertiesToSwap = [
  "--slide-in-position",
  "--slide-in-inverse-position",
  "--rotation-degree",
  "z-index"
];

function handleSeeCard(event) {
  const chosenCard = event.target.closest("article");

  if (chosenCard.dataset.onTop === "true") return;

  const cardsSortedByZIndex = getCardsSortedByZIndex();

  const cardsToUpdate = getCardsToUpdate(chosenCard, cardsSortedByZIndex);

  animateCardSwap(chosenCard);
  setTimeout(() => {
    swapProperties(cardsToUpdate);
  }, 500);
  setCardOnTop();
}

function getCardsSortedByZIndex() {
  return cards.slice().sort((a, b) => {
    const zIndexA = parseInt(getComputedStyle(a).getPropertyValue("z-index"));
    const zIndexB = parseInt(getComputedStyle(b).getPropertyValue("z-index"));

    return zIndexB - zIndexA;
  });
}

function getCardsToUpdate(chosenCard, cardsSortedByZIndex) {
  let hasChosenCardBeenFound = false;
  const cardsToUpdate = [];
  let i = 0;

  while (!hasChosenCardBeenFound) {
    cardsToUpdate.push(cardsSortedByZIndex[i]);

    if (chosenCard === cardsSortedByZIndex[i]) hasChosenCardBeenFound = true;

    i++;
  }

  return cardsToUpdate;
}

function swapProperties(cardsToUpdate) {
  const originalComputedStyles = getOriginalComputedStyles(cardsToUpdate);

  cardsToUpdate.forEach((card, i) => {
    let nextCardComputedStyles = originalComputedStyles[i + 1];

    if (!nextCardComputedStyles)
      nextCardComputedStyles = originalComputedStyles[0];

    card.style.setProperty(
      propertiesToSwap[0],
      nextCardComputedStyles.slideInPosition
    );
    card.style.setProperty(
      propertiesToSwap[1],
      nextCardComputedStyles.slideInInversePosition
    );
    card.style.setProperty(
      propertiesToSwap[2],
      nextCardComputedStyles.rotationDegree
    );
    card.style.setProperty(propertiesToSwap[3], nextCardComputedStyles.zIndex);
  });
}

function getOriginalComputedStyles(cardsToUpdate) {
  return cardsToUpdate.map((i) => {
    const computedStyle = getComputedStyle(i);

    return {
      slideInPosition: computedStyle.getPropertyValue(propertiesToSwap[0]),
      slideInInversePosition: computedStyle.getPropertyValue(
        propertiesToSwap[1]
      ),
      rotationDegree: computedStyle.getPropertyValue(propertiesToSwap[2]),
      zIndex: computedStyle.getPropertyValue(propertiesToSwap[3])
    };
  });
}

function setCardOnTop() {
  getCardsSortedByZIndex().forEach((card, i) => {
    card.dataset.onTop = i === 0 ? "true" : "false";
  });
}

function animateCardSwap(chosenCard) {
  chosenCard.style.animation =
    "reorder .7s linear forwards, .5s rotate .5s linear forwards";
}
