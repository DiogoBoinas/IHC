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
  var atual_x=620//valor inicial da esquerda
  var colors = new tracking.ColorTracker(['magenta']);

  colors.on('track', function(event) {
   
    if (event.data.length === 0) {
      // No colors were detected in this frame.
      console.log("Nothing")
    } else {
      event.data.forEach(function(rect) {
        if(rect.x<atual_x){ //se o valor que aparecer for mais pequeno que o x atual, estamos a ir para a direita, pois o x vai de 600 e tal -> para 0
          console.log("ir para a direita")
        }else if(rect.x>atual_x){ //se o valor que aparecer for maior que o x atual estamos a ir para a esquerda pois o x vai de 600 <-0
          console.log("ir para a esquerda")
        }else{
          ("igual x")
        }
        
        atual_x=rect.x
        console.log("valor atual "+ atual_x);
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