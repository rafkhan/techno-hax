window.onload = function() {
  console.log("Technohax <3", technohax);

  technohax.loadAudio(technohax.songs.getFree, function(src) {
    var analyser = technohax.context.createAnalyser();
    src.connect(analyser);
    analyser.connect(technohax.context.destination);

    var canvas = document.getElementById("canvas");
    var drawContext = canvas.getContext('2d');

    var HEIGHT = canvas.height;
    var WIDTH = canvas.width;

    var freqDomain = new Uint8Array(analyser.frequencyBinCount);
    
    // Stolen from <3
    // http://chimera.labs.oreilly.com/books/1234000001552/ch05.html#s05_3
    var draw = function() {
      drawContext.fillStyle = "#FFF";
      drawContext.fillRect(0, 0, HEIGHT, WIDTH);

      analyser.getByteFrequencyData(freqDomain);
      for (var i = 0; i < analyser.frequencyBinCount; i++) {
        var value = freqDomain[i];
        var percent = value / 256;
        var height = HEIGHT * percent;
        var offset = HEIGHT - height - 1;
        var barWidth = WIDTH/analyser.frequencyBinCount;
        var hue = i/analyser.frequencyBinCount * 360;

        drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        drawContext.fillRect(i * barWidth, offset, barWidth, height);
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
    src.start(0);
  });
};
