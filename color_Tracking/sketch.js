var colors;
var capture;
var trackingData;
let img;
let img1;




function setup() {

  createCanvas(windowWidth,windowHeight)

  capture = createCapture(VIDEO); //capture the webcam
  capture.id("cap")

  let moves = ['left','right','up','down','downright','downleft','upright','upleft']

  //ve quantos moviemntos pode criar de acordo com o tamanho de moves que existem
  let n_movimentos= Math.floor(Math.random() * moves.length) + 1;
  console.log("executar ")
  console.log(n_movimentos)
  console.log("movimentos")

  var i;
  let movimentos_executar=[]

  //vai utilizar outro gerador para escolher n_movimentos numa sequencia random
  for (i = 0; i < n_movimentos; i++) {
    x=Math.floor(Math.random() * n_movimentos)
    while(movimentos_executar.includes(moves[x])){
      x=Math.floor(Math.random() * n_movimentos) //nao existir moves repetidos
    }
    movimentos_executar.push(moves[x])
  }

  img = loadImage('../arrows/'+movimentos_executar[0]+'.png');

  console.log("movimentos gerados")
  console.log(movimentos_executar)

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

  var movimento_atual=0;

  colors.on('track', function(event) {

    if (event.data.length === 0) {
      // No colors were detected in this frame.
      console.log("Nothing")
    } else {
      event.data.forEach(function(rect) {
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
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
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
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
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
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
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
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
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
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
          }
        }
        if(nummovs_d_b==3){
          console.log("MOVIMENTO PARA A Diagoal DIREITA Descer COM SUCESSO")
          nummovs_d_b=0
          if(movimentos_executar[movimento_atual]==moves[4]){
              clear();
              movimento_atual++;
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
          }
        }
        if(nummovs_e_c==3){
          console.log("MOVIMENTO PARA A Diagoal Esquerda Subir COM SUCESSO")
          nummovs_e_c=0
          if(movimentos_executar[movimento_atual]==moves[7]){
              clear();
              movimento_atual++;
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
          }
        }
        if(nummovs_e_b==3){
          console.log("MOVIMENTO PARA A Diagoal Esquerda Descer COM SUCESSO")
          nummovs_e_b=0
          if(movimentos_executar[movimento_atual]==moves[5]){
              clear();
              movimento_atual++;
              img = loadImage("../arrows/"+movimentos_executar[movimento_atual]+".png");
          }
        }

        if(movimento_atual>=n_movimentos){
          clear();
          console.log("CONSEGUIU COMPLETAR O DESAFIO")
          img = loadImage("../tick.png");
        }
        console.log("estamos na posiçao do array completo: "+movimento_atual)

        xmoveatual=rect.x;
        ymoveatual=rect.y;

        atual_x=rect.x
        atual_y=rect.y

      });
    }
  });

  tracking.track('#cap', colors);
}


function draw() {
  //x varia entre 0 esquerda e ~618 direita
  //y varia entr e 0 cima e ~458 baixo

  image(img, 0,height/2,img.width/2,img.height/2);
  total_side_movement = 0
  translate(capture.width, 0);
  scale(-1, 1)
  tint(255, 126);
  vid = image(capture, 0 , 0);


}
