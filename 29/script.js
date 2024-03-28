const slider = document.querySelector('#slider');
const sliderThumb = document.querySelector('.slider-thumb');
const beforeImg = document.querySelector('.before-img-wrapper');

slider.addEventListener('input', (e) => {
  beforeImg.style.width = `${e.target.value}%`;
  sliderThumb.style.left = `${e.target.value}%`;
});
