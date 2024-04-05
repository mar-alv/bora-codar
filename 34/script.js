const itemInput = document.querySelector('#item');
const amountInput = document.querySelector('#amount-input');
const addItemBtn = document.querySelector('#add-item-btn');
const categorySelectValue = document.querySelector('#category-select-value');
let amount = 'unidade';
let tagIcon = '';

document.body.addEventListener('click', (e) => {
  const modalButtonClasses = [
    'amount-select-wrapper',
    'category-select-wrapper'
  ];
  const wasNoModalClicked = !e.target.closest('dialog');
  const modals = document.querySelectorAll('dialog');

  if (modalButtonClasses.includes(e.target.className)) {
    modals.forEach((i) => {
      if (!e.target.parentElement.contains(i)) i.dataset.open = 'false';
    });
  } else if (wasNoModalClicked) {
    modals.forEach((i) => {
      if (i.dataset.open === 'true') i.dataset.open = 'false';
    });
  }
});

itemInput.addEventListener('input', toggleAddBtnEnability);
amountInput.addEventListener('input', toggleAddBtnEnability);

function toggleAddBtnEnability() {
  addItemBtn.disabled =
    !itemInput.value ||
    !amountInput.value ||
    amountInput.value === '0' ||
    categorySelectValue.innerText === 'Selecione';
}

function handleToggleModal(element) {
  const wrapper = element.closest('div');
  const modal = wrapper.querySelector('dialog');

  const isModalOpen = modal.dataset.open === 'true';
  modal.dataset.open = isModalOpen ? 'false' : 'true';
}

function handleChooseAmount(element) {
  unchooseItems(document.querySelector('.amount-select'));
  const item = chooseItem(element);

  const amountSelectValue = document.querySelector('#amount-select-value');
  amountSelectValue.innerText = item.dataset.unit;
  amount = item.dataset.amount;

  closeModal(element);
}

function handleChooseCategory(element) {
  unchooseItems(document.querySelector('.category-select'));
  const item = chooseItem(element);

  categorySelectValue.innerText = item.dataset.tag;
  tagIcon = element.firstElementChild.cloneNode();

  closeModal(element);
  toggleAddBtnEnability();
}

function unchooseItems(list) {
  const items = [...list.querySelectorAll('li')];

  items.forEach((i) => {
    i.dataset.chosen = 'false';
  });
}

function chooseItem(element) {
  const item = element.closest('li');
  item.dataset.chosen = 'true';

  return item;
}

function closeModal(element) {
  const modal = element.closest('dialog');
  modal.dataset.open = 'false';
}

function handleAddItem(event) {
  event.preventDefault();

  const items = document.querySelector('.items');
  items.prepend(createItem());

  clearForm();
}

function createItem() {
  const item = document.createElement('li');
  item.classList.add('item');

  item.appendChild(createItemCol1());
  item.appendChild(createItemCol2());

  return item;
}

function createItemCol1() {
  const itemCheckbox = document.createElement('input');
  itemCheckbox.type = 'checkbox';

  const itemName = document.createElement('h2');
  itemName.innerText = itemInput.value;

  const itemAmount = document.createElement('p');
  itemAmount.innerText = formatAmount();

  const itemCol1 = document.createElement('div');

  itemCol1.appendChild(itemCheckbox);
  itemCol1.appendChild(itemName);
  itemCol1.appendChild(itemAmount);

  return itemCol1;
}

function createItemCol2() {
  const itemTag = document.createElement('span');
  itemTag.classList.add('tag');
  itemTag.dataset.tag = categorySelectValue.innerText;
  itemTag.appendChild(tagIcon);
  itemTag.innerHTML += categorySelectValue.innerText;

  const optionsButton = document.createElement('button');
  optionsButton.addEventListener('click', () => {
    handleToggleOptions(optionsButton);
  });
  optionsButton.classList.add('options-button');
  optionsButton.innerHTML =
    '<i class="ph-fill ph-dots-three-outline-vertical"></i>';

  const itemCol2 = document.createElement('div');

  itemCol2.appendChild(itemTag);
  itemCol2.appendChild(createOptions());
  itemCol2.appendChild(optionsButton);

  return itemCol2;
}

function createOptions() {
  const increaseButton = document.createElement('button');
  increaseButton.addEventListener('click', () => {
    handleIncreaseAmount(increaseButton);
  });
  increaseButton.innerHTML = '<i class="ph ph-plus"></i>';

  const decreaseButton = document.createElement('button');
  decreaseButton.addEventListener('click', () => {
    handleDecreaseAmount(decreaseButton);
  });
  decreaseButton.innerHTML = '<i class="ph ph-minus"></i>';

  const removeButton = document.createElement('button');
  removeButton.addEventListener('click', () => {
    handleRemoveItem(removeButton);
  });
  removeButton.innerHTML = '<i class="ph ph-trash"></i>';

  const options = document.createElement('div');
  options.dataset.open = 'false';
  options.classList.add('options');
  options.appendChild(increaseButton);
  options.appendChild(decreaseButton);
  options.appendChild(removeButton);

  return options;
}

function formatAmount() {
  return `${amountInput.value} ${amount}${
    parseInt(amountInput.value) > 1 ? 's' : ''
  }`;
}

function clearForm() {
  itemInput.value = '';
  amountInput.value = '1';

  unchooseItems(document.querySelector('.category-select'));
  categorySelectValue.innerText = 'Selecione';

  toggleAddBtnEnability();
}

function handleToggleOptions(element) {
  const options = element.parentElement.querySelector('.options');
  const areOptionsOpen = options.dataset.open === 'true';

  options.dataset.open = areOptionsOpen ? 'false' : 'true';
  element.innerHTML = areOptionsOpen
    ? '<i class="ph-fill ph-dots-three-outline-vertical"></i>'
    : '<i class="ph-bold ph-x"></i>';
}

function handleIncreaseAmount(element) {
  const item = element.closest('.item');
  const amount = item.querySelector('p');
  const match = amount.innerText.match(/(\d+)\s*(.*)/);

  if (!match) return;

  let number = parseInt(match[1]);
  const suffix = match[2];

  number++;

  amount.innerText = `${number} ${suffix}${
    number > 1 && !suffix.endsWith('s') ? 's' : ''
  }`;
}

function handleDecreaseAmount(element) {
  const item = element.closest('.item');
  const amount = item.querySelector('p');
  const match = amount.innerText.match(/(\d+)\s*(.*)/);

  if (!match) return;

  let number = parseInt(match[1]);
  let suffix = match[2];

  if (number > 1) number--;

  if (number === 1 && suffix.endsWith('s')) suffix = suffix.slice(0, -1);

  amount.innerText = `${number} ${suffix}`;
}

function handleRemoveItem(element) {
  const item = element.closest('.item');
  item.style.animation = 'remove .5s linear forwards';

  setTimeout(() => {
    item.remove();
  }, 500);
}
