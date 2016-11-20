var bubbles = [];
var bubbles2 = [];
var socket;
var once = true;

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (var i = 0; i < 200; i++) {
        bubbles[i] = new Bubble();
    }

    socket = io.connect();
    socket.on('mouse', draw2);
}

var draw2 = function (data) {
    if (once == true) {
        for (var i = 0; i < 200; i++) {
            bubbles2[i] = new Bubble2(data);
        }
        once = false;
    }

    for (var i = 0; i < 200; i++) {
        bubbles2[i].refreash(data);
        bubbles2[i].update();
    }
}


function draw() {
    background(51);
    for (var i = 0; i < 200; i++) {
        bubbles[i].update();
        bubbles[i].move();
        bubbles[i].show();
        if (once == false) {
            bubbles2[i].move();
            bubbles2[i].show();
        }
    }
    var data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data);
}


function Bubble() {
    this.life = 210;
    this.X = mouseX;
    this.Y = mouseY;
    this.C1 = random(0, 150);
    this.C2 = random(50, 255);
    this.size = random(10, 30);
    this.velocityX = random(-6, 6);
    this.velocityY = random(-6, 6);
    this.time = random(2.3, 4.5);

    this.update = function () {
        this.life -= this.time;
        if (this.X < 0 || this.X > width || this.Y < 0 || this.Y > height || this.life < 10) {
            this.X = mouseX;
            this.Y = mouseY;
            this.life = 210;
        }
    }

    this.move = function () {
        this.X += this.velocityX;
        this.Y += this.velocityY;

    }

    this.show = function () {
        noStroke();
        fill(0, this.C1, this.C2, this.life);
        ellipse(this.X, this.Y, this.size, this.size);
    }
}

/*!!!!!!!!!!!!!OBIEKT DLA 2 OSOBY!!!!!!!!!!!!!!!*/

function Bubble2(data) {
    this.life = 210;
    this.X = data.x;
    this.X2;
    this.Y = data.y;
    this.Y2;
    this.C1 = random(0, 150);
    this.C2 = random(50, 255);
    this.size = random(10, 30);
    this.velocityX = random(-6, 6);
    this.velocityY = random(-6, 6);
    this.time = random(2, 6);

    this.refreash = function (data2) {
        this.X2 = data2.x;
        this.Y2 = data2.y;
    }

    this.update = function () {
        this.life -= this.time;
        if (this.X < 0 || this.X > width || this.Y < 0 || this.Y > height || this.life < 20) {
            this.X = this.X2;
            this.Y = this.Y2;
            this.life = 210;
        }
    }

    this.move = function () {
        this.X += this.velocityX;
        this.Y += this.velocityY;
    }

    this.show = function () {
        noStroke();
        fill(this.C2, this.C1, 0, this.life);
        ellipse(this.X, this.Y, this.size, this.size);
    }
}
