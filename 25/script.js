const YOUTUBE_URL_PREFIX = "https://www.youtube.com/watch?v=";
const historic = [];
let player;
let playerOverlay;
let currentVideoIndex = -1;
const playbutton = document.querySelector("#play-button");
const secureConnection = document.querySelector("#secure-connection");

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function handleToggleSidebar() {
  const sidebar = document.querySelector("aside");
  const isOpen = sidebar.dataset.open === "true";

  sidebar.dataset.open = isOpen ? "false" : "true";
}

function handleWatchPreviousVideo() {
  if (historic.length > 1 && currentVideoIndex > 0) {
    currentVideoIndex--;

    loadVideoFromHistoric();
  }
}

function loadVideoFromHistoric() {
  const previousVideoUrl = historic[currentVideoIndex];

  loadVideo(previousVideoUrl);
}

function loadVideo(url) {
  const videoId = getVideoId(url);

  cleanVideos();
  setPlayButtonIconToPlay();

  playerOverlay = new YT.Player("video-overlay", {
    videoId: videoId,
    playerVars: {
      autohide: 1,
      autoplay: 0,
      controls: 0,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 0,
      mute: 1,
      rel: 0,
      showinfo: 0
    }
  });

  player = new YT.Player("video", {
    videoId: videoId,
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 0,
      rel: 0,
      showinfo: 0
    },
    events: {
      onStateChange: onPlayerStateChange
    }
  });
}

function cleanVideos() {
  let video = document.querySelector("#video");

  if (video.tagName.toLowerCase() === "div") return;

  cleanVideoOverlay();
  cleanVideoContainer();
}

function cleanVideoOverlay() {
  let videoOverlay = document.querySelector("#video-overlay");
  videoOverlay.remove();
  videoOverlay = document.createElement("div");
  videoOverlay.id = "video-overlay";

  const app = document.querySelector("#app");
  app.prepend(videoOverlay);
}

function cleanVideoContainer() {
  const videoContainer = document.querySelector("main");
  videoContainer.innerHTML = '<div id="video"></div>';
}

function setPlayButtonIconToPlay() {
  playbutton.innerHTML = '<i class="ph-bold ph-play-circle"></i>';
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) playerOverlay.playVideo();
  else if (event.data == YT.PlayerState.PAUSED) playerOverlay.pauseVideo();
}

function handleWatchNextVideo() {
  if (historic[currentVideoIndex + 1]) {
    currentVideoIndex++;

    loadVideoFromHistoric();
  }
}

function handleLoadVideo(element) {
  const url = element.value;

  if (isUrlValid(url)) loadVideoFromInput(url);
}

function isUrlValid(url) {
  return url.includes(YOUTUBE_URL_PREFIX);
}

function loadVideoFromInput(url) {
  historic.push(url);

  loadVideo(url);

  currentVideoIndex++;
}

function getVideoId(value) {
  return value.slice(32);
}

function handleMaskUrl(element) {
  if (isUrlValid(element.value)) {
    element.value = "youtube.com";
    secureConnection.style.display = "inline-block";
  } else {
    element.value = "";
    secureConnection.style.display = "none";
  }
}

function handleToggleFullscreen() {
  const iframe = document.getElementById("video");

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    iframe.requestFullscreen();
  }
}

function handleTogglePlay() {
  const playerState = player.getPlayerState();
  const isPlaying = playerState === YT.PlayerState.PLAYING;

  if (isPlaying) {
    player.pauseVideo();
    playerOverlay.pauseVideo();
    setPlayButtonIconToPlay();
  } else {
    player.playVideo();
    playerOverlay.playVideo();
    playbutton.innerHTML = '<i class="ph ph-pause-circle"></i>';
  }
}
