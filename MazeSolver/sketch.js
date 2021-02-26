var cWidth = 500;
var cHeight = 500;

var rows = 20;
var cols = 20;

var squareSize = cWidth/rows;

var squares = [];

var start;
var goal;

var current;

var openSquares = [];
var closedSquares = [];

var finalPath = [];

var mode = 0; // 0 for draw, 1 for solve


function setup() {
    createCanvas(cWidth, cHeight);

    for (let r = 0; r < rows; r += 1) {
        squares.push([]);
        for (let c = 0; c < cols; c += 1) {
            squares[r].push(new Square(r, c, squareSize));
        }
    }

    textAlign(CENTER, CENTER);

    reset();
}

function reset() {
    openSquares = [];
    closedSquares = [];
    finalPath = [];
    start = squares[0][0];
    start.gScore = 0;
    start.isOpen = false;
    goal = squares[squares.length/2][squares.length/2];
    goal.fillColor = "green";
    current = start;
    start.addToOpen();
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
            let square = squares[r][c];
            if (square != start && square != goal) {
                square.setWalkable();
            }
            square.neighbors = [];
        }
    }
}

function randomMaze() {
    reset();
    let density = 0.25;
    for (let r = 0; r < squares.length; r += 1) {
        for (let c = 0; c < squares[r].length; c += 1) {
            let square = squares[r][c];
            if (random() < density && start != square && goal != square) {
                square.setUnwalkable();
            }
        }
    }
    solve();
}

function solve() {
    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
            squares[r][c].calculateNeighbors()
        }
    }
    mode = 1;
}

function draw() {
    background(255);
    if (current)
    current.fillColor = "green";
    showSquares();

    if (mode == 1 && current != goal) {
        evaluate();
    }
}

function mouseDragged() {
    if (mode == 0) {
        for (let r = 0; r < squares.length; r += 1) {
            for (let c = 0; c < squares[r].length; c += 1) {
                let square = squares[r][c];
                if (square.isInBounds(mouseX, mouseY) && start != square && goal != square) {
                    squares[r][c].setUnwalkable();
                }
            }
        }
    }
}

function mousePressed() {
	if (mode == 0) {
        for (let r = 0; r < squares.length; r += 1) {
            for (let c = 0; c < squares[r].length; c += 1) {
                let square = squares[r][c];
                if (square.isInBounds(mouseX, mouseY) && !square.isWalkable) {
                    squares[r][c].setWalkable();
                }
            }
        }
    }
}

function evaluate() {
    let minSquare = openSquares[0];
    let minScore = openSquares[0].fScore;

    for (let square of openSquares) {
        if (square.fScore < minScore) {
            minScore = square.fScore;
            minSquare = square;
        }
    }

    current = minSquare;
    minSquare.removeFromOpen();
    minSquare.addToClosed();
    for (let neighbor of minSquare.neighbors) {
        if (closedSquares.indexOf(neighbor) < 0 && neighbor.isWalkable) {
            if (openSquares.indexOf(neighbor) >= 0) {
                openSquares.splice(openSquares.indexOf(neighbor), 1);
            }
            neighbor.calculateScore();
            neighbor.addToOpen();
        }
    }

    if (current == goal) {
        let pathSquare = current;
        while (pathSquare != start) {
            finalPath.push(pathSquare);
            pathSquare = pathSquare.parent;
        }

        for (let r = 0; r < squares.length; r += 1) {
            for (let c = 0; c < squares[r].length; c += 1) {
                let square = squares[r][c];
                if (finalPath.indexOf(square) < 0 && square.isWalkable && square != start) {
                    square.fillColor = undefined;
                }
            }
        }
    }
}
// function mousePressed() {
//     let square;
//     for (let row of squares) {
//         for (let _square of row) {
//             if (_square.isInBounds(mouseX, mouseY)) {
//                 square = _square;
//             }
//         }
//     }
//     if (square && openSquares.indexOf(square) >= 0) {
//         current = square;
//         square.removeFromOpen();
//         square.addToClosed();
//         for (let neighbor of square.neighbors) {
//             if (closedSquares.indexOf(neighbor) < 0 && neighbor.isWalkable) {
//                 neighbor.calculateScore();
//                 neighbor.addToOpen();
//             }
//         }
//     }
// }


function showSquares() {
    for (let row of squares) {
        for (let square of row) {
            square.show();
        }
    }
}