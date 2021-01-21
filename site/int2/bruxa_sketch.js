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

var rato;
var ratoSelecting;

let windowW;
let windowH;

let selecting=false;
let timerSelect=0;

let fundo1;
let tras1;
let tras2;
let tras3;
let tras_agua;
let meio1;
let meio2;
let meio3;
let meio_agua;
let frente1;
let frente_agua;
let chao1;
let chaoagua;
let bruxa1;
let bruxa2;
let bruxa3;
let bruxa_agua;
let lenha1;
let lenha2;
let lenha3;
let pedra1;
let pedra2;
let pedra3;
let agua1;
let agua2;

let objetoEscolhido;
// 0=pedra 1=tronco 2=agua
let anim=0;
let startedAnimation=false;

let audio1;
let audio2;
let playing=false;

var sair;



let timer=0;
let timerOn=true;
let fade1=0;
let fade2=0;
let interacted=false;

function preload(){
    audio2=loadSound('../audio/int2/bruxa2.wav');
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
                if(x_final <= (3/20)*windowW + 200 && x_final >= (3/20)*windowW){
                    if(y_final >= (6/8)*windowH && y_final <=(6/8)*windowH+200){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>20){
                            objetoEscolhido=0;
                            startedAnimation=true;
                            anim=1;
                        }
                    }
                }else if(x_final <= (8/20)*windowW + 200 && x_final >= (8/20)*windowW){
                    if(y_final >= (6/8)*windowH && y_final <=(6/8)*windowH+200){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>20){
                            objetoEscolhido=1;
                            startedAnimation=true;
                            anim=1;
                        }
                    }
                }else if(x_final <= (12/20)*windowW + 200 && x_final >= (12/20)*windowW) {
                    if (y_final >= (6 / 8) * windowH && y_final <= (6 / 8) * windowH + 200) {
                        selecting = true;
                        timerSelect++;
                        if (timerSelect > 20) {
                            objetoEscolhido = 2;
                            startedAnimation=true;
                            anim=1;
                            if(playing===false){
                                audio2.play();
                            }
                            playing=true;
                        }
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
    sair=loadImage("../images/cruz.png");



  n_movimentos= Math.floor(Math.random() * moves.length) + 1;
  //vai utilizar outro gerador para escolher n_movimentos numa sequencia random
  for (i = 0; i < n_movimentos; i++) {
    x=Math.floor(Math.random() * n_movimentos)
    while(movimentos_executar.includes(moves[x])){
      x=Math.floor(Math.random() * n_movimentos) //nao existir moves repetidos
    }
    movimentos_executar.push(moves[x])
  }



  fundo1=loadImage("../images/int2/fundo1.png");
  agua1=loadImage("../images/int2/agua1.png");
  agua2=loadImage("../images/int2/agua2.png");
  bruxa1=loadImage("../images/int2/bruxa1.png");
  bruxa2=loadImage("../images/int2/bruxa2.png");
  bruxa3=loadImage("../images/int2/bruxa3.png");
  bruxa_agua=loadImage("../images/int2/bruxa_agua.png");
  chao1=loadImage("../images/int2/chao1.png");
  chao_agua=loadImage("../images/int2/chao_agua.png");
  frente1=loadImage("../images/int2/frente1.png");
  frente_agua=loadImage("../images/int2/frente_agua.png");
  lenha1=loadImage("../images/int2/lenha1.png");
  lenha2=loadImage("../images/int2/lenha2.png");
  lenha3=loadImage("../images/int2/lenha3.png");
  meio1=loadImage("../images/int2/meio1.png");
  meio2=loadImage("../images/int2/meio2.png");
  meio3=loadImage("../images/int2/meio3.png");
  meio_agua=loadImage("../images/int2/meio_agua.png");
  pedra1=loadImage("../images/int2/pedra1.png");
  pedra2=loadImage("../images/int2/pedra2.png");
  pedra3=loadImage("../images/int2/pedra3.png");
  tras1=loadImage("../images/int2/tras1.png");
  tras2=loadImage("../images/int2/tras2.png");
  tras3=loadImage("../images/int2/tras3.png");
  tras_agua=loadImage("../images/int2/tras_agua.png");
}

function draw() {
  //x varia entre 0 esquerda e ~618 direita
  //y varia entr e 0 cima e ~458 baixo

    if (timerOn) timer++;
   // console.log(timer);
    console.log(timer);


  total_side_movement = 0
    image(fundo1,-125+getParallaxX(10),-125+getParallaxY(10),windowW+250,windowH+250);


    if (timer>10 && anim===0){
      push();
      tint(255,fade1);
        image(tras1,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
        image(chao1,-125+getParallaxX(30),-125+getParallaxY(30),windowW+250,windowH+250);
        image(meio1,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
        image(bruxa1,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
        image(frente1,-125+getParallaxX(100),-125+getParallaxY(100),windowW+250,windowH+250);

        if (fade1<255){
          fade1+=30;
      }else{
          timerOn=false;
      }
      pop();
  }

    if (startedAnimation===true){
        timerOn=true;
        if (objetoEscolhido===0){
            if (timer>30 && (anim===1 || anim===2)){
                push();
                tint(255,255 - fade1);
                image(tras2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(pedra1,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1>0 && anim===1){
                    fade1-=30;
                }else{
                    anim=2;
                }
                pop();
            }
            if (timer>50 && (anim===2 || anim===3)){
                push();
                tint(255,fade1);
                image(tras3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(pedra2,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1<255 && anim===2){
                    fade1+=30;
                }else{
                    anim=3;
                }
                pop();
            }
            if(timer>60 && (anim===3 || anim===4)){
                push();
                tint(255,255 - fade1);
                image(tras3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(bruxa2,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                image(pedra3,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1>0 && anim===3){
                    fade1-=30;
                }else{
                    anim=4;
                }
                pop();
            }
            if(timer>70 && (anim===4 || anim===5)){
                push();
                tint(255,fade1);
                image(tras3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(bruxa3,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1<255 && anim===4){
                    fade1+=30;
                }else{
                    anim=5;
                }
                pop();
            }
        }
        if (objetoEscolhido===1){
            if (timer>30 && (anim===1 || anim===2)){
                push();
                tint(255,255 - fade1);
                image(tras2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(lenha1,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1>0 && anim===1){
                    fade1-=30;
                }else{
                    anim=2;
                }
                pop();
            }
            if (timer>50 && (anim===2 || anim===3)){
                push();
                tint(255,fade1);
                image(tras3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(lenha2,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1<255 && anim===2){
                    fade1+=30;
                }else{
                    anim=3;
                }
                pop();
            }
            if(timer>60 && (anim===3 || anim===4)){
                push();
                tint(255,255 - fade1);
                image(tras3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(bruxa2,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                image(lenha3,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1>0 && anim===3){
                    fade1-=30;
                }else{
                    anim=4;
                }
                pop();
            }
            if(timer>70 && (anim===4 || anim===5)){
                push();
                tint(255,fade1);
                image(tras3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(bruxa3,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1<255 && anim===4){
                    fade1+=30;
                }else{
                    anim=5;
                }
                pop();
            }
        }
        if (objetoEscolhido===2){
            if (timer>20 && (anim===1 || anim===2)){
                push();
                tint(255,255 - fade1);
                image(tras2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(agua1,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1>0 && anim===1){
                    fade1-=30;
                }else{
                    anim=2;
                }
                pop();
            }
            if (timer>40 && (anim===2 || anim===3)){
                push();
                tint(255,fade1);
                image(tras3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio3,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(bruxa2,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                image(agua2,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1<255 && anim===2){
                    fade1+=30;
                }else{
                    anim=3;
                }
                pop();
            }
            if(timer>70 && (anim===3 || anim===4)){
                push();
                tint(255,255 - fade1);
                image(tras_agua,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(chao_agua,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(meio_agua,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
                image(bruxa_agua,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                image(frente_agua,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
                if (fade1>0 && anim===3){
                    fade1-=30;
                }else{
                    anim=4;
                }
                pop();
            }
        }
    }

    if (timer>400){
       window.location.replace("bruxa.html");
    }

    audio2.onended(function(){
        if (redirect===false){
            window.location.replace("bruxa.html");
            redirect=true;
        }
    });
    image (sair,windowW-sair.width - 10,10);



    push();
    translate(windowW, windowH - capture.height / 2);
    scale(-0.5, 0.5);
    //tint(255, 126);
    vid = image(capture, 0 , 0);
    pop();



  if (interacting===true){
    image(img, windowW/2 - img.width/2,0,img.width,img.height);
  }
    draw_rect();

}

function draw_rect(){
    push();
    if (selecting){
        image(ratoSelecting,x_final,y_final,50,50);
    }else{
        image(rato,x_final,y_final,50,50);
    }

}

function getParallaxX(dif){
    return map(x_final,0,windowW,-dif,dif,true);
}

function getParallaxY(dif){
    return map(y_final,0,windowH,-dif,dif,true);
}

function three_simple(cam_height, cam_width, screen_height, screen_width, x, y){
    x_final = - ((screen_width*x))/cam_width + 2.25*cam_width;
    y_final = (screen_height*y)/cam_height;
    return x_final, y_final;
}

function reversing(x_final,screen_width){
    return screen_width + x_final;
}


