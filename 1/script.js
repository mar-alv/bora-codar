const players = [];
const playerProgress = [...document.querySelectorAll('.player-progress')];

function setProgressBar(playerIndex) {
  const progressBar = document.querySelectorAll('.player-progress-bar')[playerIndex];
  
  if (progressBar)
    progressBar.style.width = `${getSongPercentage(playerIndex)}%`;
}

function getSongPercentage(playerIndex) {
  const player = players[playerIndex];
  
  return player.elapsedSeconds * 100 / player.durationInSeconds;
}

function playTimer(player) {
  if (player.elapsedSeconds === player.durationInSeconds) {
    clearInterval(player.interval);
    updatePlayOrPauseIcon(player);
  }
  else {
    player.elapsedSeconds++;
    updateProgressTime(player.id, player.elapsedSeconds, 1);
  }
  
  setProgressBar(player.id);
}

function updateProgressTime(playerIndex, timeToBaseOn, elementToChangeIndex) {
  const minutes = getFormattedMinutes(timeToBaseOn);
  const seconds = getFormattedSeconds(timeToBaseOn);
  
  const progress = playerProgress[playerIndex];
  
  if (progress)
    progress.querySelector('.player-progress-time')
            .getElementsByTagName('p')[elementToChangeIndex]
            .innerText = `${minutes}:${seconds}`;
}

function getFormattedMinutes(time) {
  const minutes = Math.floor(time / 60);

  return minutes < 10 ? `0${minutes}` : minutes;
}

function getFormattedSeconds(time) {
  const seconds = time % 60;
  
  return seconds < 10 ? `0${seconds}` : seconds;
}

function fastBackward(playerIndex) {
  const player = players[playerIndex];
  
  player.elapsedSeconds -= 5;
  
  if (player.elapsedSeconds < 0)
    player.elapsedSeconds = 0;
  
  setProgressBar(playerIndex);
  updateProgressTime(playerIndex, player.elapsedSeconds, 1);
}

function playOrPause(playerIndex) {
  const player = players[playerIndex];
  
  updatePlayOrPauseIcon(player);
  
  if (player.isPlaying) {
    player.isPlaying = false;
    clearInterval(player.interval);
  }
  else {
    player.isPlaying = true
    player.interval = setInterval(() => { 
      playTimer(player)
    }, 1000);
  }
}

function updatePlayOrPauseIcon(player) {
  const icon = player.isPlaying ? 'ph-fill ph-play' : 'ph-fill ph-pause';
  
  document.getElementById(`play-${player.id}`).className = icon;
}

function fastForward(playerIndex) {
  const player = players[playerIndex];
  
  player.elapsedSeconds += 5;
  
  if (player.elapsedSeconds > player.durationInSeconds)
    player.elapsedSeconds = player.durationInSeconds;
  
  setProgressBar(playerIndex);
  updateProgressTime(playerIndex, player.elapsedSeconds, 1);
}

function setPlayers() {
  const verticalPlayer = {
    id: 0,
    title: 'Acorda Devinho',
    artist: 'Banda Rocketseat',
    durationInSeconds: 200,
    elapsedSeconds: 0,
    isPlaying: false,
    interval: null
  };
  
  const horizontalPlayer1 = {
    id: 1,
    title: 'Faaala Devinho',
    artist: 'Grupo Rocketseat',
    durationInSeconds: 100,
    elapsedSeconds: 0,
    isPlaying: false,
    interval: null
  };
  
  const horizontalPlayer2 = {
    id: 2,
    title: 'Bora Devinho',
    artist: 'Galera Rocketseat',
    durationInSeconds: 50,
    elapsedSeconds: 0,
    isPlaying: false,
    interval: null
  };
  
  players[0] = verticalPlayer;
  players[1] = horizontalPlayer1;
  players[2] = horizontalPlayer2;
}

function setTitles() {
  [...document.getElementsByTagName('header')].map((i, index) => {
    i.getElementsByTagName('h2')[0].innerText = players[index].title;
    i.getElementsByTagName('h3')[0].innerText = players[index].artist;
    
    return i;
  })
}

function setSongDuration() {
   playerProgress.map((i, index) => updateProgressTime(index, players[index].durationInSeconds, 0));
}

setPlayers();
setTitles();
setSongDuration();
