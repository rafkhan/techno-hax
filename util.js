window.AudioContext = window.AudioContext || window.webkitAudioContext;

window.requestAnimationFrame = (function(){
  return window.requestAnimationFrame  ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

(function() {

  var AUDIO_DIR = "/audio/";
  var context = new AudioContext();

  window.technohax = {

    context: context,

    songs : {
      theGrid: AUDIO_DIR + "My_Nu_Leng-The_Grid_Original_Mix.mp3",
      getFree: AUDIO_DIR + "Get Free (Andy C Remix).mp3",
    },

    loadAudio : function(url, cb) {
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      request.onload = function() {
        context.decodeAudioData(request.response,
            function(buf) {
              var src = context.createBufferSource();
              src.buffer = buf;
              cb(src);
            });
      };

      request.send();
    }
  };
})();
