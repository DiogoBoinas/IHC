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
let moves = ['left','right','down','downright','downleft','upright','upleft'];

let windowW;
let windowH;

let fundo;
let robo;
let robo2;
let robo3;
let tras1;
let tras2;
let frente1;
let int1;
let int2;


let audio1;
let audio2;
let playing=false;

let timer=0;
let timerOn=true;
let fade1=0;
let interacted=false;
let anim=0;

let redirect=false;

function preload(){
    audio1=loadSound('../audio/int1/robo1.wav');
    audio2=loadSound('../audio/int1/robo2.wav');
}

function setup() {
    windowW= windowWidth;
    windowH= windowHeight;
    audio1.play();


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


            });
        }
    });
    tracking.track('#cap', colors);

    rato=loadImage("../images/rato.png");


  n_movimentos= Math.floor(Math.random() * moves.length) + 1;
  //vai utilizar outro gerador para escolher n_movimentos numa sequencia random
  for (i = 0; i < n_movimentos; i++) {
    x=Math.floor(Math.random() * n_movimentos)
    while(movimentos_executar.includes(moves[x])){
      x=Math.floor(Math.random() * n_movimentos) //nao existir moves repetidos
    }
    movimentos_executar.push(moves[x])
  }


  generateAndDetect();

  fundo=loadImage("../images/int1/espantalho/fundo.png");
  robo1=loadImage("../images/int1/robo/robo1.png");
  robo2=loadImage("../images/int1/robo/robo2.png");
  robo3=loadImage("../images/int1/robo/robo3.png");
  int1=loadImage("../images/int1/robo/int1.png");
  int2=loadImage("../images/int1/robo/int2.png");
  frente1=loadImage("../images/int1/robo/frente1.png");
  tras1=loadImage("../images/int1/robo/tras1.png");
  tras2=loadImage("../images/int1/robo/tras2.png");





}

function draw() {
  //x varia entre 0 esquerda e ~618 direita
  //y varia entr e 0 cima e ~458 baixo

    if (timerOn) timer++;
    console.log(timer);


  total_side_movement = 0
    image(fundo,-125+getParallaxX(10),-125+getParallaxY(10),windowW+250,windowH+250);

    if (timer>100 && interacted===false){
      push();
      tint(255,fade1);
      image(tras1,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
      image(robo1,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      image(frente1,-125+getParallaxX(60),-125+getParallaxY(60),windowW+250,windowH+250);
        if (fade1<255 && anim===0){
            fade1+=30;
        }else{
                     anim=1;
        }
      pop();
  }

  if (timer>200){
      push();
      tint(255,255 - fade1);
      image(tras2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
      image(robo2,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      image(int1,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);

      if (fade1>0 && anim===1){
          fade1-=30;
      }else{
          anim=2;
      }
      pop();
  }

    audio1.onended(function(){
        if (interacted===false){
            interacting=true;
        }
    });

    audio2.onended(function(){
        if (redirect===false){
            window.location.replace("caminhos.html");
            redirect=true;
        }
    });

  if (interacted===true){
      push();
      tint(255, fade1);
      image(tras2,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
      image(robo3,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      image(int1,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      image(int2,-125+getParallaxX(40),-125+getParallaxY(40),windowW+250,windowH+250);
      if (fade1<255) fade1+=30;
      pop();
      timerOn=true;
  }


    draw_rect();


    push();
    translate(windowW, windowH - capture.height / 2);
    scale(-0.5, 0.5);
    //tint(255, 126);
    vid = image(capture, 0 , 0);
    pop();


  if (interacting===true){
    image(img, windowW/2 - img.width/2,0,img.width,img.height);
  }

}

function draw_rect(){
    push();
    image(rato,x_final,y_final,50,50);

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


function generateAndDetect(){


  //ve quantos moviemntos pode criar de acordo com o tamanho de moves que existem
  console.log("executar ")
  console.log(n_movimentos)
  console.log("movimentos")

  var i;



  img = loadImage('../images/arrows/'+movimentos_executar[0]+'.png');

  console.log("movimentos gerados");
  console.log(movimentos_executar);

  y_moves = 0;
  xmoveatual =0;
  ymoveatual=0;
  nummovs_d=0;
  nummovs_e=0;
  nummovs_c=0;
  nummovs_b=0;
  x_moves = 0;
  nummovs_d_c=0;
  nummovs_d_b=0;
  nummovs_e_c=0;
  nummovs_e_b=0;

  var atual_x=620//valor inicial da esquerda
  var atual_y=0
  var colors = new tracking.ColorTracker(['cyan']);



  colors.on('track', function(event) {

    if (event.data.length === 0) {
      // No colors were detected in this frame.
      //console.log("Nothing")
    } else {
      event.data.forEach(function(rect) {
          if (interacting){
              if(rect.x<xmoveatual){
                  if(rect.y<ymoveatual){
                      console.log("diagonal para a direita -subindo")
                      nummovs_d_c++;
                      if(nummovs_d_b>0){
                          nummovs_d_b--
                      }
                      if(nummovs_e_c>0){
                          nummovs_e_c--
                      }
                      if(nummovs_e_b>0){
                          nummovs_e_b--
                      }
                  }
                  if(rect.y>ymoveatual){
                      console.log("diagonal para a direita -descendo")
                      nummovs_d_b++
                      if(nummovs_d_c>0){
                          nummovs_d_c--
                      }
                      if(nummovs_e_c>0){
                          nummovs_e_c--
                      }
                      if(nummovs_e_b>0){
                          nummovs_e_b--
                      }
                  }
                  console.log("DIREITA")
                  nummovs_d++;
                  console.log(nummovs_d)
                  if(nummovs_d==5){
                      console.log("MOVIMENTO PARA A DIREITA COM SUCESSO")
                      nummovs_d=0;

                      if(movimentos_executar[movimento_atual]==moves[1]){
                          clear();
                          movimento_atual++;
                          img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                      }
                  }

                  if(nummovs_e>0){
                      nummovs_e--;
                  }



              }else if(rect.x >xmoveatual) {
                  if(rect.y<ymoveatual){
                      console.log("diagonal para a esquerda -subindo")
                      nummovs_e_c++

                      if(nummovs_d_c>0){
                          nummovs_d_c--
                      }
                      if(nummovs_d_b>0){
                          nummovs_d_b--
                      }
                      if(nummovs_e_b>0){
                          nummovs_e_b--
                      }
                  }
                  if(rect.y>ymoveatual){
                      console.log("diagonal para a esquerda -descendo")
                      nummovs_e_b++

                      if(nummovs_d_c>0){
                          nummovs_d_c--
                      }
                      if(nummovs_d_b>0){
                          nummovs_d_b--
                      }
                      if(nummovs_e_c>0){
                          nummovs_e_c--
                      }

                  }
                  console.log("ESQUERDA")
                  nummovs_e++;
                  console.log(nummovs_e)
                  if(nummovs_e==5){
                      console.log("MOVIMENTO PARA A ESQUERDA COM SUCESSO")
                      nummovs_e=0;

                      if(movimentos_executar[movimento_atual]==moves[0]){
                          clear();
                          movimento_atual++;
                          img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                      }
                  }

                  if(nummovs_d>0){
                      nummovs_d--;
                  }
              }else if(rect.y<ymoveatual){
                  if(rect.x<xmoveatual){
                      console.log("diagonal para a direita -subindo")
                      nummovs_d_c++
                      if(nummovs_d_b>0){
                          nummovs_d_b--
                      }
                      if(nummovs_e_c>0){
                          nummovs_e_c--
                      }
                      if(nummovs_e_b>0){
                          nummovs_e_b--
                      }
                  }
                  if(rect.x>xmoveatual){
                      console.log("diagonal para a esquerda -subindo")
                      nummovs_e_c++
                      if(nummovs_d_c>0){
                          nummovs_d_c--
                      }
                      if(nummovs_e_c>0){
                          nummovs_e_c--
                      }
                      if(nummovs_e_b>0){
                          nummovs_e_b--
                      }
                  }
                  console.log("CIMA")
                  nummovs_c++;
                  console.log(nummovs_c)
                  if(nummovs_c==2){
                      console.log("MOVIMENTO PARA CIMA COM SUCESSO")
                      nummovs_c=0;
                      if(movimentos_executar[movimento_atual]==moves[2]){
                          clear();
                          movimento_atual++;
                          img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                      }
                  }

                  if(nummovs_b>0){
                      nummovs_b--;
                  }

              }else if(rect.y >ymoveatual) {
                  if(rect.x<xmoveatual){
                      console.log("diagonal para a direita -descendo")
                      nummovs_d_b++

                      if(nummovs_d_c>0){
                          nummovs_d_c--
                      }
                      if(nummovs_d_b>0){
                          nummovs_d_b--
                      }
                      if(nummovs_e_b>0){
                          nummovs_e_b--
                      }
                  }
                  if(rect.x>xmoveatual){
                      console.log("diagonal para a esquerda -descendo")
                      nummovs_e_b++

                      if(nummovs_d_c>0){
                          nummovs_d_c--
                      }
                      if(nummovs_d_b>0){
                          nummovs_d_b--
                      }
                      if(nummovs_e_c>0){
                          nummovs_e_c--
                      }

                  }
                  console.log("BAIXO")
                  nummovs_b++;
                  console.log(nummovs_b)
                  if(nummovs_b=2){
                      console.log("MOVIMENTO PARA BAIXO COM SUCESSO")
                      nummovs_b=0;
                      if(movimentos_executar[movimento_atual]==moves[3]){
                          clear();
                          movimento_atual++;
                          img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                      }
                  }

                  if(nummovs_c>0){
                      nummovs_c--;
                  }
              }
              if(nummovs_d_c==3){
                  console.log("MOVIMENTO PARA A Diagoal DIREITA Subir COM SUCESSO")
                  nummovs_d_c=0
                  if(movimentos_executar[movimento_atual]==moves[6]){
                      clear();
                      movimento_atual++;
                      img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                  }
              }
              if(nummovs_d_b==3){
                  console.log("MOVIMENTO PARA A Diagoal DIREITA Descer COM SUCESSO")
                  nummovs_d_b=0
                  if(movimentos_executar[movimento_atual]==moves[4]){
                      clear();
                      movimento_atual++;
                      img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                  }
              }
              if(nummovs_e_c==3){
                  console.log("MOVIMENTO PARA A Diagoal Esquerda Subir COM SUCESSO")
                  nummovs_e_c=0
                  if(movimentos_executar[movimento_atual]==moves[7]){
                      clear();
                      movimento_atual++;
                      img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                  }
              }
              if(nummovs_e_b==3){
                  console.log("MOVIMENTO PARA A Diagoal Esquerda Descer COM SUCESSO")
                  nummovs_e_b=0
                  if(movimentos_executar[movimento_atual]==moves[5]){
                      clear();
                      movimento_atual++;
                      img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");
                  }
              }

              if(movimento_atual>=n_movimentos){
                  clear();
                  console.log("CONSEGUIU COMPLETAR O DESAFIO")
                  // img = loadImage("../tick.png");
                  sucessfulInteraction();
              }
              console.log("estamos na posiçao do array completo: "+movimento_atual)

              xmoveatual=rect.x;
              ymoveatual=rect.y;

              atual_x=rect.x
              atual_y=rect.y
          }


      });

    }
  });

  tracking.track('#cap', colors);
}

function sucessfulInteraction(){
  interacting=false;
  interacted=true;
    audio2.play();
  n_movimentos= Math.floor(Math.random() * moves.length) + 1;
  movimentos_executar=[];
  for (i = 0; i < n_movimentos; i++) {
    x=Math.floor(Math.random() * n_movimentos)
    while(movimentos_executar.includes(moves[x])){
      x=Math.floor(Math.random() * n_movimentos) //nao existir moves repetidos
    }
    movimentos_executar.push(moves[x])
  }
  movimento_atual=0;
  img = loadImage("../images/arrows/"+movimentos_executar[movimento_atual]+".png");

  console.log(n_movimentos);
  console.log(movimentos_executar);


}