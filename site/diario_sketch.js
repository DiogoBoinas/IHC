var colors;
var capture;
var trackingData;
var x_final=0;
var y_final=0;
var pagina1;
var rato;
var pag;
var menos=0;
var mais=0;
var entrar=0;



function setup(){

    createFile();
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
                if(x_final <= 100){
                    if (menos<50){
                        menos++;
                    }else if(menos>=50){
                        menos=0;
                        pag--;
                    }
                    console.log(menos);
                }
                if(x_final >= 1150){
                    if (mais<50){
                        mais++;
                    }else if(mais>=50){
                        mais=0;
                        pag++;
                    }
                    console.log(mais);
                }

                if (pag===2){
                    if(x_final <= 850 && x_final >= 800){
                        if(y_final >= 500 && y_final <=550){
                            if (entrar<50){
                                entrar++;
                            }else if(entrar>=50){
                                entrar=0;
                                window.location.replace("http://www.w3schools.com");
                            }
                        }
                    }
                }
            });
        }
    });
    tracking.track('#cap', colors);

    rato=loadImage("images/rato.png");


    //paginas
    pagina1 = loadImage('images/diario/pagina1.png');
    pagina2 = loadImage('images/diario/pagina2.png');
    pagina3 = loadImage('images/diario/pagina3.png');
    pagina4 = loadImage('images/diario/pagina4.png');
    pagina5 = loadImage('images/diario/pagina5.png');
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

function draw(){
    clear();
    if (pag===1)     image(pagina1, 0, 0,windowW,windowH);
    if (pag===2){
        image(pagina2, 0, 0,windowW,windowH);
        rect(800, 500, 50, 50);

    }
    if (pag===3)     image(pagina3, 0, 0,windowW,windowH);
    if (pag===4)     image(pagina4, 0, 0,windowW,windowH);
    if (pag===5)     image(pagina5, 0, 0,windowW,windowH);



    draw_rect();
    push();
    translate(windowW, windowH - capture.height / 2);
    scale(-0.5, 0.5);
    //tint(255, 126);
    vid = image(capture, 0 , 0);




}