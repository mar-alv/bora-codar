let isRotating = false;
const rotateButton = document.getElementById('rotate-button');
const icons = rotateButton.getElementsByTagName('svg');
const rotateIcon = icons[0];
const exitIcon = icons[1];
const image = document.getElementById('product-preview-image');
const gif = document.getElementById('product-preview-gif');

icons[1].style.display = 'none';
gif.style.display = 'none';

function handleRotate() {
  isRotating = !isRotating;
  
  image.style.display = isRotating ? 'none' : 'block';
  rotateIcon.style.display = isRotating ? 'none' : 'block';

  gif.style.display = isRotating ? 'block' : 'none';
  exitIcon.style.display = isRotating ? 'block' : 'none';
}
