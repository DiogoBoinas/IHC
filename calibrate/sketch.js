var colors;
var capture;
var trackingData;
var x_final;
var y_final;
var bool1 = 0;
var bool2 = 0;
var bool3 = 0;
var bool4 = 0;
var bool5 = 0;

let windowW;
let windowH;

function setup(){  
    windowW = windowWidth;
    windowH = windowHeight;
    createCanvas(windowW,windowH)
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
                x_final, y_final = three_simple(capture.height, capture.width, windowHeight,windowWidth, x, y);
                //console.log(windowWidth);
                //console.log("X Inicial:",x," Y Inicial:",y);
                console.log("X Final:",x_final, " Y Inicial:",y_final);
                draw_rect();
                if(x_final >= 100 && x_final <= 200){
                    if(y_final >= 100 && y_final <=200){
                        console.log("SUCCESS ESQ:CIMA");
                        bool1 = 1;
                    }
                }
                if(x_final >= 100 && x_final <= 200){
                    if(y_final >= 800 && y_final <=900){
                        console.log("SUCCESS ESQ:BAIXO");
                        bool2 = 1;
                    }
                }
                if(x_final >= 1300 && x_final <= 1400){
                    if(y_final >= 100 && y_final <=200){
                        console.log("SUCCESS DIR:CIMA");
                        bool3 = 1;
                    }
                }
                if(x_final >= 1300 && x_final <= 1400){
                    if(y_final >= 800 && y_final <=900){
                        console.log("SUCCESS DIR:BAIXO");
                        bool4 = 1;
                    }
                }
                if(x_final >= 700 && x_final <= 800){
                    if(y_final >= 400 && y_final <=500){
                        console.log("SUCCESS CENTRO");
                        bool5 = 1;
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
    x_final = -((screen_width*x))/cam_width + 2.75*cam_width;
    y_final = (screen_height*y)/cam_height;
    return x_final, y_final;
}

function reversing(x_final,screen_width){
    return screen_width + x_final
}

function draw(){
    if(bool1 == 0){
        rect(100, 100, 100, 100);
    }
    if(bool2 == 0){
        rect(100, 800, 100, 100);
    }
    if(bool3 == 0){
        rect(1300, 100, 100, 100);
    } 
    if(bool4 == 0){
        rect(1300, 800, 100, 100);
    }
    if(bool5 == 0){
        rect(700, 400, 100, 100);
    }
    if(bool1 == 1 && bool2 == 1 && bool3 == 1 && bool4 == 1 && bool5 == 1){
        print("CONAAAAAA");//calibragem done
    }
    push();
    translate(windowW, windowH - capture.height / 2);
    scale(-0.5, 0.5)
    tint(255, 126);
    vid = image(capture, 0 , 0);
    pop();
}