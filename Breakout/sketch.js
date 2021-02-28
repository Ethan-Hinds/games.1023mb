var cWidth;
var cHeight;

var paddle;
var ball;
var bricks = [];

var paddleCode;

var mode = 1; // 0 is editor, 1 is paused, 2 is game

function setup() {
    cWidth = windowWidth -50;
    cHeight = windowHeight - 70;
    createCanvas(cWidth, cHeight);
    paddle = new Paddle(cWidth/2 - 125/2, cHeight * 0.9, 125, 15, 8);
    ball = new Ball(cWidth/2, cHeight/2, -2, 10, 10);

    document.getElementById("input").value = "// The code you write here will be executed every frame\n\n// You may create variables of your own, but some given variables are:  \n\n// paddle.x:      The position of the left of the paddle\n// paddle.y:      The y position of the paddle\n// paddle.width:  The width of the paddle\n// ball.x:        The x position of the ball\n// ball.y:        The y position of the ball\n// ball.dx:       The horizontal component of the ball's velocity\n// ball.dy:       The vertical component of the ball's velocity.\n// width:         The width of the canvas\n// height:        The height of the canvas\n\n// Note: (0, 0) is at the top left of the canvas\n\n// The allowed statements are setting variables and if statements\n// Allowed operators are: && || + - * / ^ <=, >=, >, <, ==\n\n// Set the paddle.x variable to change the paddle's position in game\n\n// Some sample code is below\n\n\n\n\n// Define a variable for the paddle speed\npaddleSpeed = 30\n\nif ball.dx < 0\n  paddle.x = paddle.x - paddleSpeed\nend\n\nif ball.dx >= 0\n  paddle.x = paddle.x + paddleSpeed\nend\n\n\n// Boundary Conditions\n\nif paddle.x <= 0\n  paddle.x = 0\nend\n\nif (paddle.x + paddle.width) >= width\n  paddle.x = width - paddle.width\nend"

    setLevel();
}

function draw() {
    background(0);

    if (mode == 2) {
        if (keyIsDown(LEFT_ARROW) && paddle.x > 0) {
            paddle.x -= paddle.speed;
        }
        if (keyIsDown(RIGHT_ARROW) && paddle.x < cWidth - paddle.width) {
            paddle.x += paddle.speed;
        }

        paddleCode.runCode({
            "paddle.x": paddle.x,
            "paddle.y": paddle.y,
            "paddle.width": paddle.width,
            "ball.x": ball.x,
            "ball.y": ball.y,
            "ball.dx": ball.dx,
            "ball.dy": ball.dy,
            "width": cWidth,
            "height": cHeight
        });
        paddle.show();

        ball.move();
        ball.checkCollision();
        ball.show();

        for (let brick of bricks) {
            brick.move();
            brick.show();
        }
    } else if (mode == 1) {
        paddle.show();
        ball.show();
        for (let brick of bricks) {
            brick.show();
        }
    } else if (mode == 0) {
        background(255);
    }
}

function setLevel() {
    bricks = [];
    let brickWidth = 50;
    let brickHeight = 15;
    let brickfallSpeed = 0.1;

    for (let x = brickWidth * 0.1; x < cWidth - 2*brickWidth; x += 2*brickWidth * 1.1) {
        for (let y = brickHeight; y < brickHeight*4; y += brickHeight*1.1) {
            bricks.push(new Brick(x, y, brickWidth, brickHeight, brickfallSpeed));
        }
    }
}

function startGame() {
    mode = 2;

    paddleCode = new PaddleCode(document.getElementById("input").value);
}

function openEditorMode() {
    mode = 0;
    document.getElementById("gameMode").style.display = "none";
    document.getElementById("editorMode").style.display = "";
}
function openGameMode() {
    mode = 1;
    document.getElementById("gameMode").style.display = "";
    document.getElementById("editorMode").style.display = "none";
}