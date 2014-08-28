var audio_dir = "/audio/";
var song_a = audio_dir + "My_Nu_Leng-The_Grid_Original_Mix.mp3";
var song_b = audio_dir + "Get Free (Andy C Remix).mp3";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

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
    lowpass.type = 0; //set to lowpass
    lowpass.frequency.value = 440;

    $("#lowpass").change(function(){
      // Linear DOES NOT work :(
      lowpass.frequency.value = lmin + (ldiff * (this.value / 100));
    });

    src.connect(lowpass);
    lowpass.connect(context.destination);

    src.start(0);

    debugger;
  });
};
