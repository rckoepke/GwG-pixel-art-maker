Add these to HTML:
// <video id="videoFeed" autoplay></video>
// <button id="capture">Use Webcam</button>
// <canvas id="stillImage" width=320 height=240></canvas>


  const player = document.getElementById('videoFeed');
  const canvas = document.getElementById('stillImage');
  const context = canvas.getContext('2d');
  const captureButton = document.getElementById('capture');

  const constraints = {
    video: true,
  };

  captureButton.addEventListener('click', () => {
   // context.drawImage(player, 0, 0, canvas.width, canvas.height);
let status = $('#capture').html();
if (status == "Use Webcam") {

  $('#videoFeed').toggle(true);
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
});

  $('#capture').html("Capture");
}
else{

  context.drawImage(player, 0, 0, canvas.width, canvas.height);

  // from https://developers.google.com/web/fundamentals/media/manipulating/live-effects
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // my own code:
  // iterative method not desired
  /*
  for (var pixIndex = 0; pixIndex < (canvas.width * canvas.height); pixIndex++) {
    const red = pixels[pixIndex];
    const green = pixels[pixIndex + 1];
    const blue = pixels[pixIndex + 2];
    const alpha = pixels[pixIndex + 3];
  }
*/
  let redPixels = pixels.filter((_,i) => i % 4 === 0);
  let greenPixels = pixels.filter((_,i) => i-1 % 4 === 0);
  let bluePixels = pixels.filter((_,i) => i-2 % 4 === 0);
  let alphaPixels = pixels.filter((_,i) => i-3 % 4 === 0);

  let redSum = redPixels.reduce((total,indexVal) => total+indexVal);
  let greenSum = greenPixels.reduce((total,indexVal) => total+indexVal);
  let blueSum = bluePixels.reduce((total,indexVal) => total+indexVal);
  let alphaSum = alphaPixels.reduce((total,indexVal) => total+indexVal);

  let redMean= redSum/redPixels.length; //average
  let greenMean= greenSum/greenPixels.length; //average
  let blueMean= blueSum/bluePixels.length; //average
  let alphaMean= alphaSum/alphaPixels.length; //average

  console.log("redMean = " + redMean);
  console.log("greenMean = " + greenMean);
  console.log("blueMean = " + blueMean);
  console.log("alphaMean = " + alphaMean);

  var a = redMean.toFixed(0);
  var b = greenMean.toFixed(0);
  var c = blueMean.toFixed(0);
  let meanColor  = 'rgb(' + [a,b,c].join(',') + ')';
  //document.body.style.backgroundColor= meanColor;

  // Stop all video streams.
player.srcObject.getVideoTracks().forEach(track => track.stop());

  $('#capture').html("Use Webcam");

  const constraints = {
    video: false,
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
});
  $('#videoFeed').toggle(false);
  }});