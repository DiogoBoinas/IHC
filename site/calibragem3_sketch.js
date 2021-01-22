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
let img;
let windowW;
let windowH;
let img1;

let timerOn=true;
let timer=0;

let fase=0;

function setup(){
    img1 = loadImage("gloves.jpeg")
    windowW = windowWidth;
    windowH = windowHeight;
    createCanvas(windowW,windowH)
    capture = createCapture(VIDEO); //capture the webcam
    capture.id("cap");



    rato=loadImage("images/rato.png");
    folha1= loadImage('images/calibragem/visto2.png');
    folha2= loadImage('images/calibragem/popup2.png');
    folha3= loadImage('images/calibragem/visto3.png');

    popup1= loadImage('images/calibragem/folha2.png');
    popup2= loadImage('images/calibragem/folha3.png');




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
                if(x_final >= 200 && x_final <= 300){
                    if(y_final >= 300 && y_final <=400){
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
                if(x_final >= 1000 && x_final <= 1100){
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
                if(bool1 == 1 && bool3 == 1 && bool5 == 1){
                    fase=2;
                    timerOn=true;
                }
            });
        }
    });
    tracking.track('#cap', colors);
}

function draw_rect(){
    push()
    image(rato,x_final,y_final,50,50);}

function three_simple(cam_height, cam_width, screen_height, screen_width, x, y){
    x_final = -((screen_width*x))/cam_width + 3*cam_width - 500;
    y_final = (screen_height*y)/cam_height + 100;
    return x_final, y_final;
}

function reversing(x_final,screen_width){
    return screen_width + x_final
}

function draw(){
    clear()
    if (timerOn){
        timer++;
    }

    if (timer<300){
        fase=0;
    }

    if(timer===300){
        fase=1;
        timerOn=false;
    }


    push();
    //tint(255, 126);
    translate(windowW,0);
    scale(-1,1);
    vid = image(capture, 0 , 0,windowW,windowH);
    pop();
    draw_rect();

    if (fase===0){
        image(folha2,0,0,windowW,windowH);
    }else if (fase===1){
        image(folha1,0,0,windowW,windowH);
        if(bool1 == 0){
            rect(200, 300, 100, 100);
        }else{
            push();
            fill(0,220,50);
            rect(200, 300, 100, 100);
            pop();
        }

        if(bool3 == 0){
            rect(1000, 100, 100, 100);
        }else{
            push();
            fill(0,220,50);
            rect(1000, 100, 100, 100);
            pop();
        }

        if(bool5 == 0){
            rect(700, 400, 100, 100);
        }else{
            push();
            fill(0,220,50);
            rect(700, 400, 100, 100);
            pop();
        }
    }

    if (fase===2){
        if (timer>300 && timer<500){
            image(folha3,0,0,windowW,windowH);
            image(popup1,windowW/2 - folha1.width/4,windowH/2 - folha1.height/4,folha1.width/2,folha1.height/2);
        }else if (timer>500 && timer<700){
            image(folha3,0,0,windowW,windowH);
            image(popup2,windowW/2 - folha1.width/4,windowH/2 - folha1.height/4,folha1.width/2,folha1.height/2);
        }else if (timer===700){
            window.location.replace("diario.html");
        }

    }


    pop()

}