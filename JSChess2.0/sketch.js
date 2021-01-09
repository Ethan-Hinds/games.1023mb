var board;

var pieceImages = {};

function preload() {
    pieceImages["whiteRook"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png");
    pieceImages["whiteKnight"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png");
    pieceImages["whiteBishop"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png");
    pieceImages["whiteQueen"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png");
    pieceImages["whiteKing"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png");
    pieceImages["whitePawn"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png");
    pieceImages["blackRook"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png");
    pieceImages["blackKnight"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png");
    pieceImages["blackBishop"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png");
    pieceImages["blackQueen"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png");
    pieceImages["blackKing"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png");
    pieceImages["blackPawn"] = loadImage("https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png");
}

function setup() {
    board = new Board(true, "white");
    createCanvas(board.squareSize*8, board.squareSize*8);
}

function mousePressed() {
    if (!board.animatingPiece && board.turn == "white") {
        let squareFound = false;
        for (let row of board.grid) {
            for (let square of row) {
                if (square.isInBounds(mouseX, mouseY)) {



                    if (!board.selectedPiece) {
                        if (square.piece) {
                            board.select(square.piece);
                        }
                    } else {
                        if (square.piece && square.piece.color == "white") {
                            board.unselect(board.selectedPiece);
                            board.select(square.piece);
                        } else if (board.selectedPiece.possibleMoves.indexOf(square) >= 0) {
                            if (square === board.whiteKing.kingCastleSquare) {
                                board.whiteKing.moveToSquare(board.grid[7][6]);
                                board.isCastling = true;;
                            } else {
                                board.selectedPiece.moveToSquare(square);
                            }
                        } else {
                            board.unselect(board.selectedPiece);
                        }
                    }


                    squareFound = true;
                    break;
                }
            }
            if (squareFound) {
                break;
            }
        }
    }
}

function draw() {
    background(0);
    board.show();

    if (board.animatingPiece) {
        let piece = board.animatingPiece[0];
        let startx = board.animatingPiece[1];
        let starty = board.animatingPiece[2];
        let dx = (piece.square.x - startx) / 20;
        let dy = (piece.square.y - starty) / 20;
        piece.updateXY(dx, dy);
        if (dist(piece.x, piece.y, piece.square.x, piece.square.y) < 1) {
            piece.finishMoving();
        }
    }
}