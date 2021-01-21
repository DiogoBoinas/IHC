var colors;
var capture;
var x_final=0;
var y_final=0;
var trackingData;
let img;
let img1;
let interaction = 0;
let interacting = false;
let n_movimentos;
let movimentos_executar=[];
var movimento_atual=0;
let moves = ['left','right','up','down','downright','downleft','upright','upleft'];

let windowW;
let windowH;

let fundo;
let espantalho;
let espantalho2;
let milho;

let selecting=false;
let timerSelect=false;

let audio;
let playing=false;

let timer=0;
let timerOn=true;
let fade1=0;
let anim=0;
let interacted=false;

let redirect=false;

var rato;
var ratoSelecting;


function preload(){
    audio=loadSound('../audio/int3/feiticeiro_espantalho.wav');
}

function setup() {
    windowW= windowWidth;
    windowH= windowHeight;

  createCanvas(windowWidth,windowHeight);

  capture = createCapture(VIDEO); //capture the webcam
  capture.id("cap")

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
                if(x_final <= (2/5)*windowW + 200 && x_final >= (2/5)*windowW){
                    if(y_final >= (1/5)*windowH && y_final <=(1/5)*windowH+200){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>20){
                            interacted=true;
                            if(playing===false){
                                audio.play();
                            }
                            playing=true;
                        }
                    }
                }else{
                    selecting=false;
                    timerSelect=0;
                }

            });
        }
    });
    tracking.track('#cap', colors);


    rato=loadImage("../images/rato.png");
    ratoSelecting=loadImage("../images/rato_select.png");


  fundo=loadImage("../images/int3/fundo-personagens.png");
  espantalho=loadImage("../images/int3/espantalho1.png");
  espantalho2=loadImage("../images/int3/espantalho2.png");
  espantalho3=loadImage("../images/int3/espantalho3.png");
  espantalho4=loadImage("../images/int3/espantalho4.png");
  alfinetes=loadImage("../images/int3/alfinetes-cursor.png");

}

function draw() {
  //x varia entre 0 esquerda e ~618 direita
  //y varia entr e 0 cima e ~458 baixo

    if (timerOn) timer++;
    console.log(timer);


  total_side_movement = 0
    image(fundo,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
  if (timer>10 && interacted===false){
      push();
      tint(255,fade1);
      image(espantalho,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      if (fade1<255 && interacted===false) fade1+=20;
      pop();
  }

  if (timer>50){
      push();
      tint(255,255 - fade1);
      image(espantalho2,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      if (fade1>0 && interacted===false) fade1-=50;
      timerOn=false;
      pop();
  }

  if (interacted===true){
      push();
      tint(255,fade1);
      image(espantalho3,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      if (fade1<255 && anim===0) fade1+=30;
      pop();
      timerOn=true;
  }

  if (timer>100){
      anim++;
      push();
      tint(255,255 - fade1);
      image(espantalho4,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      if (fade1>0) fade1-=30;
      pop();
  }


    audio.onended(function(){
        if (redirect===false){
            window.location.replace("potions.html");
            redirect=true;
        }
    });
    draw_rect();


    push();
    translate(windowW, windowH - capture.height / 2);
    scale(-0.5, 0.5);
    //tint(255, 126);
    vid = image(capture, 0 , 0);
    pop();



}

function draw_rect(){
    if (selecting){
        push();
        image(alfinetes,x_final,y_final,50,50);
        pop();
    }else{
        image(alfinetes,x_final,y_final,50,50);
    }
}

function getParallaxX(dif){
    return map(x_final,0,windowW,-dif,dif,true);
}

function getParallaxY(dif){
    return map(y_final,0,windowH,-dif,dif,true);
}

function three_simple(cam_height, cam_width, screen_height, screen_width, x, y){
    x_final = - ((screen_width*x))/cam_width + 2*cam_width;
    y_final = (screen_height*y)/cam_height;
    return x_final, y_final;
}

function reversing(x_final,screen_width){
    return screen_width + x_final;
}
