let arrivalTimer = null;
const arrivalIn = document.querySelector('#arrival-in');
let distanceToArriveInMeters = 1600;
let carSpeedInMetersPerSecond = 80;

let timeToArriveInSeconds =
  distanceToArriveInMeters / carSpeedInMetersPerSecond;

function drive() {
  setArrivalInText();

  if (timeToArriveInSeconds <= 0 || distanceToArriveInMeters <= 0) {
    arrive();
    stopWheelsAnimation();
    clearInterval(arrivalTimer);
  } else {
    distanceToArriveInMeters = Math.max(
      0,
      distanceToArriveInMeters - carSpeedInMetersPerSecond
    );

    timeToArriveInSeconds =
      distanceToArriveInMeters / carSpeedInMetersPerSecond;
  }
}

function arrive() {
  arrivalIn.remove();

  document.querySelector('h1').innerHTML =
    '<b>Marcelo</b> Chegou ao seu destino';
}

function stopWheelsAnimation() {
  const wheels = document.querySelectorAll('.car-wheel');
  const leftWheel = wheels[0];
  const rightWheel = wheels[1];

  leftWheel.dataset.rolling = false;
  rightWheel.dataset.rolling = false;
}

function setArrivalInText() {
  arrivalIn.innerText = `Chega em ${getTimeToArrive()} (${getDistanceToArrive()})`;
}

function getTimeToArrive() {
  const minutes = Math.floor(timeToArriveInSeconds / 60);
  const seconds = Math.round(timeToArriveInSeconds % 60);

  const minutesText =
    minutes > 0 ? `${minutes} minuto${minutes > 1 ? 's' : ''}` : '';
  const secondsText =
    seconds > 0 ? `${seconds} segundo${seconds > 1 ? 's' : ''}` : '';

  return `${minutesText} ${secondsText}`.trim();
}

function getDistanceToArrive() {
  const kilometers = Math.floor(distanceToArriveInMeters / 1000);

  if (kilometers > 0)
    return `${kilometers} quilômetro${kilometers > 1 ? 's' : ''}`;

  const meters = distanceToArriveInMeters % 1000;

  return `${meters} metro${meters > 1 ? 's' : ''}`;
}

function handleMessageDriver(event) {
  const messageText = event.target.value;

  if (event.key === 'Enter' && messageText) {
    clearInput();

    const message = createMessage();

    const inputWrapper = document.querySelector('#input-wrapper');
    inputWrapper.appendChild(message);

    changeMessageIcon(message);
    enableInput(event);
  }
}

function clearInput() {
  event.target.value = '';
  event.target.disabled = true;
}

function createMessage() {
  const message = document.createElement('div');
  message.classList.add('message');
  message.innerHTML = '<i class='ph-bold ph-envelope-open'></i>';

  return message;
}

function changeMessageIcon(message) {
  setTimeout(() => {
    message.innerHTML = '<i class='ph-bold ph-envelope'></i>';
  }, 500);
}

function enableInput(event) {
  setTimeout(() => {
    event.target.disabled = false;
  }, 2000);
}

function handleCall(element) {
  element.classList.add('call');

  setTimeout(() => {
    element.classList.remove('call');
  }, 2000);
}

function handleFavorite(element) {
  element.classList.add('favorite');

  setTimeout(() => {
    element.classList.remove('favorite');
  }, 2000);
}

arrivalTimer = setInterval(drive, 1000);
