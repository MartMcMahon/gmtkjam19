var musicFile = document.createElement("audio");
musicFile.preload = "auto";

var src = document.createElement("source");
src.src = "./sfx/re0.mp3";
musicFile.appendChild(src);

musicFile.load();
// musicFile.volume =
musicFile.play();

function playMusic() {
  musicFile.currentTime = 0.01;
  // musicFile.volume
  setTimeout(function() { musicFile.play(); }, 1);
}
