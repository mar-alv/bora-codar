let isRating = true;
const rateDescription = document.querySelector('.rate-description');
const rating = document.querySelector('.rating');
const ratingStars = document.querySelectorAll('.ph-fill.ph-star');
const submitButton = document.querySelector('.submit-button');
const textarea = document.getElementsByTagName('textarea')[0];
const title = document.getElementsByTagName('h1')[0];
const returnArrow = document.querySelector('.ph.ph-arrow-left');

submitButton.disabled = true;
returnArrow.style.display = "none";
textarea.style.display = "none";
      
function rate(rating) {
  unselectStars();
  
  [...Array(rating)].map((_, i) => {
    ratingStars[i].classList.add("selected");
  });
  
  submitButton.disabled = false;
}

function unselectStars() {
  [...ratingStars].map((i) => { 
    i.classList.remove("selected");
    
    return i;
  });
}

function handleComment() {
  submitButton.disabled = !textarea.value;
}

function changePage() {
  submitButton.innerText = isRating ? 'Enviar' : 'Confirmar';
  textarea.style.display = isRating ? "block" : "none";
  rating.style.display = isRating ? "none" : "block";
  returnArrow.style.display = isRating ? "" : "none";
  title.innerText = isRating ? 'Deixe um comentário' : 'Avalie o produto';
  
  unselectStars();
  changeRateDescription();
  
  isRating = !isRating;
  submitButton.disabled = true;
}

function changeRateDescription() {
  if (!isRating) {
    const p1 = document.createElement("p");
    p1.textContent = "O que você achou do produto";

    const a = document.createElement("a");
    a.textContent = "Smartwatch Amazfit Bip U Pro";
    a.setAttribute("href", "/");

    const p2 = document.createElement("p");
    p2.appendChild(a);
    
    rateDescription.innerHTML = null;
    rateDescription.appendChild(p1);
    rateDescription.appendChild(p2);
  }
  else {
    const p = document.createElement("p");
    p.textContent = "Conte sobre o motivo da sua avaliação";
    
    rateDescription.innerHTML = p.innerHTML;
  }
  const i = document.createElement("i");
  
  i.classList.add("ph");
  i.classList.add("ph-arrow-right");
  
  submitButton.appendChild(i);
}
