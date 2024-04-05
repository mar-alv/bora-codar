const app = document.querySelector('#app');
const returnButton = document.querySelector('#return-button');
const continueButton = document.querySelector('#next-button');
const MSITE_THRESHOLD_WIDTH = 450;
const form = document.querySelector('form');
const stepSection = [...form.querySelectorAll('section')];
const fields = [...document.querySelectorAll('input, textarea')];

fields.forEach((i) => {
  i.addEventListener('input', () => {
    continueButton.disabled = !areStepFieldsFulfilled(getCurrentStepValue());
  });

  i.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && areStepFieldsFulfilled(getCurrentStepValue()))
      handleContinue();
  });
});

function areStepFieldsFulfilled(currentStep) {
  const currentStepSection = stepSection[currentStep];
  const currentStepFields = [
    ...currentStepSection.querySelectorAll('input, textarea')
  ];

  return currentStepFields.every((i) => {
    const value = i.value;
    const pattern = new RegExp(i.getAttribute('pattern'));

    return pattern.test(value);
  });
}

function getCurrentStepValue() {
  return parseInt(app.dataset.step);
}

function handleReturn() {
  const currentStepValue = getCurrentStepValue();

  if (currentStepValue >= 1) {
    const previousStepValue = currentStepValue - 1;

    app.dataset.step = previousStepValue;

    if (previousStepValue === 0) hideReturnButton();
  }
}

function hideReturnButton() {
  returnButton.style.visibility = 'hidden';

  if (window.innerWidth <= MSITE_THRESHOLD_WIDTH)
    returnButton.style.display = 'none';
}

function handleContinue() {
  isAtLastStep() ? sendData() : goToNextStep();
}

function isAtLastStep() {
  const currentSection = stepSection[getCurrentStepValue()];

  return currentSection === stepSection.at(-1);
}

function sendData() {
  continueButton.disabled = true;
  continueButton.innerHTML = '<i class="ph-bold ph-spinner-gap"></i>';

  setTimeout(() => {
    setStepNumberAsDone();
    showConclusionSection();
  }, 2000);
}

function setStepNumberAsDone() {
  const steps = [...document.querySelectorAll('.step')];
  const currentStepValue = getCurrentStepValue();
  const currentStep = steps[currentStepValue];
  const currentStepNumber = currentStep.querySelector('.step-number');
  const nextStepValue = currentStepValue + 1;
  const nextStep = steps[nextStepValue];

  if (nextStep) {
    app.dataset.step = nextStepValue;
    nextStep.dataset.status = 'pending';
  }

  currentStep.dataset.status = 'done';
  currentStepNumber.innerHTML = '<i class="ph-bold ph-check"></i>';
}

function showConclusionSection() {
  const currentStepValue = getCurrentStepValue();
  const nextStepValue = currentStepValue + 1;
  const footer = document.querySelector('footer');

  app.dataset.step = nextStepValue;
  footer.style.display = 'none';
}

function goToNextStep() {
  const currentStepValue = getCurrentStepValue();

  if (areStepFieldsFulfilled(currentStepValue)) {
    setStepNumberAsDone();
    showReturnButton();

    continueButton.disabled = !areStepFieldsFulfilled(getCurrentStepValue());

    changeNextButtonText();
  }
}

function showReturnButton() {
  returnButton.style.visibility = 'initial';
  returnButton.style.display = 'block';
}

function changeNextButtonText() {
  continueButton.innerText = isAtLastStep() ? 'ENVIAR PROPOSTA' : 'CONTINUAR';
}
