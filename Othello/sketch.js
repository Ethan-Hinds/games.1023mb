var board;
var cWidth = 750;
var cHeight = cWidth - 200;

var turn = "black";
var withComputer = false;

function setup() {
    createCanvas(cWidth, cHeight);

    $("body").append("<br> <label> Play with Computer </label> <input type = 'checkbox' id = 'playersInput' onclick = 'updatePlayers()'> </input>")

    reset();
}

function draw() {
    background(255);
    fill("#008800");
    rect(0, 0, board.size, board.size);
    board.show();
    showStatusBar();
}

function reset() {
    board = new Board(8, cWidth - 200);
    board.getPossibleMoves();
    turn = "black";
}

function updatePlayers() {
    if (document.getElementById("playersInput").checked) {
        withComputer = true;
    } else {
        withComputer = false;
    }
    reset();
}

function mousePressed() {
    if (turn == "black" || !withComputer) {
        for (let r of board.grid) {
            for (let square of r) {
                if (square.isInBounds(mouseX, mouseY) && !square.color) {
                    if (`${square.row},${square.col}` in board.moves) {
                        board.placePiece(square, turn, true);
                        turn = turn == "white" ? "black" : "white";
                        board.getPossibleMoves();
                        if (withComputer) {
                            board.computerMove();
                        }
                    }
                }
            }
        }
    }

}

function showStatusBar() {

    let totals = {"white": 0, "black": 0};
    for (let r of board.grid) {
        for (let square of r) {
            if (square.color == "white") {
                totals.white += 1;
            } else if (square.color == "black") {
                totals.black += 1;
            }
        }
    }

    textSize("40");
    textAlign(LEFT, CENTER);

    fill(turn);
    ellipse((board.size + cWidth)/2, cHeight * 1/4, board.size/8 * 0.8, board.size/8 * 0.8);
    fill("white");
    ellipse((board.size + cWidth)/2, cHeight * 3/5, board.size/8 * 0.8, board.size/8 * 0.8);
    fill("black");
    text(totals.white, (board.size + cWidth)/2 + board.size/15, cHeight * 3/5);
    fill("black");
    ellipse((board.size + cWidth)/2, cHeight * 4/5, board.size/8 * 0.8, board.size/8 * 0.8);
    text(totals.black, (board.size + cWidth)/2 + board.size/15, cHeight * 4/5);
}