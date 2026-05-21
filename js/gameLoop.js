var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate,interval);

var player = new gameObject({x:500, y: 500, color: "#000000"});

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);

    player.drawCircle();// works


}