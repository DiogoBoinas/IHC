var colors;
var capture;
var trackingData;
var x_final=0;
var y_final=0;

var rato;
var ratoSelecting;
var caminhos;

var sair;

var pag;
var menos=0;
var mais=0;
var entrar=0;

let selecting=false;
let timerSelect=0;



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
                if(x_final <= (1/20)*windowW + 100 && x_final >= (1/20)*windowW){
                    if(y_final >= (3/7)*windowH && y_final <=(3/7)*windowH+100){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>50)  window.location.replace("espantalho.html");
                    }
                }else if(x_final <= (9/20)*windowW + 100 && x_final >= (9/20)*windowW){
                    if(y_final >= (3/7)*windowH && y_final <=(3/7)*windowH+100){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>50)  window.location.replace("robo.html");
                    }
                }else if(x_final <= (17/20)*windowW + 100 && x_final >= (17/20)*windowW){
                    if(y_final >= (3/7)*windowH && y_final <=(3/7)*windowH+100){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>50)  window.location.replace("leao.html");
                    }
                }else if(x_final <= windowW-sair.width - 10 + sair.width && x_final >= windowW-sair.width - 10){
                    if(y_final >= 10 && y_final <=10+sair.height){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>50)  window.location.replace("../diario.html");
                    }
                }else{
                    timerSelect=0;
                    selecting=false;
                }

            });
        }
    });
    tracking.track('#cap', colors);

    rato=loadImage("../images/rato.png");
    ratoSelecting=loadImage("../images/rato_select.png");

    //paginas
    caminhos = loadImage('../images/int1/caminhos.png');

    sair=loadImage("../images/cruz.png");


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

    image(caminhos,-50+getParallaxX(10),-50+getParallaxY(10),windowW+100,windowH+100);
    console.log(timerSelect);
    image (sair,windowW-sair.width - 10,10);




    draw_rect();
    push();
    translate(windowW, windowH - capture.height / 2);
    scale(-0.5, 0.5);
    //tint(255, 126);
    vid = image(capture, 0 , 0);




}

function getParallaxX(dif){
    return map(x_final,0,windowW,-dif,dif,true);
}

function getParallaxY(dif){
    return map(y_final,0,windowH,-dif,dif,true);
}
