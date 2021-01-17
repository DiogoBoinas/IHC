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
                    window.location.replace("../color_Tracking");
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