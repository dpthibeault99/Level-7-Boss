var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate,interval);

// var player = new gameObject({x:500, y: 500, w: 100, h:200, color: "#000000"}); // why doesnt ({this setup}) work?
var player = new gameObject(500, 500, 150, 150, "#000000");
var pointer = new gameObject(450, 450, 50, 100)


function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);

    player.drawCircle();// works
    pointer.drawTriangle();
    player.move();
    orbit();


}

function orbit()
{
    var speed = 0.02;
    var angle = pointer.angle;


    pointer.x = player.x + player.width/2 * Math.cos(angle);
    pointer.y = player.y + player.width/2 * Math.sin(angle);

    angle += speed;


}