function Iniciar(){

}

document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var legenda = document.getElementById("legenda");

    video.addEventListener("loadedmetadata", function(){
        canvas.width = 250;
        canvas.height = 150;
    });

    var cont = 0;
    var draw = function() {
        if (video.paused || video.ended) return;
        var x = 0;
        var y = 0;
        context.drawImage(video, x, y, canvas.width, canvas.height);
        var imageData = context.getImageData(x, y, canvas.width, canvas.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i+=4) {
            var red = data[i + 0];
            var green = data[i + 1];
            var blue = data[i + 2];
            var alpha = data[i + 3];
            var pretoeBranco = (red + green + blue)/3;
            data[i + 0] = pretoeBranco;
            data[i + 1] = pretoeBranco;
            data[i + 2] = pretoeBranco;
        }
        context.putImageData(imageData, x, y);
        var image = new Image();
        image.src = canvas.toDataURL("image/pg");
        image.width = 120;
        if(cont++ % 350 == 0){
            var imgs = document.querySelector("#imgs");
            imgs.appendChild(image);
        }
        requestAnimationFrame(draw);
   }

    video.addEventListener("play", function() {
        if (video.paused || video.ended) return;
        draw();
    });
});

/*Como só existe legenda para o primeiro vídeo, a função abaixo
  verifica se o vídeo é o primeiro ou não, se sim, mostra sua
  legenda, se nao, nao mostra nada.*/ 
function play(titulo){
    video.play();
    nomeVideo = document.getElementById("nomeVideo");
    nomeVideo.innerHTML = titulo;
    legenda.src="legendas/guerrero.vtt";
    if(titulo != "Paolo Guerrero mundial de clubes 2012 contra o Chelsea (Legendado)"){
        legenda.src="";
    }
}

function romarinho(){
    video.src="videos/Romarinho_contra_boca.mp4";
    play("Romarinho libertadores 2012 contra o Boca");
}

function guerrero(){
    video.src="videos/Guerrero_contra_chelsea.mp4";
    play("Paolo Guerrero mundial de clubes 2012 contra o Chelsea (Legendado)");
}

function ronaldo(){
    video.src="videos/Ronaldo_contra_santos.mp4";
    play("Ronaldo final do paulista contra o Santos");
}

function sheik(){
    video.src="videos/Sheik_contra_santos.mp4";
    play("Sheike semi-final libertadores contra o Santos");
}


