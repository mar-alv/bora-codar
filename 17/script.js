const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

let initialDay = null;
let finalDay = null;

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez"
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const app = document.getElementById("app");

function handlePreviousPeriod() {
  currentMonth = (currentMonth - 1 + 12) % 12;

  if (currentMonth === 11) currentYear--;

  setCalendar();
}

function handleChoosePeriod() {
  const choosePeriodButton = document.querySelector("#choose-period-button");
  choosePeriodButton.innerText = currentYear;

  if (app.classList.contains("app-days")) setMonths();
  else {
    setCurrentMonthAndYear();
    setCalendar();
  }
}

function setMonths() {
  app.classList = "app-months";
  calendar.innerHTML = "";

  let i = 0;

  while (i < months.length) {
    const row = document.createElement("tr");
    row.classList.add("month-row");

    [...Array(3)].map((_, j) => {
      const month = document.createElement("td");
      month.classList.add("month");

      const button = document.createElement("button");
      button.innerText = months[i];
      button.setAttribute("data-month", i);
      button.addEventListener("click", handleChooseMonth);

      month.appendChild(button);
      row.appendChild(month);

      month.setAttribute(
        "data-selected",
        isMonthWithinPeriod(i) ? "true" : "false"
      );

      i++;
    });

    calendar.appendChild(row);
  }
}

function handleChooseMonth(event) {
  const month = parseInt(event.target.getAttribute("data-month"));
  currentMonth = month;

  setCalendar();
}

function isMonthWithinPeriod(monthIndex) {
  return (
    getDate(initialDay)?.getMonth() === monthIndex ||
    getDate(finalDay)?.getMonth() === monthIndex
  );
}

function handleNextPeriod() {
  currentMonth = (currentMonth + 1) % 12;

  if (currentMonth === 0) currentYear++;

  setCalendar();
}

function setCurrentMonthAndYear() {
  const choosePeriodButton = document.querySelector("#choose-period-button");
  const currentMonthName = getCurrentMonthName();
  choosePeriodButton.innerHTML = '<i class="ph-fill ph-caret-down"></i>';
  choosePeriodButton.prepend(`${currentMonthName} ${currentYear}`);
}

function getCurrentMonthName() {
  const currentMonthName = new Date(
    currentYear,
    currentMonth,
    1
  ).toLocaleDateString("pt-br", { month: "long" });
  const capitalizedMonthName =
    currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

  return capitalizedMonthName;
}

function setCalendar() {
  app.classList = "app-days";

  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  calendar.appendChild(setWeek());

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const startDate = new Date(firstDay);
  startDate.setDate(1 - startDate.getDay());
  const endDate = new Date(lastDay);
  endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const weekRow = document.createElement("tr");

    [...Array(7)].map((_, i) => {
      const button = document.createElement("button");
      button.innerText = currentDate.getDate();
      button.addEventListener("click", handleSelectDay);

      let td = document.createElement("td");

      if (currentDate.toISOString() === getDate(initialDay)?.toISOString())
        td = initialDay;
      else if (currentDate.toISOString() === getDate(finalDay)?.toISOString())
        td = finalDay;
      else {
        td.appendChild(button);
        td.classList.add("day");
        td.setAttribute("data-date", currentDate);
      }

      if (currentDate.getMonth() !== currentMonth)
        td.classList.add("extra-day");

      weekRow.appendChild(td);

      currentDate.setDate(currentDate.getDate() + 1);
    });

    calendar.appendChild(weekRow);
  }

  if (initialDay && finalDay) setPeriod();

  app.appendChild(calendar);

  setCurrentMonthAndYear();
}

function setWeek() {
  const weekHeader = document.createElement("tr");

  weekDays.map((i) => {
    const day = document.createElement("th");
    day.innerText = i;
    weekHeader.appendChild(day);
  });

  return weekHeader;
}

function handleSelectDay(event) {
  const day = event.target.parentElement;
  const date = getDate(day);

  const initialDate = getDate(initialDay);
  const finalDate = getDate(finalDay);

  if (
    !!initialDate &&
    ((!finalDate && date.toISOString() !== initialDate?.toISOString()) ||
      date.toISOString() > initialDate?.toISOString())
  )
    finalDay = day;

  if (!initialDate || date.toISOString() < initialDate?.toISOString())
    initialDay = day;

  toggleSelectedDay(day);

  if (initialDay && finalDay) setPeriod();
}

function getDate(day) {
  return day ? new Date(day.getAttribute("data-date")) : null;
}

function setPeriod() {
  const days = [...document.querySelectorAll(".day")];

  let initialDayIndex = days.findIndex((i) => i === initialDay);

  if (initialDayIndex === -1) initialDayIndex = 0;

  const finalDayIndex = days.indexOf(finalDay);

  days.map((i) => {
    i.setAttribute("data-selected", "false");
  });

  for (let i = initialDayIndex; i <= finalDayIndex; i++) {
    days[i].setAttribute("data-selected", "true");

    if (days[i] === initialDay) days[i].setAttribute("data-period", "initial");
    else if (days[i] === finalDay) days[i].setAttribute("data-period", "final");
    else days[i].setAttribute("data-period", "inBetween");
  }
}

function toggleSelectedDay(day) {
  day.setAttribute("data-selected", isDaySelected(day) ? "false" : "true");
}

function isDaySelected(day) {
  return day.getAttribute("data-selected") === "true";
}

setCalendar();
