var testSong = document.createElement("audio");
testSong.preload = "auto";

var backgroundTracks = [];


var src = document.createElement("source");
src.src = "./sfx/re0.mp3";
testSong.appendChild(src);
testSong.load();

function playMusic() {
  testSong.currentTime = 0.01;
  setTimeout(function() { testSong.play(); }, 1);
  document.getElementById("music-button").innerText = "playing";
}

