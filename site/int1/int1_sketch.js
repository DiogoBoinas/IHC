var colors;
var capture;
var trackingData;
var x_final=0;
var y_final=0;

var rato;
var caminhos;

var pag;
var menos=0;
var mais=0;
var entrar=0;



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
                if(x_final <= 100){
                    if (menos<50){
                        menos++;
                    }else if(menos>=50){
                        menos=0;
                        pag--;
                    }
                    console.log(menos);
                }

            });
        }
    });
    tracking.track('#cap', colors);

    rato=loadImage("../images/rato.png");

    //paginas
    caminhos = loadImage('../images/int1/caminhos.png');


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
    return screen_width + x_final;
}

function draw(){
    clear();
    image(caminhos,-50+getParallaxX(10),-50+getParallaxY(10),windowW+100,windowH+100);

    rect((1/20)*windowW,(3/7)*windowH,100,100);
    rect((9/20)*windowW,(3/7)*windowH,100,100);
    rect((17/20)*windowW,(3/7)*windowH,100,100);



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
