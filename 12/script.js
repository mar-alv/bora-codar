let filterTags = new Set();
const app = document.getElementById('app');
const sidebar = [...document.getElementsByTagName('nav')][0];
const sidebarButton = document.getElementById('sidebar-button');
const sidebarButtonIcon = [...sidebarButton.getElementsByTagName('i')][0];
const titleInput = document.getElementById('title-input');
const titleInputIcon = document.getElementById('title-input-icon');
const filterInput = document.getElementById('filter-input');
const tasksContainers = [...document.querySelectorAll('.tasks')];

tasksContainers.map((container, i) => {
  const tasks = [...container.getElementsByTagName('article')];

  tasks.map((task, j) => {
    task.addEventListener('focus', () => {
      scrollToItem(tasks, j);
    });
  });
});

function scrollToItem(tasks, index) {
  if (index >= 0 && index < tasks.length)
    tasks[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

titleInput.addEventListener('focus', () => {
  titleInputIcon.style.display = 'none';
});

titleInput.addEventListener('blur', () => {
  titleInputIcon.style.display = 'inline';
});

titleInput.addEventListener('input', () => {
  const text = titleInput.value ? titleInput.value : titleInput.placeholder;

  titleInputIcon.style.left = `${text.length * 2.3}rem`;
});

filterInput.addEventListener('input', handleFilter);

window.addEventListener('resize', () => {
  if (window.innerWidth > 620 && window.innerWidth < 640) closeSidebar();
});

const modal = [...document.getElementsByTagName('dialog')][0];

function handleToggleModal() {
  isModalOpen() ? closeModal() : openModal();
}

function isModalOpen() {
  return modal.getAttribute('data-open') === 'true';
}

function openModal() {
  modal.setAttribute('data-open', 'true');

  document.addEventListener('click', handleClickedOutsideModal);
}

function closeModal() {
  modal.setAttribute('data-open', 'false');

  document.removeEventListener('click', handleClickedOutsideModal);
}

function handleClickedOutsideModal(event) {
  if (
    event?.target.parentElement.id !== 'filter-button' &&
    event?.target.id != 'filter-button' &&
    !modal.contains(event?.target)
  )
    closeModal();
}

function hasClickedOutsideModal(event) {
  const target = event?.target;

  if (!target) return false;

  const filterButton = document.getElementById('filter-button');

  return (
    target !== filterButton &&
    target.parentElement === filterButton &&
    !modal.contains(target)
  );
}

function handleAddFilterTag(tag) {
  filterTags.has(tag) ? filterTags.delete(tag) : filterTags.add(tag);

  handleFilter();
}

function handleFilter() {
  const tasks = [...document.getElementsByTagName('article')];

  tasks.map((i) => {
    const title = getTaskTitle(i);
    const description = getTaskDescription(i);
    const tags = getTaskTags(i);

    i.style.display =
      (!title.includes(filterInput.value) &&
        !description.includes(filterInput.value) &&
        !tags.includes(filterInput.value)) ||
      dontHaveFilterTags(tags)
        ? 'none'
        : 'grid';
  });

  if (tasks.every((i) => i.style.display === 'none')) app.style.height = '100%';
}

function getTaskTitle(task) {
  return [...task.getElementsByTagName('h3')][0].innerText;
}

function getTaskDescription(task) {
  return [...task.getElementsByTagName('p')][0].innerText;
}

function getTaskTags(task) {
  return [...task.querySelector('.tags').getElementsByTagName('span')].map(
    (i) => i.innerText
  );
}

function dontHaveFilterTags(tags) {
  const filterTagsAsArray = [...filterTags];

  return (
    filterTagsAsArray.length && !filterTagsAsArray.some((i) => tags.includes(i))
  );
}

function toggleSidebar() {
  isSidebarOpen() ? closeSidebar() : openSidebar();
}

function isSidebarOpen() {
  return sidebar.getAttribute('data-open') === 'true';
}

function closeSidebar() {
  sidebarButtonIcon.className = 'ph-bold ph-list';
  sidebar.setAttribute('data-open', 'false');
}

function openSidebar() {
  sidebarButtonIcon.className = 'ph-bold ph-arrow-left';
  sidebar.setAttribute('data-open', 'true');
}
