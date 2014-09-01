var audio_dir = "/audio/";

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function loadAudio(url, cb) {
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


window.onload = function() {
  context = new AudioContext();

  loadAudio(song_b, function(src) {
    var lmin = 40;
    var lmax = context.sampleRate / 2;
    var ldiff = lmax - lmin;

    var lowpass = context.createBiquadFilter();
    lowpass.type = 0;
    lowpass.frequency.value = lmax;
    
    var highpass = context.createBiquadFilter();
    highpass.type = 1;
    highpass.frequency.value = 5000;

    $("#lowpass").change(function(){
      // Linear DOES NOT work :(
      lowpass.frequency.value = lmin + (ldiff * (this.value / 100));
    });

    $("#highpass").change(function(){
      // Linear DOES NOT work :(
      highpass.frequency.value = lmin + (ldiff * (this.value / 100));
    });


    src.connect(highpass);
    highpass.connect(context.destination);

    src.start(0);

    debugger;
  });
};
