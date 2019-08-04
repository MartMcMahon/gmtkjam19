var testSong = document.createElement("audio");
testSong.preload = "auto";

var backgroundTracks = [];

var src = document.createElement("source");
src.src = "./sfx/ambient.mp3";
testSong.appendChild(src);
testSong.load();

var musicIsPlaying = false;
function toggleMusic() {
  testSong.currentTime = 0.01;
  if (musicIsPlaying) {
    testSong.volume = 0;
    musicIsPlaying = false;
    document.getElementById("music-button").innerText = "muted";
  } else {
    setTimeout(function() { testSong.play(); }, 1);
    document.getElementById("music-button").innerText = "playing";
    musicIsPlaying = true;
  }
}

