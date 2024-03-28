const YOUTUBE_URL_PREFIX = 'https://www.youtube.com/watch?v=';
let player;

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function handleLoadVideo(element) {
  const url = element.value;

  if (isUrlValid(url)) loadVideo(url);
}

function isUrlValid(url) {
  return url.includes(YOUTUBE_URL_PREFIX);
}

function loadVideo(url) {
  const videoId = getVideoId(url);

  player = new YT.Player('video', {
    videoId: videoId,
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 0,
      rel: 0,
      showinfo: 0
    },
    events: {}
  });
}

function getVideoId(value) {
  return value.slice(32);
}
