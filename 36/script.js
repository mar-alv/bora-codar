const details = document.querySelector(".details");

let isDragging = false;
let startY = 0;
let lastY = 0;
let animationID = null;

const startDrag = function(event) {
  isDragging = true;
  startY = event.clientY || event.touches[0].clientY;
  lastY = parseFloat(details.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
  details.style.userSelect = 'none';
  cancelAnimationFrame(animationID); // Cancel any ongoing animation
};

const moveDrag = function(event) {
  if (isDragging) {
    const clientY = event.clientY || event.touches[0].clientY;
    const deltaY = clientY - startY;
    const newTransform = Math.min(600, Math.max(140, lastY + deltaY));

    if (newTransform >= 560 && newTransform <= 600) {
      details.dataset.open = "false";
      details.style.transform = 'translateY(140px)';
    } else {
      details.dataset.open = "true";
      details.style.transform = `translateY(${newTransform}px)`;
    }
  }
};

const endDrag = function(event) {
  isDragging = false;
  details.style.userSelect = 'auto';
  
  // Smoothly animate the details element to the final position
  const finalTransform = parseFloat(details.style.transform.replace('translateY(', '').replace('px)', ''));
  animateToFinalPosition(finalTransform);
};

details.addEventListener('mousedown', startDrag);
details.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', moveDrag);
document.addEventListener('touchmove', moveDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function animateToFinalPosition(finalTransform) {
  let start = null;
  const duration = 300;

  const step = function(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const progressRatio = Math.min(progress / duration, 1);
    const currentTransform = finalTransform + (parseFloat(details.style.transform.replace('translateY(', '').replace('px)', '')) - finalTransform) * progressRatio;
    details.style.transform = `translateY(${currentTransform}px)`;

    if (progress < duration) {
      animationID = requestAnimationFrame(step);
    }
  };

  animationID = requestAnimationFrame(step);
}

function handleSeeDetails() {
  details.dataset.open = "true";
  toggleButtonsDisabled();
}

function toggleButtonsDisabled() {
  const buttons = [...document.querySelectorAll("header button")];
  buttons.forEach((i) => {
    i.disabled = !i.disabled;
  });
}


/*
Less smoother version



const details = document.querySelector(".details");

let isDragging = false;
let startY = 0;
let lastY = 0;

const startDrag = function(event) {
  isDragging = true;
  startY = event.clientY || event.touches[0].clientY;
  lastY = parseFloat(details.style.transform.replace('translateY(', '').replace('px)', '')) || 0;
  details.style.userSelect = 'none';
};

const moveDrag = function(event) {
  if (isDragging) {
    const clientY = event.clientY || event.touches[0].clientY;
    const deltaY = clientY - startY;
    const newTransform = Math.min(600, Math.max(140, lastY + deltaY));

    if (newTransform >= 560 && newTransform <= 600) {
      details.dataset.open = "false";
      details.style.transform = 'translateY(140px)';
    } else {
      details.dataset.open = "true";
      details.style.transform = `translateY(${newTransform}px)`;
    }
  }
};

const endDrag = function(event) {
  isDragging = false;
  details.style.userSelect = 'auto';
};

details.addEventListener('mousedown', startDrag);
details.addEventListener('touchstart', startDrag);

document.addEventListener('mousemove', moveDrag);
document.addEventListener('touchmove', moveDrag);

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

function handleSeeDetails() {
  details.dataset.open = "true";
  toggleButtonsDisabled();
}

function toggleButtonsDisabled() {
  const buttons = [...document.querySelectorAll("header button")];
  buttons.forEach((i) => {
    i.disabled = !i.disabled;
  });
}



*/