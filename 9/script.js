var options = {
  chart: {
    height: 280,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  colors: ['rgba(124, 58, 237, 0.50)', 'rgba(124, 58, 237, 0.00)'],
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 1.9,
      stops: [0, 90, 100]
    }
  },
  series: [
    {
      name: 'Cotation',
      data: [80, 52, 38, 45, 19, 23]
    }
  ],
  stroke: {
    curve: 'straight'
  },
  xaxis: {
    categories: ['1D', '5D', '1M', '1A', '5A', 'Máx']
  }
};

var chart = new ApexCharts(document.querySelector('#chart'), options);

chart.render();

const currencies = [
  {
    sign: '$',
    name: 'USD',
    icon: 'https://www.worldometers.info/img/flags/us-flag.gif',
    to: [
      {
        name: 'USD',
        value: 1
      },
      {
        name: 'GBP',
        value: 0.83
      },
      {
        name: 'BRL',
        value: 4.97
      }
    ],
    seriesData: {
      usd: [1, 1, 1, 1, 1, 1],
      gbp: [0.82, 0.82, 0.82, 0.85, 0.77, 2.43],
      brl: [4.99, 5.03, 4.99, 5.38, 3.7, 7.9]
    }
  },
  {
    sign: '£',
    name: 'GBP',
    icon: 'https://www.worldometers.info/img/flags/uk-flag.gif',
    to: [
      {
        name: 'USD',
        value: 1.21
      },
      {
        name: 'GBP',
        value: 1
      },
      {
        name: 'BRL',
        value: 6.01
      }
    ],
    seriesData: {
      usd: [1.21, 1.21, 1.21, 1.16, 1.28, 2.64],
      gbp: [1, 1, 1, 1, 1, 1],
      brl: [6.05, 6.12, 6.06, 6.26, 4.67, 6.56]
    }
  },
  {
    sign: 'R$',
    name: 'BRL',
    icon: 'https://www.worldometers.info/img/flags/br-flag.gif',
    to: [
      {
        name: 'USD',
        value: 0.2
      },
      {
        name: 'GBP',
        value: 0.17
      },
      {
        name: 'BRL',
        value: 1
      }
    ],
    seriesData: {
      usd: [0.2, 0.19, 0.19, 0.18, 0.27, 0.8],
      gbp: [0.16, 0.16, 0.16, 0.16, 0.21, 0.16],
      brl: [1, 1, 1, 1, 1, 1]
    }
  }
];

const currencyIcons = ['$', '£', 'R$'];

[...document.querySelectorAll('.currency-field-select-container')].map(
  (i, index) => {
    i.addEventListener('keydown', (e) => {
      if (event.key === 'Enter') handleToggleModal(index);
    });

    i.addEventListener('focusout', (e) => {
      if (isModalOpen(i) && !i.contains(event.relatedTarget))
        handleToggleModal(index);
    });
  }
);

document.getElementById('from-input').addEventListener('keydown', (e) => {
  if (event.key === 'Enter') handleConvert();
});

[...document.getElementsByTagName('dialog')].map((i, index) => {
  i.addEventListener('mouseleave', () => {
    handleToggleModal(index);
  });
});

function handleToggleModal(index) {
  const select = getSelect(index);

  toggleModal(select);
  rotateSelectIcon(select);
}

function getSelect(index) {
  return [
    ...document.getElementsByClassName('currency-field-select-container')
  ][index];
}

function isModalOpen(select) {
  return select.getAttribute('data-selected') === 'true';
}

function toggleModal(select) {
  const dialog = ([
    ...select.getElementsByTagName('dialog')
  ][0].style.display = isModalOpen(select) ? 'none' : 'block');

  select.setAttribute('data-selected', isModalOpen(select) ? 'false' : 'true');
}

function rotateSelectIcon(select) {
  const selectIcon = [...select.getElementsByClassName('ph ph-caret-down')][0];

  const degrees = isModalOpen(select) ? 180 : 0;

  selectIcon.style.transform = `rotate(${degrees}deg)`;
}

function handleSelectFromCurrency(currencyFieldSelectIndex, currencyIndex) {
  const currency = getCurrency(currencyFieldSelectIndex, currencyIndex);

  setSelectedCurrency(currencyFieldSelectIndex, currency);
  setCurrencyIcon(currencyFieldSelectIndex, currencyIndex);

  handleConvert();
}

function getCurrency(currencyFieldSelectIndex, currencyIndex) {
  const currencyFieldSelect = [
    ...document.querySelectorAll('.currency-field-select')
  ][currencyFieldSelectIndex];

  return currencyFieldSelect.querySelectorAll('.currency')[currencyIndex];
}

function setSelectedCurrency(currencyFieldSelectIndex, currency) {
  const selectedCurrencyId = getSelectedCurrencyId(currencyFieldSelectIndex);

  document.getElementById(selectedCurrencyId).innerHTML = currency.innerHTML;
}

function getSelectedCurrencyId(currencyFieldSelectIndex) {
  return currencyFieldSelectIndex === 0
    ? 'selected-from-currency'
    : 'selected-to-currency';
}

function setCurrencyIcon(currencyFieldSelectIndex, index) {
  const currencyFieldInput = [
    ...document.querySelectorAll('.currency-field-input')
  ][currencyFieldSelectIndex];

  currencyFieldInput.getElementsByTagName('span')[0].innerText =
    currencyIcons[index];
}

function setCurrencyFieldSelect() {
  let tabIndex = 3;

  [0, 1].map((i) => {
    currencies.map((j, index) => {
      const currency = document.createElement('li');
      currency.className = 'currency';
      currency.addEventListener('click', () =>
        handleSelectFromCurrency(i, index)
      );
      currency.addEventListener('keydown', (e) => {
        if (event.key === 'Enter') handleSelectFromCurrency(i, index);
      });
      currency.setAttribute('tabindex', tabIndex);

      const icon = document.createElement('img');
      icon.alt = `${j.name} flag icon`;
      icon.className = 'currency-icon';
      icon.src = j.icon;
      currency.appendChild(icon);

      const name = document.createElement('span');
      name.innerText = j.name;
      currency.appendChild(name);

      const currencyFieldSelect = [
        ...document.querySelectorAll('.currency-field-select')
      ][i];

      currencyFieldSelect.appendChild(currency);

      tabIndex++;
    });
    tabIndex += 3;
  });
}

function handleConvert() {
  const fromInput = document.getElementById('from-input');
  const toInput = document.getElementById('to-input');

  const selectedFromCurrency = getSelectedCurrency('selected-from-currency');
  const selectedToCurrency = getSelectedCurrency('selected-to-currency');

  const fromValue = getConvertFactor(selectedFromCurrency, selectedToCurrency);

  toInput.value = convert(fromInput.value, fromValue);

  setChart(selectedFromCurrency, selectedToCurrency.name.toLowerCase());
}

function getSelectedCurrency(id) {
  const selectedCurrencyElement = document.getElementById(id);

  const name = [...selectedCurrencyElement.getElementsByTagName('span')][0]
    .innerText;

  return currencies.find((i) => i.name === name);
}

function getConvertFactor(from, to) {
  return from.to.find((i) => i.name === to.name).value;
}

function convert(from, to) {
  return (from * to).toFixed(2);
}

function setChart(fromCurrency, toCurrencyName) {
  let data = [];

  switch (toCurrencyName) {
    case 'usd':
      data = fromCurrency.seriesData.usd;
      break;
    case 'gbp':
      data = fromCurrency.seriesData.gbp;
      break;
    case 'brl':
      data = fromCurrency.seriesData.brl;
      break;
  }

  chart.updateSeries([{ data }]);
}

setCurrencyFieldSelect();
setChart(
  getSelectedCurrency('selected-from-currency'),
  getSelectedCurrency('selected-to-currency').name.toLowerCase()
);
