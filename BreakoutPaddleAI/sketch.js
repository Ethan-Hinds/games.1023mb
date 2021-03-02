var cWidth;
var cHeight;

var paddle;
var ball;
var bricks = [];



function setup() {
    cWidth = windowWidth -50;
    cHeight = windowHeight - 70;
    createCanvas(cWidth, cHeight);
    paddle = new Paddle(cWidth/2 - 125/2, cHeight * 0.9, 125, 15, 12);
    ball = new Ball(cWidth/2, cHeight/2, 0, 8, 10);

    createRandomBrick();
    setInterval(createRandomBrick, 3000);
}

function draw() {
    background("#000022");

    paddle.show();

    ball.move();
    ball.checkCollision();
    ball.show();

    for (let brick of bricks) {
        brick.move();
        brick.show();
    }

    doAI();
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
    
    let goalX = bouncedX;

    if (bricks.length == 0) {
        let paddleCenter = paddle.x + paddle.width/2;
        if (paddleCenter > goalX && abs(paddleCenter - goalX) > paddle.speed) {
            paddle.move("left");
        } else if (abs(paddleCenter - goalX) > paddle.speed) {
            paddle.move("right");
        }
        return;
    }


    let brick = bricks[0];

    let xDist;
    if (goalX > brick.x) {
        xDist = brick.x + brick.width/2 - goalX - paddle.width/2;
    } else {
        xDist = brick.x + brick.width/2 - goalX + paddle.width/2;
    }
    let time = sqrt(xDist**2 + (brick.y - paddle.y)**2) / sqrt(ball.dx**2 + ball.dy**2);
    let yDist = brick.y - paddle.y - ball.radius - brick.height/2 + brick.fallSpeed*time*0.5;
    let neededDx = xDist/yDist * abs(ball.dy);
    let neededDiff = neededDx * paddle.width / 10;

    if (abs(neededDiff) > paddle.width/2) {
        //neededDiff /= 4;
        //neededDiff = constrain(neededDiff, -paddle.width/2, paddle.width/2);
        print ("Banking");
        time = sqrt(xDist**2 + (cHeight + brick.y)**2) / sqrt(ball.dx**2 + ball.dy**2);
        yDist = -(cHeight + brick.y) - brick.fallSpeed*time;
        neededDx = xDist/yDist * abs(ball.dy)
        neededDiff = neededDx * paddle.width / 10;
        if (abs(neededDiff) > paddle.width/2) {
            print ("Unbankable!");
            neededDiff = constrain(neededDiff, -paddle.width/2, paddle.width/2);
        }

    }
    goalX += neededDiff;


    let paddleCenter = paddle.x + paddle.width/2;
	
    if (paddleCenter > goalX && abs(paddleCenter - goalX) > paddle.speed) {
        paddle.move("left");
    } else if (abs(paddleCenter - goalX) > paddle.speed) {
        paddle.move("right");
    }
}

function createRandomBrick() {
    bricks.push(new Brick(random(10, cWidth - 100), -15, 50, 15, 1));
}

function setLevel() {
    
    // bricks = [];
    // let brickWidth = 50;
    // let brickHeight = 15;
    // let brickfallSpeed = 0.1;

    // for (let x = brickWidth * 0.1; x < cWidth - 2*brickWidth; x += 2*brickWidth * 1.1) {
    //     for (let y = brickHeight; y < brickHeight*4; y += brickHeight*1.1) {
    //         bricks.push(new Brick(x, y, brickWidth, brickHeight, brickfallSpeed));
    //     }
    // }
}