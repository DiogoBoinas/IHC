var colors;
var capture;
var trackingData;
var x_final=0;
var y_final=0;
var pagina1;
var rato;
var pag;
var stringPag;
var menos=0;
var mais=0;
var entrar=0;

let timerSelectMinus=0;
let timerSelectPlus=0;
let timerSelect1=0;
let timerSelect2=0;

let selecting1;
let selecting2;
let changingMinus;
let changingPlus;



let fundo;


function preload(){
    intro=loadSound('audio/diario/intro.wav');
    middle=loadSound('audio/diario/middle.mp3');
    outro=loadSound('audio/diario/outro.mp3');
}

function setup(){

    createCanvas(windowWidth,windowHeight)
    capture = createCapture(VIDEO); //capture the webcam
    capture.id("cap");
    windowW= windowWidth;
    windowH= windowHeight;
    intro.play();
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

                if(x_final <= windowW/5){
                    changingMinus=true;
                    if (timerSelectMinus<50 && pag!==1){
                        timerSelectMinus++;
                    }else if(timerSelectMinus>=50){
                        timerSelectMinus=0;
                        if(pag===3){
                            middle.play();
                            outro.stop();
                        }
                        if(pag===2){
                            intro.play();
                            middle.stop();
                        }
                        pag--;

                    }
                }else if (x_final>=4*windowW/5){
                    changingPlus=true;
                    if (timerSelectPlus<50 && pag!==3){
                        timerSelectPlus++;
                    }else if(timerSelectPlus>=50){
                        timerSelectPlus=0;
                        if(pag===2){
                            middle.stop();
                            outro.play();
                        }
                        if(pag===1){
                            intro.stop();
                            middle.play();
                        }
                        pag++;

                    }
                }else{
                    timerSelectMinus=0;
                    timerSelectPlus=0;
                     changingMinus=false;
                     changingPlus=false;
                }
                if (pag===1){
                    if(x_final <= 3*windowW/5 + 230 && x_final >= 3*windowW/5){
                        if(y_final >= 3*windowH/5 && y_final <=3*windowH/5 + 150){
                            if (entrar<150){
                                entrar++;
                                selecting1=true;
                            }else if(entrar>=150){
                                entrar=0;
                                window.location.replace("int1/caminhos.html");
                            }
                        }
                    }else{
                        selecting1=false;
                        selecting2=false;
                        entrar=0;
                    }
                }

                if (pag===2){
                    if(x_final <= windowW/5 + 230 && x_final >= windowW/5){
                        if(y_final >= 3*windowH/5 && y_final <=3*windowH/5 + 150){
                            if (entrar<150){
                                entrar++;
                                selecting1=true;
                            }else if(entrar>=150){
                                entrar=0;
                                window.location.replace("int2/bruxa.html");
                            }
                        }
                    }else if(x_final <= 3*windowW/5 + 230 && x_final >= 3*windowW/5){
                        if(y_final >= 3*windowH/5 && y_final <=3*windowH/5 + 150){
                            if (entrar<150){
                                entrar++;
                                selecting2=true;
                            }else if(entrar>=150){
                                entrar=0;
                                window.location.replace("int3/potions.html");
                            }
                        }
                    }else{
                        selecting1=false;
                        selecting2=false;
                        entrar=0;
                    }
                }
            });
        }
    });
    tracking.track('#cap', colors);

    rato=loadImage("images/rato.png");


    //paginas
    fundo=loadImage("images/diario/fundo.png");

    pagina1 = loadImage('images/diario/pagina1.png');
    pagina1mudar = loadImage('images/diario/pagina1-mudar.png');
    pagina1selecionar = loadImage('images/diario/pagina1-selecionar.png');
    pagina2 = loadImage('images/diario/pagina2.png');
    pagina2mudardireita = loadImage('images/diario/pagina2-mudardireita.png');
    pagina2mudaresquerda = loadImage('images/diario/pagina2-mudaresquerda.png');
    pagina2selecionar1 = loadImage('images/diario/pagina2-selecionar1.png');
    pagina2selecionar2 = loadImage('images/diario/pagina2-selecionar2.png');
    pagina3 = loadImage('images/diario/pagina3.png');
    pagina3mudar = loadImage('images/diario/pagina3-mudar.png');

    pag=1;

}

function draw_rect(){
    push();
    image(rato,x_final,y_final,50,50);
}

function three_simple(cam_height, cam_width, screen_height, screen_width, x, y){
    x_final = - ((screen_width*x))/cam_width + 2*cam_width;
    y_final = (screen_height*y)/cam_height;
    return x_final, y_final;
}

function reversing(x_final,screen_width){
    return screen_width + x_final
}

function getParallaxX(dif){
    return map(x_final,0,windowW,-dif,dif,true);
}

function getParallaxY(dif){
    return map(y_final,0,windowH,-dif,dif,true);
}


function draw(){
    clear();


    image(fundo,-125+getParallaxX(10),-125+getParallaxY(10),windowW+250,windowH+250);
    if (pag===1){
        if (changingPlus) image(pagina1mudar, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
        else if (selecting1) image(pagina1selecionar, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
        else image(pagina1, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
    }
    if (pag===2){
        if (changingMinus) image(pagina2mudaresquerda, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
        else if (changingPlus) image(pagina2mudardireita, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
        else if (selecting1) image(pagina2selecionar1, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
        else if (selecting2) image(pagina2selecionar2, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
        else image(pagina2, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);


    }
    if (pag===3){
        if (changingMinus) image(pagina3mudar, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
        else image(pagina3, -25+getParallaxX(30),-25+getParallaxY(30),windowW+50,windowH+50);
    }




    draw_rect();





}