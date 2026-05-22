var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

// time and frames
var interval = 1000/60;
var timer = setInterval(animate,interval);

// var player = new gameObject({x:500, y: 500, w: 100, h:200, color: "#000000"}); // why doesnt ({this setup}) work?
var player = new gameObject(canvas.width/2, canvas.height/2, 100, 100, "#ff0000");
var pointer = new gameObject(450, 450, 50, 100)

var frictionX = .9;
var frictionY = .9;
var gravity = 1;

var leftTargets=[];
var rightTargets=[];
var topTargets=[];
var bottomTargets=[];
var numTargets =3;

    makeLeftTargets();

var canShoot = true;
var bullets=[];


function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
    orbit();

    wasd();
    shoot();
    moveBullets();
    drawTargets();
    // makeLeftTargets();


    player.drawCircle();
    pointer.drawTriangle();
    player.move();
}

function wasd()
{
    player.vx *= frictionX;
    player.vy *= frictionY;

    if(w)
    {
        player.vy -= player.force;
    }

    if(s)
    {
        player.vy += player.force;
    }

    if(a)
    {
        player.vx -= player.force;
    }

    if(d)
    {
        player.vx += player.force;
    }
}

var orbitAngle = 0;

function orbit()
{
  var speed = 0.02;

    pointer.x = player.x + player.width / 2 * Math.cos(orbitAngle);
    pointer.y = player.y + player.width / 2 * Math.sin(orbitAngle);

    orbitAngle += speed;
    pointer.angle = orbitAngle * 180 / Math.PI;
}

function shoot()
{
    if(spaceBar && canShoot)
    {
        canShoot = false;

        console.log("Shoots");

        var radians = pointer.angle * Math.PI / 180;

        var tipX = pointer.x + Math.cos(radians) * (pointer.width / 2);
        var tipY = pointer.y + Math.sin(radians) * (pointer.width / 2);

        var bullet = new gameObject(tipX, tipY, 10, 10, pointer.color);

        bullet.owner = "player";
        bullet.force = 8;
        bullet.vx = Math.cos(radians) * bullet.force;
        bullet.vy = Math.sin(radians) * bullet.force;

        bullets.push(bullet);
    }

    if(!spaceBar)
    {
        canShoot = true;
    }
}
function moveBullets()
{
    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].move();
        bullets[i].drawCircle();
    }
}
function makeLeftTargets() // make targets
{
    for(var i = 0; i < numTargets; i++)
    {
        var target = new gameObject(10, rand(0, canvas.height), 10, 10, "#000000");

        target.owner = "left";

        target.force = 8;
        target.vx = (rand(1,3) + 1) * target.force;
        target.vy = 0;

        leftTargets.push(target);

        // if(target.x + target.width >= canvas.width)
        // {
        //     console.log("splice left")
        //     leftTargets.splice[i];
        //     leftTargets.push(target);
 
        // } // moved to drawTragets
    }
}

function drawTargets() // draw them and move them
{
    for(var i = 0; i < leftTargets.length; i++)
    {
        leftTargets[i].move();
        leftTargets[i].drawCircle();

        if(leftTargets[i].x - leftTargets[i].width / 2 >= canvas.width)
        {
            leftTargets.splice(i, 1);
            i--;

            var target = new gameObject(10, rand(0, canvas.height), 10, 10, "#000000");

            target.owner = "left";
            target.force = 8;
            target.vx = (rand(1,3) + 1) * target.force;
            target.vy = 0;

            leftTargets.push(target);
        }
    }
}