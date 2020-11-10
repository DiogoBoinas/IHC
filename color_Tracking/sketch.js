var colors;
var capture;
var trackingData;

function setup() {

  createCanvas(windowWidth,windowHeight)

  capture = createCapture(VIDEO); //capture the webcam
  capture.id("cap")
  
  let moves = ['left','right','up','down']

  y_moves = 0;
  x_moves = 0;

  var colors = new tracking.ColorTracker(['cyan']);

  colors.on('track', function(event) {
    if (event.data.length === 0) {
      // No colors were detected in this frame.
      console.log("Nothing")
    } else {
      event.data.forEach(function(rect) {
        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
      });
    }
  });

  tracking.track('#cap', colors);
}


function draw() {
  //x varia entre 0 esquerda e ~618 direita
  //y varia entr e 0 cima e ~458 baixo

  total_side_movement = 0
  translate(capture.width, 0);
  scale(-1, 1)
  tint(255, 126);
  vid = image(capture, 0 , 0);

}