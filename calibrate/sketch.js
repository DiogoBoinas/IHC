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

function setup(){  
    img1 = loadImage("gloves.jpeg")
    windowW = windowWidth;
    windowH = windowHeight;
    createCanvas(windowW,windowH)
    capture = createCapture(VIDEO); //capture the webcam
    capture.id("cap");
    let moves = ['left','right','up','down','diagonal_direita_baixo','diagonal_esquerda_baixo','diagonal_direita_cima','diagonal_esquerda_cima'];
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

    var movimento_atual=0;

    
    var atual_x=620//valor inicial da esquerda
    var atual_y=0

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
                if(bool1 == 1 && bool2 == 1 && bool3 == 1 && bool4 == 1 && bool5 == 1){
                  img = loadImage('arrows/'+movimentos_executar[0]+'.png');
                  image(img, windowW/2 - img.width/2,0,img.width,img.height);
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
                            img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                            image(img, windowW/2 - img.width/2,0,img.width,img.height);
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
                            img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                            image(img, windowW/2 - img.width/2,0,img.width,img.height);
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
                            img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                            image(img, windowW/2 - img.width/2,0,img.width,img.height);
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
                            img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                            image(img, windowW/2 - img.width/2,0,img.width,img.height);
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
                        img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                        image(img, windowW/2 - img.width/2,0,img.width,img.height);
                    }
                }
                if(nummovs_d_b==3){
                    console.log("MOVIMENTO PARA A Diagoal DIREITA Descer COM SUCESSO")
                    nummovs_d_b=0
                    if(movimentos_executar[movimento_atual]==moves[4]){
                        clear();
                        movimento_atual++;
                        img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                        image(img, windowW/2 - img.width/2,0,img.width,img.height);
                    }
                }
                if(nummovs_e_c==3){
                    console.log("MOVIMENTO PARA A Diagoal Esquerda Subir COM SUCESSO")
                    nummovs_e_c=0
                    if(movimentos_executar[movimento_atual]==moves[7]){
                        clear();
                        movimento_atual++;
                        img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                        image(img, windowW/2 - img.width/2,0,img.width,img.height);
                    }
                }
                if(nummovs_e_b==3){
                    console.log("MOVIMENTO PARA A Diagoal Esquerda Descer COM SUCESSO")
                    nummovs_e_b=0
                    if(movimentos_executar[movimento_atual]==moves[5]){
                        clear();
                        movimento_atual++;
                        img = loadImage("arrows/"+movimentos_executar[movimento_atual]+".png");
                        image(img, windowW/2 - img.width/2,0,img.width,img.height);

                    }
                }

                      if(movimento_atual>=n_movimentos){
                        console.log("CONSEGUIU COMPLETAR O DESAFIO")
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

function draw_rect(){
    push()
    image(img1,x_final,y_final,50,50);
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
    clear()
    draw_rect();
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
    pop()
    push();
    translate(windowW, windowH - capture.height / 2);
    scale(-0.5, 0.5)
    tint(255, 126);
    vid = image(capture, 0 , 0);
    pop();
}