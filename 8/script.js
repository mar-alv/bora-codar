let totalExpected = 100;
let totalReached = 70;
const totalSalesPercentage = [
  ...document.getElementsByClassName("sales-percentage")
][0];

let monthlyExpected = 70000;
let monthlyReached = 63000;
const monthlySalesPercentage = [
  ...document.getElementsByClassName("sales-percentage")
][1];

const body = [...document.getElementsByTagName("body")][0];

const weekDaysName = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado"
];

totalSalesPercentage.addEventListener("mouseover", hideScrollbar);
totalSalesPercentage.addEventListener("mouseout", showScrollbar);
monthlySalesPercentage.addEventListener("mouseover", hideScrollbar);
monthlySalesPercentage.addEventListener("mouseout", showScrollbar);

function hideScrollbar() {
  body.style.overflow = "hidden";
}

function showScrollbar() {
  body.style.overflow = "auto";
}

totalSalesPercentage.addEventListener("wheel", (e) => {
  setTotalReached(e);
  setSalesPercentage("total");
});

monthlySalesPercentage.addEventListener("wheel", (e) => {
  setMonthlyReached(e);
  setSalesPercentage("monthly");
});

function setTotalReached(e) {
  if (e?.deltaY > 0 && totalReached > 0) {
    totalReached -= (totalExpected * 5) / 100;

    if (totalReached < 0) totalReached = 0;
  } else if (e?.deltaY < 0 && totalReached < totalExpected) {
    totalReached += (totalExpected * 5) / 100;

    if (totalReached > totalExpected) totalReached = totalExpected;
  }
}

function setMonthlyReached(e) {
  if (e?.deltaY > 0 && monthlyReached > 0) {
    monthlyReached -= (monthlyExpected * 5) / 100;

    if (monthlyReached < 0) monthlyReached = 0;
  } else if (e?.deltaY < 0 && monthlyReached < monthlyExpected) {
    monthlyReached += (monthlyExpected * 5) / 100;

    if (monthlyReached > monthlyExpected) monthlyReached = monthlyExpected;
  }
}

function setSalesPercentage(type) {
  const scoreValueIndex = type === "total" ? 2 : 4;
  const salesPercentageValueIndex = type === "total" ? 0 : 1;

  const reached = type === "total" ? totalReached : monthlyReached;
  const expected = type === "total" ? totalExpected : monthlyExpected;

  const salesPercentage =
    type === "total" ? totalSalesPercentage : monthlySalesPercentage;

  const scoreValue = [...document.getElementsByClassName("score-value")][
    scoreValueIndex
  ];
  const totalPercentageValue = [
    ...document.getElementsByClassName("sales-percentage-value")
  ][salesPercentageValueIndex];

  scoreValue.innerText = formatTotal(reached);

  const percentage = getPercentage(reached, expected);

  setPercentage(salesPercentage, percentage);

  totalPercentageValue.innerText = `${percentage}%`;

  setNps();
}

function formatTotal(total) {
  let totalAsString = total.toString();

  if (totalAsString > 999 && totalAsString <= 99999)
    return `R$ ${totalAsString.substring(0, 2)}K`;

  if (totalAsString > 99999 && totalAsString <= 999999)
    return `R$ ${totalAsString.substring(0, 3)}K`;

  return totalAsString;
}

function getPercentage(reached, expected) {
  return (reached * 100) / expected;
}

function setPercentage(element, percentage) {
  element.style.background = `conic-gradient(var(--sales-color) 0% ${percentage}%, var(--expected-sales-color) ${percentage}% 100%)`;
}

function setNps() {
  const nps = getNps();

  if (nps <= 30) setLowNpsIndicator();
  else if (nps > 30 && nps < 60) setMediumNpsIndicator();
  else setHighNpsIndicator();

  setNpsScore(nps);
}

function getNps() {
  const totalNps = (totalReached / totalExpected) * 100;

  const monthlyNps = (monthlyReached / monthlyExpected) * 100;

  let nps = (totalNps + monthlyNps) / 2;

  return Math.max(0, Math.min(100, nps));
}

function setLowNpsIndicator() {
  setNpsIndicator("low");
  setNpsIcon("-sad");
  setNpsDescription("Baixo");
}

function setMediumNpsIndicator() {
  setNpsIndicator("medium");
  setNpsIcon("-meh");
  setNpsDescription("Mediano");
}

function setHighNpsIndicator() {
  setNpsIndicator("high");
  setNpsIcon("");
  setNpsDescription("Excelente!");
}

function setNpsIndicator(indicator) {
  const npsElement = document.getElementById("nps");

  npsElement.setAttribute("data-indicator", indicator);
}

function setNpsIcon(icon) {
  const npsIcon = [...document.getElementsByClassName("ph-fill")][0];

  npsIcon.className = `ph-fill ph-smiley${icon}`;
}

function setNpsDescription(description) {
  const npsDescription = [...document.getElementsByTagName("h1")][0];

  npsDescription.innerText = description;
}

function setNpsScore(nps) {
  const npsScore = [...document.getElementsByClassName("score-value")][0];

  npsScore.innerText = Math.round(nps);
}

setSalesPercentage("total");
setSalesPercentage("monthly");

function getPropertyToChange() {
  return window.innerWidth < 1200 ? "width" : "height";
}
