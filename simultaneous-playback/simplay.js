var audio_dir = "/audio/";
var song_a = audio_dir + "My_Nu_Leng-The_Grid_Original_Mix.mp3";
var song_b = audio_dir + "Get Free (Andy C Remix).mp3";


window.onload = function() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  function test(buf) {
    var src1 = context.createBufferSource();
    src1.buffer = buf;
    src1.connect(context.destination);
    src1.start(0);

    return;
  }

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

  loadAudio(song_a, function(s1) {
    loadAudio(song_b, function(s2) {
      s1.connect(context.destination);
      s2.connect(context.destination);

      $("#a").click(function() {
        s1.start(0);
      });

      $("#b").click(function() {
        s2.start(0);
      });

      console.log("ready for playback!");
    });
  });

};


function wad() {
  window.wa = new Wad({source : audio_dir + song_a});
  window.wb = new Wad({source : audio_dir + song_b});

  console.log("x");

  $("#a").click(function() {
    wa.play();
  });

  $("#b").click(function() {
    wb.play();
  });
}

