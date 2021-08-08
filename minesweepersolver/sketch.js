
var rows = 15;
var cols = 15;
var boxSize = 35;
var cWidth;
var cHeight;

var anyOpened = false;
var gameOver = false;

var mineDensity = 0.25;
var minesRemaining = 0;

var boxes = [];
var mouse;
var mouseImage;

var scores;

function preload() {
    mouseImage = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABgElEQVRYR72XC1EDQQxAqQJAAeAAFAAKAAVQBQUH4AAUUBQADloHxQEOAAUlb2Y7syzX2ySbu8xkrp80eZvf9SY7dXkTkwPRc9HvurnNYqIwXyeblVxPFPYmEwsAjueiU1OEirEVAHd3oo9REB4AYpMFstEsXgCakaakL5rEC0BQII7S1Q3RAkBQMtA0nq0AzZMRAQDEk+itpw5RAO7JiAQAgk1pmoxoACYDiE9tOaIBzJMxBAAQ3EGvNFkYCkA9nkMCqCZjaAAg2JSLbeUYA6D3xjUGQO9kRAJ8pFQfy/W0I+Uv8tlN+XkLwI84280csny4PW8EEPRQ9EyUf1GM5x/xArwnZ8+Fv1FWMSfnVMhXAdCZ5vLU+XtPBvKxIqUXmUM6fr8vYGsJHsTBfebkUl6/Fk5Zwf9qvQ3KkoFlaqbSF6fOm9FUBg3AQgJsurnr0Wwu3197y6ABqJW0qwxT+RFgVYkAIIi7DFEALJlZdlz141sUwF7qfFYwzUpZVI/yv1q2WSFCThG7AAAAAElFTkSuQmCC");
}

function restart() {
    noCanvas();
    anyOpened = false;
    gameOver = false;
    minesRemaining = 0;
    rows = $("#rows").val();
    cols = $("#cols").val();
    cWidth = cols * boxSize;
    cHeight = rows * boxSize;
    createCanvas(cWidth, cHeight)
    mineDensity = $("#density").val();
    boxes = [];
    createBoard();
    for (let box of boxes) {
        box.getNeighbors();
    }
    document.getElementById("playComputer").checked = false;
    playComputerUpdate();
    if (document.getElementById("playComputer").checked) {
        findMove();
    }
    $("label").remove();
    $("br").remove();
    $("input").remove();
    $("p").remove();
    $("button").remove();
    $("body").append("<br> <p id = 'minesRemaining'> </p>");
    $("body").append("<br> <button onclick = 'restart()'> New Game </button>");
    $("body").append("<label> Play With Computer </label> <input type = 'checkbox' id = 'playComputer' onclick = 'playComputerUpdate()'> </input>")
    $("body").append("<br> <label> Mine Density </label> <input id = 'density' type='range' min='0.1' max='0.9' value='" + mineDensity + "' step = '0.01'> <p id = 'densityDisplay'> </p>");
    $("body").append("<br> <label> Rows </label> <input type = 'range' id = 'rows' min = '3' max = '30' value =  '" + rows + "'> </input> <p id = 'rowsDisplay'> </p>");
    $("body").append("<br> <label> Cols </label> <input type = 'range' id = 'cols' min = '3' max = '30' value = '" + cols + "'> </input> <p id = 'colsDisplay'> </p>");
}

function setup() {
    //createCanvas(cWidth, cHeight);
    $("body").append("<br> <p id = 'minesRemaining'> </p>");
    $("body").append("<br> <button onclick = 'restart()'> New Game </button>");
    $("body").append("<label> Play With Computer </label> <input type = 'checkbox' id = 'playComputer' onclick = 'playComputerUpdate()'> </input>")
    $("body").append("<br> <label> Mine Density </label> <input id = 'density' type='range' min='0.1' max='0.9' value='" + mineDensity + "' step = '0.01'> <p id = 'densityDisplay'> </p>");
    $("body").append("<br> <label> Rows </label> <input type = 'range' id = 'rows' min = '3' max = '30' value =  '" + rows + "'> </input> <p id = 'rowsDisplay'> </p>");
    $("body").append("<br> <label> Cols </label> <input type = 'range' id = 'cols' min = '3' max = '30' value = '" + cols + "'> </input> <p id = 'colsDisplay'> </p>");
    mouse = new Mouse(0, 0, true);
    restart();
}
function draw() {
    background(0);
    for (let box of boxes) {
        box.show();
    }
    mouse.show();
    if (mouse.action) {
        mouse.move();
    }
    $("#minesRemaining").text("Mines Remaining: " + minesRemaining);
    $("#densityDisplay").text($("#density").val());
    $("#rowsDisplay").text($("#rows").val());
    $("#colsDisplay").text($("#cols").val());
}

function createBoard() {
    for (let r = 0; r < rows; r += 1) {
        for  (let c = 0; c < cols; c += 1) {
            let isMine = random() < mineDensity;
            minesRemaining += isMine;
            boxes.push(new Box(r, c, isMine));
        }
    }
}

function getBoxAt(r, c) {
    for (let i = 0; i < boxes.length; i += 1) {
        if (boxes[i].row == r && boxes[i].col == c) {
            return boxes[i];
        }
    }
    return undefined;
}

function findMove() {
    if (document.getElementById("playComputer").checked) {
        let found = false;
        scores = {};
        for (let box of boxes) {
            if (box.number > 0) { // Box is opened and also has mineNeighbors
                let flaggedNeighbors = 0;
                let unflaggedNeighbors = [];
                for (let neighbor of box.neighbors) {
                    if (!neighbor.isOpenned) {
                        if (neighbor.isFlagged) {
                            flaggedNeighbors += 1;
                        } else {
                            unflaggedNeighbors.push(neighbor);
                        }
                    }
                }
                if (box.number - flaggedNeighbors == unflaggedNeighbors.length) {
                    for (let neighbor of unflaggedNeighbors) {
                        //neighbor.isFlagged = true;
                        found = true;
                        mouse.setGoal(neighbor, "flag");
                        break;
                    }
                } else if (box.number - flaggedNeighbors == 0 && unflaggedNeighbors.length > 0) {
                    for (let neighbor of unflaggedNeighbors) {
                        //neighbor.open();
                        found = true;
                        mouse.setGoal(neighbor, "open");
                        break;
                    }
                } else {
                    scores[[box.row, box.col]] = box.number - flaggedNeighbors;
                }
            }
            if (found) {
                break;
            }
        }
        if (!found) {
            print ("Guessing")
            if (Object.keys(scores).length > 0) {
                let maxKey = Object.keys(scores).reduce(function(a, b){ return scores[a] < scores[b] ? a : b });
                maxKey = maxKey.split(",");
                let box = getBoxAt(maxKey[0], maxKey[1]);
                for (let neighbor of box.neighbors) {
                    if (!neighbor.isOpenned && !neighbor.isFlagged) {
                        mouse.setGoal(neighbor, "open");
                    }
                }
            //} else if (anyOpened == false) {
            } else {
                let r;
                let c;
                do {
                    r = floor(random(rows));
                    c = floor(random(cols));
                } while (getBoxAt(r, c).isOpenned);
                mouse.setGoal(getBoxAt(r, c), "open");
            }
        }
    }
}

function mousePressed() {
    if (!gameOver) {
        let row = floor(mouseY / boxSize);
        let col = floor(mouseX / boxSize);
        let b = getBoxAt(row, col);
        if (mouseButton == LEFT) {
            if (b && !b.isOpenned && !b.isFlagged) {
                b.open();
                anyOpened = true;
            }
        } else if (mouseButton == RIGHT) {
            if (b && !b.isOpenned && !b.isFlagged) {
                b.isFlagged = true;
                minesRemaining -= 1;
            } else if (b && !b.isOpenned && b.isFlagged) {
                b.isFlagged = false;
                minesRemaining += 1;
            }
        }
    }
}

function playComputerUpdate() {
    if (document.getElementById("playComputer").checked) {
        findMove();
    } else {
        mouse.setGoal(new Box(-1, -1, false), "Go Away Mouse");
    }
}