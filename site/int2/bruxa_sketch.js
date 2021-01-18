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


let timer=0;
let timerOn=true;
let fade1=0;
let fade2=0;
let interacted=false;


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
                        if (timerSelect>50){
                            objetoEscolhido=0;
                            startedAnimation=true;
                        }
                    }
                }else if(x_final <= (8/20)*windowW + 200 && x_final >= (8/20)*windowW){
                    if(y_final >= (6/8)*windowH && y_final <=(6/8)*windowH+200){
                        selecting=true;
                        timerSelect++;
                        if (timerSelect>50){
                            objetoEscolhido=1;
                            startedAnimation=true;
                        }
                    }
                }else if(x_final <= (12/20)*windowW + 200 && x_final >= (12/20)*windowW) {
                    if (y_final >= (6 / 8) * windowH && y_final <= (6 / 8) * windowH + 200) {
                        selecting = true;
                        timerSelect++;
                        if (timerSelect > 50) {
                            objetoEscolhido = 2;
                            startedAnimation=true;
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
    console.log(timer);


  total_side_movement = 0
    image(fundo1,-125+getParallaxX(10),-125+getParallaxY(10),windowW+250,windowH+250);
    image(tras1,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);
    image(chao1,-125+getParallaxX(30),-125+getParallaxY(30),windowW+250,windowH+250);
    image(meio1,-125+getParallaxX(20),-125+getParallaxY(20),windowW+250,windowH+250);

    if (timer>100 && anim===0){
      push();
      tint(255,fade1);
      image(bruxa1,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
      if (fade1<255){
          fade1+=5;
      }else{
          timerOn=false;
      }
      pop();
  }

  /*if (timer>200){
      anim++;
        push();
        tint(255,255 - fade1);
        image(leao2,-125+getParallaxX(50),-125+getParallaxY(50),windowW+250,windowH+250);
      if (fade1>0 && interacted===false) fade1-=30;
        pop();
    }
*/



  /*if (timer>400 && interacted===false){
      timerOn=false;
      interacting=true;
  }

  if (interacted===true){
      push();
      tint(255,fade1);
      image(leao3,-125+getParallaxX(45),-125+getParallaxY(50),windowW+250,windowH+250);
      if (fade1<255) fade1+=30;
      pop();
      timerOn=true;
  }*/




  image(frente1,-125+getParallaxX(100),-125+getParallaxY(100),windowW+250,windowH+250);

    /*if (timer>300){
        push();
        tint(255,fade2);
        image(mao,-125+getParallaxX(100),-125+getParallaxY(100),windowW+250,windowH+250);
        if (fade2<255) fade2+=30;
        pop();
    }*/

  /*if (timer>500){

      //txt adicionar espantalho feito

      //if tiver 3 personagens
      //window.location.replace("../diario.html");

      //se ainda faltar personagens
      window.location.replace("caminhos.html");

  }*/



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
        push();
        tint(0,255,0);
        image(rato,x_final,y_final,50,50);
        pop();
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