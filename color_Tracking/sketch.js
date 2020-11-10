var colors;
var capture;
var trackingData;

function setup() {
  createCanvas(windowWidth,windowHeight)
  capture = createCapture(VIDEO); //capture the webcam
  //capture.position(0,0) //move the capture to the top left
  capture.style('opacity',0.5)// use this to hide the capture later on (change to 0 to hide)...
  //capture.id("myVideo"); //give the capture an ID so we can use it in the tracker below.
  capture.hide()
  capture.id("cap")
  
  colors = new tracking.ColorTracker(['magenta']);
  tracking.track("#cap", colors); // start the tracking of the colors above on the camera in p5
  //start detecting the tracking
  colors.on('track', function(event) { //this happens each time the tracking happens
      trackingData = event.data // break the trackingjs data into a global so we can access it with p5
  });
}


function draw() {
  //x varia entre 0 esquerda e ~618 direita
  //y varia entr e 0 cima e ~458 baixo
  total_side_movement = 0
  translate(capture.width, 0);
  scale(-1, 1)
  image(capture, 0 , 0);
  if(trackingData){ //if there is tracking data to look at, then...
    for (var i = 0; i < trackingData.length; i++) { //loop through each of the detected colors
      // console.log( trackingData[i] )
      rect(trackingData[i].x,trackingData[i].y,trackingData[i].width,trackingData[i].height)
     
      console.log(trackingData[i].x)
      //console.log(max(trackingData[i].y,total_side_movement))
      total_side_movement = 0

    }
    //console.log(trackingData[0])
    //console.log(trackingData[-1])
  }
  

}