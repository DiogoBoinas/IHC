var colors;
var capture;
var trackingData;
var x_final;
var y_final;

var rato;
var ratoSelecting;
var fundo;

var sair;

var pag;
var menos=0;
var mais=0;
var entrar=0;

let selecting=false;
let timerSelect=0;

let timer=0;
let timerOn=true;

let fase=0;
let hasObject=false;



function setup(){  
    createCanvas(windowWidth,windowHeight)
    capture = createCapture(VIDEO); //capture the webcam
    capture.id("cap");
    windowW= windowWidth;
    windowH= windowHeight;
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
                if (hasObject===false){
                    if (x_final>0 && y_final>0){
                        fase=1;
                        hasObject=true;
                        timerOn=true;
                    }
                }

            });
        }
    });
    tracking.track('#cap', colors);

    rato=loadImage("images/rato.png");
    ratoSelecting=loadImage("images/rato_select.png");

    //paginas
    fundo = loadImage('images/calibragem/mesa.png');
    moldura1 = loadImage('images/calibragem/calibragemprincipal.png');
    moldura2 = loadImage('images/calibragem/popup1.png');

    folha1= loadImage('images/calibragem/folha1.png');




}

function draw_rect(){
    push();
    if (selecting){
        image(ratoSelecting,x_final,y_final,50,50);
    }else{
        image(rato,x_final,y_final,50,50);
    }

}

function three_simple(cam_height, cam_width, screen_height, screen_width, x, y){
    x_final = - ((screen_width*x))/cam_width + 2.25*cam_width;
    y_final = (screen_height*y)/cam_height;
    return x_final, y_final;
}

function reversing(x_final,screen_width){
    return screen_width + x_final;
}

function draw(){
    clear();
    if (timerOn){
        timer++;
    }




    push();
    //tint(255, 126);
    translate(windowW,0);
    scale(-1,1);
    vid = image(capture, 0 , 0,windowW,windowH);
    pop();



    if (fase===0){
        image(moldura1,0,0,windowW,windowH);
    }else if (fase===1){
        image(moldura2,0,0,windowW,windowH);
    }

    if (timer<400){
        image(folha1,windowW/2 - folha1.width/4,windowH/2 - folha1.height/4,folha1.width/2,folha1.height/2);
        timerOn=false;
    }

    if (timer>600){
        window.location.replace("calibragem2.html");
    }

    console.log(timerSelect);




    draw_rect();




}

function getParallaxX(dif){
    return map(x_final,0,windowW,-dif,dif,true);
}

function getParallaxY(dif){
    return map(y_final,0,windowH,-dif,dif,true);
}
