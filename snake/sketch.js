var gameSpeed = 30;
var rows = 30;
var cols = 30;
var canvasSize = 750;
var addedPerCookie = 5;


var callUpdateTimer;

squareSize = canvasSize / rows;

var cookie;
var parts = [];
var snake;

var adding = 0;

function setup() {

    createCanvas(canvasSize, canvasSize);
    
    parts.push(new Part(rows/2, cols/2));
    snake = new Snake();
    snake.update();

    newCookie();
    callUpdate();

}

function draw() {
    background(0, 0, 255);

    cookie.show();

    for (part of parts) {
        part.show();
    }
    parts[0].show();
}

function restart() {
	parts = [];
	setup();
}

function update() {
    let possibleDirections = snake.calculatePossibleDirections();
    let directionOrder = snake.calculateDirectionOrder();
    if (possibleDirections.length > 0) {
        snake.direction = snake.calculateDirection(possibleDirections, directionOrder);
    } else {
        print("Game Over");
        clearInterval(callUpdateTimer)
        restart();
    }
    let lastPosition = [];
    if (adding > 0) {
        lastPosition = [parts[parts.length - 1].row, parts[parts.length - 1].col];
        newPart();
    }
    snake.move();
    snake.update();
    if (adding > 0) {
        parts[parts.length - 1].row = lastPosition[0];
        parts[parts.length - 1].col = lastPosition[1];
        adding -= 1;
    }
    if (snake.row == cookie.row && snake.col == cookie.col) {
        adding += addedPerCookie;
        newCookie();
    }
}

function newPart() {
    parts.push(new Part(parts[parts.length - 1].row, parts[parts.length - 1].col));
}

function newCookie() {
    let row;
    let col;
    do {
        row = floor(random(0, rows));
        col = floor(random(0, cols));
    } while (squareType(row, col) != "blank")
    cookie = new Cookie(row, col);
}




function blankNeighbors(row, col) {
    let counter = 0;
    let allowedSquares = ["blank", "cookie", "border"];
    if (allowedSquares.indexOf(squareType(row + 1, col)) > -1) {
        counter += 1;
    }
    if (allowedSquares.indexOf(squareType(row - 1, col)) > -1) {
        counter += 1;
    }
    if (allowedSquares.indexOf(squareType(row, col + 1)) > -1) {
        counter += 1;
    }
    if (allowedSquares.indexOf(squareType(row, col - 1)) > -1) {
        counter += 1;
    }
    return counter;
}


function squareType(row, col) {
    for (part of parts) {
        if (part.row == row && part.col == col) {
            return "part";
        }
    }
    if (cookie && (cookie.row == row && cookie.col == col)) {
        return "cookie";
    }
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return "border";
    }
    return "blank";
}
function callUpdate() {
    callUpdateTimer = setInterval(function(){ update(); }, gameSpeed);
}
