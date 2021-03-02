var cWidth;
var cHeight;

var paddle;
var ball;
var bricks = [];

var lives = 3;



function setup() {
    cWidth = windowWidth -50;
    cHeight = windowHeight - 70;
    createCanvas(cWidth, cHeight);
    paddle = new Paddle(cWidth/2 - 125/2, cHeight * 0.9, 125, 15, 8);
    ball = new Ball(cWidth/2, cHeight/2, 0, 8, 10);

    //createRandomBrick();
    //setInterval(createRandomBrick, 1000);
    setLevel();
}

function draw() {
    background("#000022");

    for (let i = 0; i < 1; i += 1) {
        doAI();

        ball.move();
        ball.checkCollision();
    }

    paddle.show();
    ball.show();

    for (let brick of bricks) {
        brick.move();
        brick.show();
    }

    showLives();
}

function doAI() {

    let endX;
    if (ball.dy > 0) {
	    endX = ball.x + ball.dx/ball.dy * (paddle.y - ball.y);
    } else {
        endX = ball.x;
    }
	let bouncedX = abs(endX%cWidth);
	if (abs(parseInt(endX/cWidth)%2) == 1) {
		bouncedX = abs(cWidth - bouncedX);
	} else {
		bounceX = abs(bouncedX);
	}
    
    let goalX = bouncedX - paddle.width/2;

    if (bricks.length == 0) {
        if (paddle.x > goalX && abs(paddle.x - goalX) > paddle.speed) {
            paddle.move("left");
        } else if (abs(paddle.x - goalX) > paddle.speed) {
            paddle.move("right");
        }
        return;
    }

    let brick = bricks[0];
    let minDist = sqrt((brick.x - goalX)**2 + (brick.y - paddle.y)**2);
    for (let _brick of bricks) {
        _brick.fillColor = "red";
        let dist = sqrt((_brick.x - goalX)**2 + (_brick.y - paddle.y)**2);
        if (dist < minDist) {
            minDist = dist;
            brick = _brick;
        }
    }
    brick.fillColor = "#00ff00";

    let xDist = brick.x - bouncedX + brick.width/2;
    let time = sqrt(xDist**2 + (brick.y - paddle.y)**2) / sqrt(ball.dx**2 + ball.dy**2);
    //let time = 0;
    let yDist = brick.y - paddle.y + ball.radius*2 + brick.height + brick.fallSpeed*time;
    let neededDx = xDist/yDist * abs(ball.dy);
    let neededDiff = neededDx * paddle.width / 10;

    if (abs(neededDiff) > paddle.width*0.5 + ball.radius) {
        brick.fillColor = "yellow";
        time = sqrt(xDist**2 + (cHeight + brick.y - paddle.y)**2) / sqrt(ball.dx**2 + ball.dy**2)*2;
        yDist = -(cHeight + brick.y) - brick.fallSpeed*time;
        neededDx = xDist/yDist * abs(ball.dy)
        neededDiff = neededDx * paddle.width / 10;
        if (abs(neededDiff) > paddle.width*0.5 + ball.radius) {
            brick.fillColor = "blue";
            neededDiff = constrain(neededDiff, -paddle.width/2, paddle.width/2);
        }

    }
    goalX += neededDiff;

	
    if (paddle.x > goalX && abs(paddle.x - goalX) > paddle.speed) {
        paddle.move("left");
    } else if (abs(paddle.x - goalX) > paddle.speed) {
        paddle.move("right");
    }
}

function createRandomBrick() {
    bricks.push(new Brick(random(10, cWidth - 100), 20, 50, 15, 1.5));
}

function setLevel() {
    
    bricks = [];
    let brickWidth = 50;
    let brickHeight = 15;
    let brickfallSpeed = 0.02;

    for (let x = brickWidth * 0.1; x < cWidth - 2*brickWidth; x += brickWidth * 1.1) {
        for (let y = brickHeight; y < brickHeight*4; y += brickHeight*1.1) {
            bricks.push(new Brick(x, y, brickWidth, brickHeight, brickfallSpeed));
        }
    }
}

function showLives() {
    fill("red");
    for (let i = 0; i < lives; i += 1) {
        ellipse(15 + 15*i, cHeight-15, 10 ,10);
    }
}