const cart = document.querySelector('aside');

function handleOpenCart() {
  cart.dataset.open = 'true';
}

function handleCloseCart() {
  cart.dataset.open = 'false';
}

const validCoupons = [
  { name: 'HRDWARE_DEAL', discount: 10 },
  { name: 'TECHSAVINGS', discount: 15 },
  { name: 'DISCOUNTCPU', discount: 5 },
  { name: 'PCCOMPONENTS', discount: 12 },
  { name: 'GAMERSPECIAL', discount: 20 }
];
const couponInput = document.querySelector('#coupon-input');

couponInput.addEventListener('blur', (event) => {
  const coupon = event.target.value.toUpperCase();

  const validCoupon = validCoupons.find((c) => c.name === coupon);

  if (validCoupon) {
    applyDiscount(validCoupon.discount);
  }
});

function applyDiscount(discountValue) {
  const discount = document.querySelector('#discount');

  const totalValue = document.querySelector('#total-value');
  const discountedTotalValue =
    getTotalValue(totalValue) -
    (getTotalValue(totalValue) * discountValue) / 100;

  discount.innerText = formatTotalValue(discountedTotalValue);
  discount.dataset.applied = 'true';
}

function getTotalValue(totalValue) {
  return parseFloat(
    totalValue.innerText.slice(3).replace('.', '').replace(',', '.')
  );
}

function formatTotalValue(totalValue) {
  const formattedValue = totalValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formattedValue;
}

function setCart() {
  setCartCount();
  setInitialAmount();
  setInitialTotalValue();
}

function setInitialAmount() {
  const productAmountWrappers = document.querySelectorAll(
    '.product-amount-wrapper'
  );

  productAmountWrappers.forEach((i) => {
    i.dataset.amount = 1;

    const productAmount = i.querySelector('.product-amount');
    productAmount.innerText = 1;
  });
}

function setCartCount() {
  const headerCartCount = document.querySelector('#header-cart-count');
  const cartCount = document.querySelector('#cart-count');
  const productCount = document.querySelectorAll('article').length;

  if (productCount) {
    cartCount.innerHTML = `Seu carrinho tem <b>${productCount} itens</b>`;
    headerCartCount.innerText = productCount;
  } else {
    cartCount.innerHTML = 'Seu carrinho está <b>vazio!</b>';
    headerCartCount.innerText = '';
  }
}

function setInitialTotalValue() {
  const productPrices = getProductPrices();

  const totalValue = productPrices.reduce((acc, current) => acc + current, 0);

  const totalValueElement = document.querySelector('#total-value');

  totalValueElement.innerText = formatTotalValue(totalValue);
}

function getProductPrices() {
  return [...getProductPriceElements()].map((i) => parseFloat(i.dataset.price));
}

function getProductPriceElements() {
  return document.querySelectorAll('.product-price');
}

function handleDecrementAmount(element) {
  event.stopPropagation();

  const productAmountWrapper = element.closest('.product-amount-wrapper');
  const productAmount = getProductAmount(productAmountWrapper);

  if (productAmount > 1) {
    const productPrice = getProductPrice(productAmountWrapper) * -1;
    const amountToDecrease = -1;

    setTotalValue(productPrice);
    setProductAmount(productAmountWrapper, amountToDecrease);
  }
}

function getProductAmount(productAmountWrapper) {
  return parseInt(productAmountWrapper.dataset.amount);
}

function handleIncrementAmount(element) {
  event.stopPropagation();

  const productAmountWrapper = element.closest('.product-amount-wrapper');
  const productPrice = getProductPrice(productAmountWrapper);
  const amountToIncrease = 1;

  setTotalValue(productPrice);
  setProductAmount(productAmountWrapper, amountToIncrease);
}

function getProductPrice(productAmountWrapper) {
  const productPriceWrapper = productAmountWrapper.closest(
    '.product-price-wrapper'
  );
  const productPriceElement = productPriceWrapper.querySelector(
    '.product-price'
  );

  return parseFloat(productPriceElement.dataset.price);
}

function setTotalValue(priceToAdd) {
  const totalValue = document.querySelector('#total-value');
  const newTotalValue = getTotalValue(totalValue) + priceToAdd;

  totalValue.innerText = formatTotalValue(newTotalValue);
}

function setProductAmount(productAmountWrapper, amountToIncrease) {
  const currentAmount = getProductAmount(productAmountWrapper);
  const newAmount = currentAmount + amountToIncrease;

  const productAmountElement = productAmountWrapper.querySelector(
    '.product-amount'
  );
  productAmountElement.innerText = newAmount;
  productAmountWrapper.dataset.amount = newAmount;
}

function handleClearCouponInput() {
  couponInput.value = '';
}

function handleClearDiscount() {
  const discount = document.querySelector('#discount');

  discount.innerText = '';
  discount.dataset.applied = 'false';
}

function handleBuy(element) {
  element.innerHTML = '<i class="ph-bold ph-spinner-gap"></i>';

  setTimeout(() => {
    element.innerText = 'Finalizar compra';

    let delay = 100;

    document.querySelectorAll('article').forEach((i) => {
      i.style.animation = `remove .7s ${delay}ms linear forwards`;

      setTimeout(() => {
        i.remove();
      }, 700 + delay);

      delay += 300;
    });
  }, 2000);

  setTimeout(() => {
    resetCart();
  }, 4100);
}

function resetCart() {
  setCart();
  handleClearCouponInput();
  handleClearDiscount();
  disableBuyButton();
  showEmptyCartMessage();
}

function disableBuyButton() {
  const buyButton = document.querySelector('#buy-button');

  buyButton.disabled = true;
}

function showEmptyCartMessage() {
  const emptyCartMessage = document.querySelector('#empty-cart-message');

  emptyCartMessage.style.display = 'block';
}

setCart();
