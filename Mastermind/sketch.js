const width = 700;
const height = 700;

const colors = ["red", "green", "blue", "yellow", "orange", "pink"];

var board;

var status = "play";

function setup() {
    createCanvas(width, height);
    newGame();
}

function draw() {
    background(0);
    if (board instanceof Board) {
        board.show();
        showLegend();
        board.highlightSelected();
    }

    if (status == "win") {
        textAlign(CENTER, CENTER);
        fill("white");
        textSize(100);
        text("I win!", board.x + board.width/2, height/2);
    } else if (status == "no solution") {
        textAlign(CENTER, CENTER);
        fill("white");
        textSize(100);
        text("No solution!", board.x + board.width/2, height/2);
    }
}

function newGame() {
    board = new Board();
    board.init();
}

function showLegend() {
    textSize(25);
    textAlign(CENTER, TOP);

    for (let i = 0; i < colors.length; i ++) {
        let color = colors[i];
        let yOff = i < 3 ? 0 : 80;
        fill(color);
        ellipse(board.x + board.width + 150 + (i%3)*40, board.y + yOff, 20, 20);
        fill("white");
        text(color[0], board.x + board.width + 150 + (i%3)*40, board.y + yOff + 10);
    }
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        let currentIndex = board.selected.index;
        if (currentIndex > 0) {
            if (board.currentRow === board.codeRow) {
                board.selected = board.currentRow.colorPegs[currentIndex - 1];
            } else {
                board.selected = board.currentRow.resultPegs[currentIndex - 1];
            }
        }


    } else if (keyCode == RIGHT_ARROW) {
        let currentIndex = board.selected.index;
        if (currentIndex < board.colsN - 1) {
            if (board.currentRow === board.codeRow) {
                board.selected = board.currentRow.colorPegs[currentIndex + 1];
            } else {
                board.selected = board.currentRow.resultPegs[currentIndex + 1];
            }
        }
    } else if (keyCode == 82) {
        board.selected.color = "red";
    } else if (keyCode == 87) {
        if (board.selected instanceof ResultPeg) {
            board.selected.color = "white";
        }
    } else if (keyCode == 71) {
        if (board.selected instanceof ColorPeg) {
            board.selected.color = "green";
        }
    } else if (keyCode == 66) {
        if (board.selected instanceof ColorPeg) {
            board.selected.color = "blue";
        }
    } else if (keyCode == 89) {
        if (board.selected instanceof ColorPeg) {
            board.selected.color = "yellow";
        }
    } else if (keyCode == 79) {
        if (board.selected instanceof ColorPeg) {
            board.selected.color = "orange";
        }
    } else if (keyCode == 80) {
        if (board.selected instanceof ColorPeg) {
            board.selected.color = "pink";
        }
    }
}

function mousePressed() {
    if (mouseX > board.submitButton.x && mouseX < board.submitButton.x + board.submitButton.width && mouseY > board.submitButton.y && mouseY < board.submitButton.y + board.submitButton.height) {
        if (board.currentRow === board.codeRow) {
            if (board.codeRow.colorPegs[0].color && board.codeRow.colorPegs[1].color && board.codeRow.colorPegs[2].color && board.codeRow.colorPegs[3].color) {
                board.codeSubmitted();
            }
        } else {
            board.resultPegsSubmitted();
        }
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}