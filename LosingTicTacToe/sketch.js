
var board;

function setup() {
    createCanvas(700, 700);
    strokeWeight(2);
    textSize(70)
    textAlign(CENTER, CENTER);
    board = new Board();
}
function showRules() {
    document.getElementById("myDropdown").classList.toggle("show");
}


function mousePressed() {
    let x = mouseX;
    let y = mouseY;
    if (board.turn == "X") {
        let row;
        let col;
        if (y > board.y - board.squareSize*1.5 && y < board.y - board.squareSize/2) {
            row = 0;
        } else if (y > board.y - board.squareSize/2 && y < board.y + board.squareSize/2) {
            row = 1;
        } else if (y > board.y + board.squareSize/2 && y < board.y + board.squareSize*1.5) {
            row = 2;
        }

        if (x > board.x - board.squareSize*1.5 && x < board.x - board.squareSize/2) {
            col = 0;
        } else if (x > board.x - board.squareSize/2 && x < board.x + board.squareSize/2) {
            col = 1;
        } else if (x > board.x + board.squareSize/2 && x < board.x + board.squareSize*1.5) {
            col = 2;
        }

        let winPos = board.canWin("X");
        if (winPos) {
            if (row == winPos[0] && col == winPos[1]) {
                board.playMove(row, col);
            }
        } else {
            if (row != undefined && col != undefined) {
                if (board.grid[row][col] == "") {
                    let isGameOver = board.playMove(row, col);
                    if (!isGameOver) {
                        board.computerMove();
                    }
                }
            }
        }
    }
}

function draw() {
    background(0);
    board.show();
}