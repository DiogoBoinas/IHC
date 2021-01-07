var colors;
var capture;
var trackingData;
var x_final;
var y_final;

function setup(){  
    createCanvas(windowWidth,windowHeight)
    capture = createCapture(VIDEO); //capture the webcam
    capture.id("cap");
    var colors = new tracking.ColorTracker(['cyan']);
    colors.on('track', function(event) {
        if (event.data.length === 0) {
            console.log("Nothing")
        }else{
            event.data.forEach(function(rect) {
                x = rect.x;
                y = rect.y;
                x_final, y_final = three_simple(458, 618, windowHeight,windowWidth, x, y);
                //console.log(windowWidth);
                //console.log("X Inicial:",x," Y Inicial:",y);
                console.log("X Final:",x_final, " Y Inicial:",y_final);
                draw_rect();
                if(x_final <= -67 && x_final >= -122){
                    if(y_final >= 500 && y_final <=555){
                        console.log("SUCCESS 55");
                    }
                }
                if(x_final <= -67 && x_final >= -167){
                    if(y_final >= 600 && y_final <=700){
                        console.log("SUCCESS 100");
                    }
                }
            });
        }
    });
    tracking.track('#cap', colors);
}

function draw_rect(){
    clear();
    rect(x_final, y_final, 10, 10);
}

function three_simple(cam_height, cam_width, screen_height, screen_width, x, y){
    x_final = ((screen_width*x))/cam_width - 2*cam_width;
    y_final = (screen_height*y)/cam_height;
    return x_final, y_final;
}

function reversing(x_final,screen_width){
    return screen_width + x_final
}

function draw(){
    rect(685, 500, 55, 55);
    rect(685, 600, 100, 100);
    translate(capture.width, 0);
    scale(-1, 1)
    tint(255, 126);
    vid = image(capture, 0 , 0);
}