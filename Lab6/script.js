const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let numberOfBalls, minimumDistance
let balls = [];
let isStarted = false;

class Ball {
    constructor(x, y, velX, velY, color) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        context.fill();
    }

    update() {
        if (this.x + 10 >= canvas.width || this.x - 10 <= 0) {
            this.velX = -this.velX;
        }
        if (this.y + 10 >= canvas.height || this.y - 10 <= 0) {
            this.velY = -this.velY;
        }
        this.x += this.velX;
        this.y += this.velY;
    }
}

const start = () => {
    if(isStarted){
        return;
    }

    numberOfBalls = document.querySelector("#numBalls").value;
    minimumDistance = document.querySelector("#minDist").value;

    balls = [];
    for (let i = 0; i < numberOfBalls; i++) {
        let x = Math.floor(Math.random() * (canvas.width - 20)) + 10;
        let y = Math.floor(Math.random() * (canvas.height - 20)) + 10;
        let velX = Math.random();
        let velY = Math.random();
        let color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`;
        balls.push(new Ball(x, y, velX, velY, color));
    }
    animate();
    isStarted = true;
}

const reset = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
    isStarted = false;
}

const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let dist = calculateDistance(balls[i], balls[j]);
            if (dist < minimumDistance) {
                context.beginPath();
                context.strokeStyle = "black";
                context.moveTo(balls[i].x, balls[i].y);
                context.lineTo(balls[j].x, balls[j].y);
                context.stroke();
            }
        }
        balls[i].draw();
        balls[i].update();
    }
    requestAnimationFrame(animate);
}

const calculateDistance = (ball1, ball2) => {
    let xDist = ball2.x - ball1.x;
    let yDist = ball2.y - ball1.y;
    return Math.sqrt(xDist * xDist + yDist * yDist);
}
