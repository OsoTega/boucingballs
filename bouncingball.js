var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
const friction = 0.88;
const gravity = 1;

class Ball{
    constructor(x,y, radius,dx,dy, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    draw(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0,Math.PI * 2, false);
        context.fill();
    }

    update(){
        if(this.y + this.radius > canvas.height)
        {
            this.dy = (-this.dy*friction);
        }else{
            this.dy+=gravity;
        }

        if(this.x+this.radius > canvas.width || this.x-this.radius < 0){
            this.dx=(-this.dx*friction);
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
    }
}
const colors = [
    "blue",
    "orange",
    "green",
    "brown",
    "purple"
]
const ballList = [];
for(var i = 0; i < 200; i++)
{
    var x = Math.random()*canvas.width;
    var y = Math.random()*canvas.height;
    var dx = (Math.random()-0.5)*8;
    var dy = (Math.random()-0.5)*8;
    var radius = 20;
    var color = colors[Math.floor(Math.random()*colors.length)]
    ballList.push(new Ball(x,y,radius,dx,dy,color));
}
function bounceBall(){
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i = 0; i < ballList.length; i++)
    {
        ballList[i].update();
    }
    requestAnimationFrame(bounceBall);
}

bounceBall();