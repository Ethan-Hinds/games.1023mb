
var board = [];

var rows = 24;
var cols = 10;
var cellSize = 30;

var cWidth = cols * cellSize;
var cHeight = rows * cellSize;

var piece;
var deadBlocks = [];
var cells = [];

// Positive Number
var emptySeverity = 10;

var tickSpeed = 3;

var playComputer = true;

function setup() {
    createCanvas(cWidth, cHeight);

    $("body").append("<br><label> Speed </label> <input id = 'tickSpeedSlider' type = 'range' min = '1' max = '30' value = '1'>")
    $("body").append("<button onclick = 'restart()'> New Game");
    $("body").append("<br> <label> Play With Computer </label> <input type = 'checkbox' id = 'playComputer' onclick = 'playComputerUpdate()' checked> </input>")
    //noLoop();
    restart();
}

function restart() {

    cells = [];
    piece = undefined;
    deadBlocks = [];

    for (let r = 0; r < rows; r += 1) {
        cells.push([]);
        for (let c = 0; c < cols; c += 1) {
            cells[r].push(new Cell(r, c));
        }
    }

    for (let r = 0; r < cells.length; r += 1) {
        for (let c = 0; c < cells[r].length; c += 1) {
            cells[r][c].getCellBelow();
        }
    }
    tickSpeed = 3;

    createNewPiece();

}

function playComputerUpdate() {
    if (document.getElementById("playComputer").checked) {
        playComputer = true;
    } else {
        playComputer = false;
    }
}

function draw() {

    background(0);

    for (block of piece.blocks) {
        block.show();
     }
     for (block of deadBlocks) {
         block.show();
     }
    if (tickSpeed >= 0 && frameCount % tickSpeed == 0) {
        tickSpeed = $("#tickSpeedSlider").val();
        gameTick();
    }
}

function createNewPiece() {
    piece = new Piece(0, floor(cols/2) - 2, floor(random(0,7)));
    //piece = new Piece(0, floor(cols/2) - 2, 1)
    piece.init();
    let canPlace = true;
    for (let r = 0; r < piece.orientations[0].length; r += 1) {
        for (let c = 0; c < piece.orientations[0][r].length; c += 1) {
            if (cells[piece.row + r][piece.col + c].block != undefined) {
                canPlace = false;
            }
        }
    }
    if (canPlace) {
        piece.updateBlocks();
        if (playComputer) {
            piece.findBestMove();
        }
    } else {
        //piece.delete();
        tickSpeed = -1;
    }
}

function gameTick() {
    if (piece.canMove([1, 0])) {
        piece.move([1, 0]);
    } else {
        for (block of piece.blocks) {
            deadBlocks.push(block);
        }
        createNewPiece();
        checkForFullRow();
    }
}

function keyPressed() {
    if (keyCode == 90) {
        if (piece.canRotate(1)) {
            piece.rotate(1);
        }
    } else if (keyCode == 88 || keyCode == 38) {
        if (piece.canRotate(-1)) {
            piece.rotate(-1);
        }
    } else if (keyCode == 37) {
        if (piece.canMove([0, -1])) {
            piece.move([0, -1]);
        }
    } else if (keyCode == 39) {
        if (piece.canMove([0, 1])) {
            piece.move([0, 1]);
        }
    } else if (keyCode == 40) {
        if (piece.canMove([1, 0])) {
            piece.move([1, 0]);
        }
    } else if (keyCode == 32) {
        piece.hardDrop(true);
    }
}

function checkForFullRow() {
    for (let r = 0; r < cells.length; r += 1) {
        let full = true;
        for (let c = 0; c < cells[r].length; c += 1) {
            if (cells[r][c].block == undefined) {
                full = false;
            }
        }
        if (full) {
            for (let c = 0; c < cells[r].length; c += 1) {
                deadBlocks.splice(deadBlocks.indexOf(cells[r][c].block), 1)
                cells[r][c].block = undefined;
            }

            for (let r2 = r; r2 >= 1; r2 -= 1) {
                for (let c2 = 0; c2 < cells[r2].length; c2 += 1) {
                    let block = cells[r2-1][c2].block;
                    if (deadBlocks.indexOf(block) >= 0) {
                        cells[r2][c2].block = block;
                        cells[r2-1][c2].block = undefined;

                        if (block) {
                            block.cell = cells[r2][c2];
                            block.row += 1;
                        }

                    }
                }
            }
        }
    }
}