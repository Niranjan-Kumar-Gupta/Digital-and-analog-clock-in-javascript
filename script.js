const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let hue = 20;
let radius = canvas.width*0.3
class Clock{
    constructor(x,y,rad){
        this.x = x
        this.y = y
        this.rad = rad
        this.color = 'hsl(' + hue*2 + ',100%,60%)';
        this.ang = 0;
        this.d = new Date();
        this.hour = 0
        this.min =  0
        this.sec = 0
        this.song = new Audio()
        this.song.src =  "https://aaringtones.com/ringtones/Barsat%20Ki%20Dhun%20Music%20Ringtone.mp3"
    }
    draw(){
        this.song.play()
        ctx.fillStyle = 'hsl(' + hue + ',100%,60%)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,1)';
        ctx.font = canvas.height*0.07+'px verdana';
        ctx.fillRect(canvas.width*0.2,canvas.height*0.86,canvas.width*0.63,10)
        ctx.fillText(this.d.getHours()%12+":",canvas.width*0.25,canvas.height*0.85)
        ctx.fillText(this.d.getMinutes()+":",canvas.width*0.40,canvas.height*0.85)
        ctx.fillText(this.d.getSeconds(),canvas.width*0.62,canvas.height*0.85)

        ctx.beginPath();     
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(0,0,0,1)';
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x+this.rad*0.5*Math.sin(this.hour*6.3),this.y-this.rad*0.5*Math.cos(this.hour*6.3))
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();     
        ctx.strokeStyle = 'hsl(10,100%,60%)';
        ctx.lineWidth = 4;
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x+this.rad*0.7*Math.sin(this.min*6.3),this.y-this.rad*0.7*Math.cos(this.min*6.3))
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();     
        ctx.strokeStyle = 'hsl(155,100%,60%)';
        ctx.lineWidth = 4;
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x+this.rad*0.8*Math.sin(this.sec*6.3),this.y-this.rad*0.8*Math.cos(this.sec*6.3))
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();     
        ctx.fillStyle = "hsl("+hue+",100%,60%)";
        ctx.arc(this.x,this.y,this.rad*0.05,0,Math.PI*2);
        ctx.fill()
        ctx.closePath();
    }
    update(){
        this.draw()   
        this.d = new Date();
        this.sec = this.d.getSeconds() / 60
        this.min = (this.sec+this.d.getMinutes())/60
        this.hour = (this.min+this.d.getHours() % 12)/12    
       
    }
}

let clock = new Clock(canvas.width*0.5,canvas.height*0.35,radius)

function handelClock(){
    clock.update()
}

const heartX = [];
const heartY = [];

function HeartData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.03) {
        let m = (16 * Math.sin(i) ** 3);
        heartX.push(m);
        let n = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        heartY.push(n);
    }
}
HeartData();

class HeartBeat{
    constructor(x,y,vel,col){
        this.x = x;
        this.y = y;
        this.size = 1.5;
        this.vel = vel;
        this.gravity = -0.01;
        this.color = 'hsl(' + hue*2 + ',100%,50%)';
        this.alpha = 2;
        this.friction = 0.99;      

    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = this.color;       
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill(); 
        ctx.closePath();
        ctx.restore();
    }
    update(){
        this.draw();
        this.alpha -= 0.02;
        this.vel.x *= this.friction; 
        this.vel.y *= this.friction; 
        this.x += this.vel.x;
        this.y -= this.vel.y;
    }

}
let heartBeat = [];
function initheartBeat() {
    let heartBeatNum = heartX.length;
    let speed = 0.1;
    for (let i = 0; i < heartBeatNum; i+=2) {
        heartBeat.push(new HeartBeat(canvas.width*0.5,canvas.height*0.35,{
            x:heartX[i]*speed,
            y:-heartY[i]*speed
        },'blue'))
    }
}

function handelheartBeat() {
    ctx.beginPath();     
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.shadowColor = 'rgba(0,0,0,1)';
    ctx.shadowBlur = 60;
    ctx.arc(canvas.width*0.5,canvas.height*0.35,radius,0,Math.PI*2);
    ctx.fill()
    ctx.closePath();

    ctx.beginPath();     
    ctx.strokeStyle = 'hsl(' + hue + ',100%,50%)';
    ctx.lineWidth = radius*0.01;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'rgba(0,0,0,1)';
    ctx.arc(canvas.width*0.5,canvas.height*0.35,radius,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();

    heartBeat.forEach((object,index) => {
        if (object.alpha > 0) {
            object.update();  
        }else{
            heartBeat.splice(index,1);
       }
    });
}

let count = 0
function handelHeartBeatInit() {
    if (count%20==0) {
        initheartBeat() 
    }
    if (count>1000) {
        count=0
    }else{
        count++
    }
}

class Heart{
    constructor(x,y,rad,num){
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = 'red'
        this.radinc = 0;
        this.dirc = 1;
        this.num = num
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = "hsl("+hue+",100%,50%)";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 0;
        for (let i = 0; i < heartX.length; i+=4) {
            let prevx = heartX[i]*this.rad + this.x;
            let prevy = heartY[i]*this.rad + this.y;
            ctx.moveTo(prevx,prevy);
            ctx.lineTo(this.x+heartX[i+1]*this.radinc,this.y+heartY[i+1]*this.radinc)
            
        }
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.font = this.rad*10+'px verdana';
        ctx.fillText(this.num,this.x-this.rad*6*this.num*0.1,this.y+this.rad*4)
    }
    update(){
        this.radinc += 0.05*this.dirc;
        if (this.radinc > this.rad*0.05 || this.radinc < -this.rad*0.8 ) {
            this.dirc *= -1
           
        }
    }
}
let heart = [];
function initHeart() {
    for (let i = 1; i <= 12; i++) {
       heart.push(new Heart(canvas.width*0.5+radius*Math.sin(30*Math.PI/180*i),canvas.height*0.35-radius*Math.cos(30*Math.PI/180*i),canvas.width*0.004,i));      
    }
}
initHeart()
function handelHeart(){
    heart.forEach((object,index) => {
        object.draw()
        object.update()
    });
}

const baseX = [];
const baseY = [];

function baseData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.03) {
        let m = (7 * Math.sin(1 * i) ** 3);
        baseX.push(m);
        let n = -(3 ** Math.cos(i * 5) - 5 * Math.cos(0.02 ** i) - 2 * Math.cos(7 * i) - Math.cos(11 * i));
        baseY.push(n);
    }
}
baseData();


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',100%,50%)';
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) {
            this.size -= 3;
        }
    }
}
let particle = [];
function handelParticle() {
    particle.forEach((object, index) => {
        object.draw();
        object.update();
        if (object.size < 0.1) {
            particle.splice(index, 1);
        }
    });
}


class Base {
    constructor(x) {
        this.x = x;
        this.y = canvas.height * 0.6;
        this.rad = canvas.width * 0.0545;
        this.radinc = -10;
        this.dirc = 1;
        this.color = 'hsl(' + hue + ',100%,50%)';
        this.th = 0;
        this.thdir = 1;
        this.prevx = 0;
        this.prevy = 0;
        this.r = 0.9;
        this.d = 1;
      
    }
    draw() {
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        for (let i = 0; i < baseX.length; i++) {
            ctx.strokeStyle = 'hsl(' + hue + ',100%,50%)';
            this.prevx = baseX[i] * this.rad + this.x;
            this.prevy = (baseY[i] * this.rad + this.y);
            particle.push(new Particle(this.prevx, this.prevy, i));
            ctx.moveTo(this.prevx, this.prevy);
            ctx.lineTo(this.x + baseX[i + 1] * this.radinc, this.y + baseY[i + 1] * this.radinc)

        }
        ctx.stroke();
    }
    update() {
        this.r += 0.005 * this.d;
        if (this.r > canvas.width * 0.003 || this.r < canvas.width * 0.002) {
            this.d *= -1;
        }
        this.th += 0.02 * this.thdir
        if (this.th > 1) {
            this.thdir -= -2;
        }
    }
}

let base = new Base(canvas.width * 0.5);
function handelbase() {
    base.draw();
    base.update();
}


setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height) 
    handelbase()
    handelParticle()
    handelheartBeat() 
    handelHeartBeatInit()
    handelHeart()
    handelClock()
    friendship()
    hue += 0.5 
    if (hue > 240) {
       hue = 0
    }
},1000/60)