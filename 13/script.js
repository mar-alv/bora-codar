toastr.options = {
  progressBar: true,
  positionClass: "toast-top-right",
  showDuration: "300",
  hideDuration: "2000",
  hideEasing: "linear",
  showMethod: "slideDown",
  hideMethod: "slideUp"
};

const numberInput = document.getElementById("input-number");
const expiringDateInput = document.getElementById("input-expiring-date");
const cvvInput = document.getElementById("input-cvv");

const addButton = document.getElementById("add-button");

const inputs = [...document.getElementsByTagName("input")];

inputs.map((i) => {
  i.addEventListener("blur", handleBlur);
  i.addEventListener("input", toggleButtonEnableability);
});

numberInput.addEventListener("input", () => {
  numberInput.value = maskNumberInput(numberInput.value);

  toggleButtonEnableability();
});

function maskNumberInput(value) {
  const numberOnlyValue = value.replace(/[^0-9]/g, "");
  const numberOnlyseparatedBySpacesValue = numberOnlyValue
    .replace(/(\d{4})/g, "$1 ")
    .trim();

  return numberOnlyseparatedBySpacesValue;
}

function handleBlur(e) {
  const input = e.target;

  isInputEmpty(input) ? invalidateInput(input) : validateInput(input);
}

function toggleButtonEnableability() {
  addButton.disabled = areInputsEmpty();
}

function areInputsEmpty() {
  return inputs.every((i) => isInputEmpty(i));
}

function isInputEmpty(input) {
  return !input.value;
}

function invalidateInput(input) {
  input.setAttribute("data-valid", "false");
}

function validateInput(input) {
  input.setAttribute("data-valid", "true");
}

function handleAddCard(event) {
  event.preventDefault();

  const button = document.getElementById("add-button");

  changeButtonTextForIcon(button);

  setTimeout(() => {
    changeButtonIconForText(button);

    validateInputs();

    if (areInputsValid()) addCard();
  }, 2000);
}

function changeButtonTextForIcon(button) {
  button.innerHTML = '<i class="ph-bold ph-spinner-gap"></i>';
}

function changeButtonIconForText(button) {
  button.innerHTML = "Adicionar cartão";
}

function validateInputs() {
  inputs.map((i) => {
    isInputValid(i) ? validateInput(i) : invalidateInput(i);
  });
}

function areInputsValid() {
  return inputs.every((i) => isInputValid(i));
}

function isInputValid(input) {
  return !isInputEmpty(input) && valueEqualsExpected(input);
}

function valueEqualsExpected(input) {
  const expectedValue = input.getAttribute("data-expected-value");

  return input.value === expectedValue;
}

function addCard() {
  inputs.map((i) => {
    i.value = "";
  });

  toastr.success("Cartão adicionado com sucesso");
}

$("#add-button").submit((event) => {
  handleAddCard(event);
});

let isDragging = false;
let previousMouseX = 0;
let isRotating = false;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1.6 / 1, 1, 1000);
camera.position.z = 270;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(280, 168);

document.getElementById("credit-card").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(280, 168, 5);

const materials = [
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
  new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("assets/card-back.png")
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("assets/card-front.png")
  })
];

materials[4].map.minFilter = THREE.LinearFilter;
materials[5].map.minFilter = THREE.LinearFilter;
materials[4].map.generateMipmaps = true;
materials[5].map.generateMipmaps = true;
materials[4].map.anisotropy = renderer.capabilities.getMaxAnisotropy();
materials[5].map.anisotropy = renderer.capabilities.getMaxAnisotropy();

const card = new THREE.Mesh(geometry, materials);
scene.add(card);

card.rotation.y = Math.PI;

renderer.domElement.addEventListener("mousedown", (event) => {
  isDragging = true;
  previousMouseX = event.clientX;
  isRotating = false;
});

renderer.domElement.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const delta = event.clientX - previousMouseX;

    if (Math.abs(delta) > 2) isRotating = true;

    if (isRotating) {
      card.rotation.y += delta * 0.01;
      previousMouseX = event.clientX;
    }
  }
});

renderer.domElement.addEventListener("mouseup", () => {
  isDragging = false;
  isRotating = false;
});

renderer.domElement.addEventListener("mouseleave", () => {
  isDragging = false;
  isRotating = false;
});

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
