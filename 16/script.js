const modal = [...document.getElementsByTagName("dialog")][0];
const input = [...document.getElementsByTagName("input")][0];
const numberInput = document.getElementById("input-number");
let colors = [
  "#7547ae",
  "#8250b5",
  "#8f59bb",
  "#9c62c2",
  "#aa6bca",
  "#128a8a",
  "#23acc4",
  "#33ccd2",
  "#46eef0",
  "#57fbff",
  "#a623bf",
  "#ae34c4",
  "#b746c9",
  "#bf57ce",
  "#d17ad9",
  "#00afba",
  "#00c0c0",
  "#00d1d5",
  "#00e2ea",
  "#00f3f0",
  "#bba20a"
];
const defaultColor = "#633BBC";

input.addEventListener("input", handleFilter);
numberInput.addEventListener("input", (event) => {
  numberInput.value = event.target.value.replace(/[^0-9()+-\s]/g, "");
});

function handleFilter(event) {
  const value = getValue(event);

  getAlphabetSections().map((i) => {
    const sectionContacts = getContacts(i);

    sectionContacts.map((j) => {
      toggleContactVisibility(j, value);
    });

    areContactsHidden(sectionContacts)
      ? hideAlphabetSection(i)
      : showAlphabetSection(i);
  });
}

function getValue(event) {
  return event.target.value.toLowerCase();
}

function getAlphabetSections() {
  return [...document.getElementsByTagName("article")];
}

function getContacts(i) {
  return [...i.getElementsByTagName("li")];
}

function getName(contact) {
  return [...contact.getElementsByTagName("h2")][0].innerText.toLowerCase();
}

function getNumber(contact) {
  return [...contact.getElementsByTagName("p")][0].innerText.toLowerCase();
}

function toggleContactVisibility(contact, value) {
  const name = getName(contact);
  const number = getNumber(contact);

  contact.style.display =
    name.includes(value) || number.includes(value) ? "flex" : "none";
}

function areContactsHidden(sectionContacts) {
  return sectionContacts.every((i) => i.style.display === "none");
}

function hideAlphabetSection(alphabetSection) {
  alphabetSection.style.display = "none";
}

function showAlphabetSection(alphabetSection) {
  alphabetSection.style.display = "flex";
}

function showModal() {
  modal.setAttribute("data-open", "true");
}

function hideModal() {
  modal.setAttribute("data-open", "false");
}

function handleAddContact(event) {
  event.preventDefault();

  addContact(createContact());
  hideModal();
  clearInputs();
}

function createContact() {
  const contact = document.createElement("li");

  contact.appendChild(createDeleteButton());
  contact.appendChild(createImage());
  contact.appendChild(createContactInfo());

  return contact;
}

function createDeleteButton() {
  const button = document.createElement("button");
  button.classList = "delete-button";
  button.addEventListener("click", handleDeleteContact);

  const icon = document.createElement("i");
  icon.classList = "ph-fill ph-trash";

  button.appendChild(icon);

  return button;
}

function createImage() {
  const image = document.createElement("img");
  image.alt = "Imagem do contato";
  image.src = getImageValue();

  return image;
}

function getImageValue() {
  return document.getElementById("input-image").value;
}

function createContactInfo() {
  const contactInfo = document.createElement("div");
  contactInfo.classList = "contact-info";

  contactInfo.appendChild(createName());
  contactInfo.appendChild(createNumber());

  return contactInfo;
}

function createName() {
  const name = document.createElement("h2");
  name.innerText = getNameValue();

  return name;
}

function getNameValue() {
  return document.getElementById("input-name").value;
}

function createNumber() {
  const number = document.createElement("p");
  number.innerText = getNumberValue();

  return number;
}

function getNumberValue() {
  return document.getElementById("input-number").value;
}

function addContact(contact) {
  const contactNameFirstLetter = getName(contact)[0].toLowerCase();

  alphabetSectionExists(contactNameFirstLetter)
    ? addContactToExistingSection(contact, contactNameFirstLetter)
    : addContactToNewSection(contact, contactNameFirstLetter);
}

function alphabetSectionExists(letter) {
  const alphabetSectionLetters = getAlphabetSectionLetters();

  return alphabetSectionLetters.includes(letter);
}

function getAlphabetSectionLetters() {
  return [...document.getElementsByTagName("h3")].map((i) =>
    i.innerText.toLowerCase()
  );
}

function addContactToExistingSection(contact, contactNameFirstLetter) {
  const alphabetSection = getAlphabetSection(contactNameFirstLetter);
  const alphabetSectionList = getAlphabetSectionList(alphabetSection);

  alphabetSectionList.appendChild(contact);

  sortAlphabetSectionListByName(alphabetSectionList);
}

function getAlphabetSection(letter) {
  return getAlphabetSections().find(
    (i) =>
      [...i.getElementsByTagName("h3")][0].innerText.toLowerCase() === letter
  );
}

function getAlphabetSectionList(alphabetSection) {
  return [...alphabetSection.getElementsByTagName("ul")][0];
}

function sortAlphabetSectionListByName(list) {
  const contactList = getContacts(list);

  contactList.sort((a, b) => {
    var nameA = a.querySelector("h2").innerText.toLowerCase();
    var nameB = b.querySelector("h2").innerText.toLowerCase();

    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });

  contactList.forEach((i) => {
    list.removeChild(i);
  });

  contactList.forEach((i) => {
    list.appendChild(i);
  });
}

function addContactToNewSection(contact, contactNameFirstLetter) {
  const alphabetSection = createAlphabetSection(
    contact,
    contactNameFirstLetter
  );

  [...document.getElementsByTagName("section")][0].appendChild(alphabetSection);

  sortSectionsAlphabetically(getAlphabetSections());
}

function sortSectionsAlphabetically(list) {
  const sectionsContainer = document.getElementById("sections-container");
  const alphabetSections = getAlphabetSections();

  alphabetSections.sort((a, b) => {
    var letterA = a.querySelector("h3").innerText.toLowerCase();
    var letterB = b.querySelector("h3").innerText.toLowerCase();

    return letterA < letterB ? -1 : letterA > letterB ? 1 : 0;
  });

  alphabetSections.forEach((i) => {
    sectionsContainer.removeChild(i);
  });

  alphabetSections.forEach((i) => {
    sectionsContainer.appendChild(i);
  });
}

function createAlphabetSection(contact, letter) {
  const alphabetSection = document.createElement("article");

  alphabetSection.appendChild(createAlphabetSectionLetter(letter));
  alphabetSection.appendChild(createAlphabetSectionList(contact));

  return alphabetSection;
}

function createAlphabetSectionLetter(letter) {
  const alphabetSectionLetter = document.createElement("h3");
  alphabetSectionLetter.innerText = letter.toUpperCase();
  alphabetSectionLetter.style.backgroundColor = getRandomBackgroundColor();

  return alphabetSectionLetter;
}

function getRandomBackgroundColor() {
  if (!colors.length) return defaultColor;

  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];

  colors.splice(randomIndex, 1);

  return randomColor;
}

function createAlphabetSectionList(contact) {
  const alphabetSectionList = document.createElement("ul");
  alphabetSectionList.appendChild(contact);

  return alphabetSectionList;
}

function clearInputs() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-number").value = "";
  document.getElementById("input-image").value = "";
}

function handleDelete() {
  const deleteButtons = [...document.querySelectorAll(".delete-button")];

  deleteButtons.map((i) => {
    i.style.display =
      i.style.display === "" || i.style.display === "none" ? "block" : "none";
  });
}

function handleDeleteContact(event) {
  const button =
    event.target.tagName === "button"
      ? event.target
      : event.target.parentElement;

  const contact = button.parentElement;
  const list = contact.parentElement;
  const section = list.parentElement;
  const contactsContainer = section.parentElement;

  const sectionHasMoreContacts = getContacts(list).length > 1;

  if (sectionHasMoreContacts) list.removeChild(contact);
  else contactsContainer.removeChild(section);
}
