var audio_dir = "/audio/";
var song_a = "My_Nu_Leng-The_Grid_Original_Mix.mp3";
var song_b = "Get Free (Andy C Remix).mp3";


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

  var request = new XMLHttpRequest();
  request.open("GET", audio_dir + song_b, true);
  request.responseType = "arraybuffer";

  request.onload = function() {
    context.decodeAudioData(request.response,
        function(buf) {
          test(buf);
        });
  };

  request.send();
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

