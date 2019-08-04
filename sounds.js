// var musicFile = document.createElement("audio");
// musicFile.preload = "auto";

// var src = document.createElement("source");
// src.src = "./sfx/re0.mp3";
// musicFile.appendChild(src);

// musicFile.load();
// // musicFile.volume =
// musicFile.play();

// function play() {
//   musicFile.currentTime = 0.01;
//   // musicFile.volume
//   setTimeout(function() { musicFile.play(); }, 1);

// }


var context;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }


  loadDogSound('./sfx/re0.mp3');
  playSound(dogBarkingBuffer);
}

var dogBarkingBuffer = null;
function loadDogSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      dogBarkingBuffer = buffer;
    }, onError);
  }
  request.send();
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
                                             // note: on older systems, may have to use deprecated noteOn(time);
}
