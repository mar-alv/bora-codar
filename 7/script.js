function handleFilter() {
  const blocks = [...document.getElementsByTagName('article')];

  blocks.map((i) => {
    filterByCity(i);
    filterByName(i);

    return i;
  });
}

function filterByName(block) {
  const filteredName = [...document.getElementsByTagName('input')][0].value.toLowerCase();

  if (!filteredName) return;

  const name = [...block.getElementsByTagName('h3')][0].innerText.toLowerCase();

  block.style.display = name.includes(filteredName) ? 'block' : 'none';
}

function filterByCity(block) {
  const citySelect = [...document.getElementsByTagName('select')][0];
  const filteredCity = citySelect.options[citySelect.selectedIndex].value.toLowerCase();
  const city = [...block.getElementsByClassName('block-city')][0].innerText.toLowerCase();
  
  block.style.display =
    city.includes(filteredCity) || filteredCity === 'todas' ? 'block' : 'none';
}

function toogleRecommendedBlock() {
  const buttons = [
    ...document.getElementById('blocks-buttons').getElementsByTagName('button')
  ];
  const listButton = buttons[0];
  const mapButton = buttons[1];

  const isListButtonSelected =
    listButton.getAttribute('data-selected') === 'true';
  const isMapButtonSelected =
    mapButton.getAttribute('data-selected') === 'true';

  listButton.setAttribute(
    'data-selected',
    isListButtonSelected ? 'false' : 'true'
  );
  mapButton.setAttribute(
    'data-selected',
    isMapButtonSelected ? 'false' : 'true'
  );
}
