

$(document).ready(function() {
    $("#main").animate({
        opacity: '1',
        left: '10%'
    },1500);
    $('#about').hide();
});

function loadAbout(){
    $("#landing").animate({
        left: '100%',
    },1000);

    $("#landing").hide(10);

    $('#about').show(10);
    $('#about').animate({
        opacity: '1',
        left: '0'
    },900);

}

function voltar(page){
    if (page='about'){
        $('#about').animate({
            left: '-100%'
        },1000);

        $("#about").hide(10);

        $("#landing").show(10);

        $("#landing").animate({
            left: '0',
        },900);


    }
}
