let uploadIntervals = [];
const inputWrapper = document.getElementById('input-wrapper');
const input = document.getElementById('file-input');

input.addEventListener('change', handleFileSelect);

inputWrapper.addEventListener('dragenter', handleDrag);
inputWrapper.addEventListener('dragleave', handleDrag);
inputWrapper.addEventListener('dragover', handleDragOver);
inputWrapper.addEventListener('drop', handleFileDrop);

function handleFileSelect(event) {
  const files = event.target.files;

  if (files.length > 0)
    for (let i = 0; i < files.length; i++) addFileToQueue(files[i]);
}

function handleDrag(event) {
  event.preventDefault();
  inputWrapper.classList.toggle('drag');
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleFileDrop(event) {
  event.preventDefault();
  inputWrapper.classList.remove('drag');

  const files = event.dataTransfer.files;

  if (files.length > 0)
    for (let i = 0; i < files.length; i++) addFileToQueue(files[i]);
}

function addFileToQueue(fileInfo) {
  const files = document.getElementById('files');
  const file = createFile(fileInfo);
  files.appendChild(file);

  upload(file);
}

function createFile(fileInfo) {
  const file = document.createElement('article');
  file.setAttribute('data-size', fileInfo.size);
  file.setAttribute('data-status', 'pending');
  file.appendChild(createFileIcon());
  file.appendChild(createFileContent(fileInfo));

  return file;
}

function createFileIcon() {
  const fileIcon = document.createElement('i');
  fileIcon.classList = 'ph-fill ph-file';

  return fileIcon;
}

function createFileContent(fileInfo) {
  const fileContent = document.createElement('div');
  fileContent.appendChild(createFileHeader(fileInfo));
  fileContent.appendChild(createFileSize(fileInfo));
  fileContent.appendChild(createProgress());

  return fileContent;
}

function createFileHeader(file) {
  const fileHeader = document.createElement('div');
  fileHeader.classList = 'file-header';
  fileHeader.appendChild(createFileName(file));
  fileHeader.appendChild(createCancelButton());

  return fileHeader;
}

function createFileName(file) {
  const fileName = document.createElement('h3');
  fileName.innerText = file.name;

  return fileName;
}

function createCancelButton() {
  const cancelButton = document.createElement('button');
  cancelButton.addEventListener('click', handleCancelUpload);
  cancelButton.appendChild(createHeaderIcon());

  return cancelButton;
}

function createHeaderIcon() {
  const headerIcon = document.createElement('i');
  headerIcon.classList = 'ph ph-x';

  return headerIcon;
}

function createFileSize(file) {
  const fileSize = document.createElement('p');
  fileSize.innerText = `${formatSize(0)} / ${formatSize(file.size)}`;

  return fileSize;
}

function createProgress() {
  const progress = document.createElement('div');
  progress.classList = 'progress';
  progress.appendChild(createProgressBar());
  progress.appendChild(createPercentage());

  return progress;
}

function createProgressBar() {
  const progressBarWrapper = document.createElement('div');
  progressBarWrapper.classList = 'progress-bar-wrapper';

  const progressBar = document.createElement('div');
  progressBar.classList = 'progress-bar';

  progressBarWrapper.appendChild(progressBar);

  return progressBarWrapper;
}

function createPercentage() {
  const percentage = document.createElement('span');
  percentage.innerText = '0%';

  return percentage;
}

function formatSize(size) {
  if (size >= 1000000) return (size / 1000000).toFixed(0) + ' MB';
  else if (size >= 1000) return (size / 1000).toFixed(0) + ' KB';
  else return size + ' KB';
}

function handleCancelUpload(event) {
  const clickedOnTheButton = event.target.tagName === 'BUTTON';
  let button = clickedOnTheButton ? event.target : event.target.parentElement;
  let buttonIcon = event.target;

  if (clickedOnTheButton) {
    buttonIcon =
      file.getAttribute('data-status') === 'pending'
        ? button.querySelector('.ph.ph-x')
        : button.querySelector('.ph.ph-arrow-counter-clockwise');
  }

  let file = clickedOnTheButton
    ? button.parentElement.parentElement
    : button.parentElement.parentElement.parentElement;

  buttonIcon.classList = 'ph ph-arrow-counter-clockwise';

  setUploadAsError(file);

  const fileIntervalId = parseInt(file.getAttribute('data-interval'));
  const fileInterval = uploadIntervals.find((i) => i === fileIntervalId);

  clearInterval(fileInterval);
  uploadIntervals = uploadIntervals.filter((i) => i !== fileInterval);

  setFileSize(file);

  button.addEventListener('click', () => {
    file.setAttribute('data-status', 'pending');
    upload(file);
  });
}

function setUploadAsError(file) {
  file.setAttribute('data-status', 'error');

  const progressBar = file.querySelector('.progress-bar');
  progressBar.style.width = '0%';

  const percentage = [...file.getElementsByTagName('span')][0];
  percentage.innerText = 'Erro';
}

function setFileSize(file) {
  const fileSize = getSizeUploaded(file);

  fileSize.innerText = `${formatSize(getFileSize(file))}`;
}

function getSizeUploaded(file) {
  return [...file.getElementsByTagName('p')][0];
}

function upload(file) {
  let uploadInterval = null;
  let uploadedSize = 0;
  let percentageUploaded = 0;
  const fileSize = getFileSize(file);

  uploadInterval = setInterval(() => {
    uploadedSize = (fileSize * percentageUploaded) / 100;
    updateProgressBar(file, percentageUploaded);
    updateSizeUploaded(file, fileSize, uploadedSize);

    if (percentageUploaded === 100) {
      clearInterval(uploadInterval);
      setUploadAsDone(file);
    }

    percentageUploaded += 20;
  }, 1000);

  uploadIntervals = [...uploadIntervals, uploadInterval];

  file.setAttribute('data-interval', uploadInterval);
}

function getFileSize(file) {
  return parseInt(file.getAttribute('data-size'));
}

function updateSizeUploaded(file, fileSize, uploadedSize) {
  const sizeUploaded = getSizeUploaded(file);

  sizeUploaded.innerText = `${formatSize(uploadedSize)} / ${formatSize(
    fileSize
  )}`;
}

function updateProgressBar(file, percentageUploaded) {
  const progress = file.querySelector('.progress-bar');
  const percentage = [...file.getElementsByTagName('span')][0];

  progress.style.width = `${percentageUploaded}%`;
  percentage.innerText = `${percentageUploaded}%`;
}

function setUploadAsDone(file) {
  file.setAttribute('data-status', 'done');
  [...file.getElementsByTagName('button')][0].remove();
  setFileSize(file);
}
