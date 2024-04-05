const colorPreview = document.querySelector('#color-preview');
const colorSlider = document.getElementById('input-color');

function handleColorChange(event) {
  const color = `hsl(${event.target.value}, 100%, 50%)`;

  colorPreview.style.backgroundColor = color;
  colorPreview.style.boxShadow = `0px 0px 53px 13px ${color}`;
}

function handleIlluminationChange(event) {
  colorPreview.style.filter = `brightness(${event.target.value})`;
}

function handleContrastChange(event) {
  colorPreview.style.filter = `contrast(${event.target.value})`;
}
