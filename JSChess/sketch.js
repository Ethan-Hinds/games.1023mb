var squareSize = 75;

var squares = [];
var pieces = [];

var whiteKing;
var blackKing;

var turn = "white";
var selectedPiece = null;
var animating = [null, 0, 0, 0, 0, 0]; // Piece, iterations, targetX, targetY, dx, dy

function setup() {

    createCanvas(8 * squareSize, 8 * squareSize);

    whiteRookImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png");
    whiteKnightImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png");
    whiteBishopImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png");
    whiteQueenImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png");
    whiteKingImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png");
    whitePawnImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png");

    blackRookImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png");
    blackKnightImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png");
    blackBishopImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png");
    blackQueenImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png");
    blackKingImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png");
    blackPawnImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png");

    var whit

    createBoard();
    createPieces();

    for (let piece of pieces) {
        piece.update();
    }

}

function draw() {
    background(0, 0, 0);
    
    for (let square of squares) {
        square.show();
    }

    for (let piece of pieces) {
        piece.show();
        piece.update();
    }

    if (animating[0]) {
        if (abs(animating[2] - animating[0].x) < 1 && abs(animating[3] - animating[0].y) < 1) {
            let targetRow = Math.round(animating[3] / squareSize);
            let targetCol = Math.round(animating[2] / squareSize)
            let pieceAtTarget = pieceAtSquare(targetRow, targetCol);
            if (pieceAtTarget) {
                pieces.splice(pieces.indexOf(pieceAtTarget), 1);
            }
            animating[0].row = targetRow;
            animating[0].col = targetCol;
            animating[0] = null;
            if (turn == "black") {
                turn = "white";
                let possibleMoves = [];
                for (let piece of pieces) {
                    if (piece.color == "white") {
                        let legalMoves = piece.calculateLegalMoves(true);
                        possibleMoves = concat(possibleMoves, legalMoves);
                    }
                }

                if (possibleMoves.length == 0) {
                    if (isAttacked(whiteKing)) {
                        alert ("Computer wins!");
                    } else {
                        alert("Stalemate");
                    }
                }

            } else {
                turn = "black";
                computerMove();
            }
        } else {
            animating[0].move(animating[4], animating[5]);
        }
    }

}

function drawPiece(piece) {
    image(piece.image, piece.x, piece.y, squareSize, squareSize);
}

function createBoard() {
    for (let r = 0; r < 8; r += 1) {
        for (let c = 0; c < 8; c += 1) {
            squares.push(new Square(r,c));
        }
    }
}

function createPieces() {
    pieces.push(new Piece(0,0,"rook", "black", 5, blackRookImg));
    pieces.push(new Piece(0,1,"knight", "black", 3, blackKnightImg));
    pieces.push(new Piece(0,2,"bishop", "black", 3, blackBishopImg));
    pieces.push(new Piece(0,3,"queen", "black", 9, blackQueenImg));
    pieces.push(new Piece(0,4,"king", "black", 0, blackKingImg));
    pieces.push(new Piece(0,5,"bishop", "black", 3, blackBishopImg));
    pieces.push(new Piece(0,6,"knight", "black", 3, blackKnightImg));
    pieces.push(new Piece(0,7,"rook", "black", 5, blackRookImg));

    pieces.push(new Piece(7,0,"rook", "white", 5, whiteRookImg));
    pieces.push(new Piece(7,1,"knight", "white", 3, whiteKnightImg));
    pieces.push(new Piece(7,2,"bishop", "white", 3, whiteBishopImg));
    pieces.push(new Piece(7,3,"queen", "white", 9, whiteQueenImg));
    pieces.push(new Piece(7,4,"king", "white", 0, whiteKingImg));
    pieces.push(new Piece(7,5,"bishop", "white", 3, whiteBishopImg));
    pieces.push(new Piece(7,6,"knight", "white", 3, whiteKnightImg));
    pieces.push(new Piece(7,7,"rook", "white", 5, whiteRookImg));

    blackKing = pieces[4];
    whiteKing = pieces[12];

    for (let r = 1; r <= 6; r += 5) {
        for (let c = 0; c < 8; c += 1) {
            let color = r == 1 ? "black" : "white";
            if (color == "white") {
                pieces.push(new Piece(r,c,"pawn", "white", 1, whitePawnImg));
            } else {
                pieces.push(new Piece(r,c,"pawn", "black", 1, blackPawnImg))
            }
        }
    }
}

function pieceAtSquare(row, col) {
    for (let piece of pieces) {
        if (piece.row == row && piece.col == col) {
            return piece;
        }
    }
    return null
}

function getSquare(row, col) {
    for (let square of squares) {
        if (square.row == row && square.col == col) {
            return square;
        }
    }
    return null
}

function inBounds(r, c) {
    return (r >= 0 && r < 8 && c >= 0 && c < 8);
}

function isAttacked(thePiece) {
    for (let piece of pieces) {
        if (piece.color != thePiece.color) {
            let attacking = piece.calculateLegalMoves(false);
            for (let i = 0; i < attacking.length; i += 1) {
                if (sameArrays(attacking[i], [thePiece.row, thePiece.col])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function sameArrays(a, b) {
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function isLegalMove(piece, row, col) {
    let legalMoves = piece.calculateLegalMoves(true);
    for (let square of legalMoves) {
        if (square[0] == row && square[1] == col) {
            return true;
        }
    }
    return false;
}

function highlightLegalMoves(piece) {
    let moves = piece.calculateLegalMoves(true);
    for (let square of moves) {
        getSquare(square[0], square[1]).color = "yellow";
    }
}

function unhighlightSquares() {
    for (let square of squares) {
        square.color = square.row%2 == square.col%2 ? "tan" : "#654321";
    }
}

function setupAnimation(piece, targetRow, targetCol) {
    piece.numberOfMoves += 1;
    animating[0] = piece
    animating[1] = 50;
    animating[2] = targetCol * squareSize;
    animating[3] = targetRow * squareSize;
    animating[4] = (animating[2] - animating[0].x) / animating[1];
    animating[5] = (animating[3] - animating[0].y) / animating[1];
}

function mouseClicked() {
    let squareRow = floor(mouseY/squareSize);
    let squareCol = floor(mouseX/squareSize);

    if (animating[0] == null && turn == "white") {
        if (selectedPiece == null && pieceAtSquare(squareRow, squareCol) && pieceAtSquare(squareRow, squareCol).color == "white") {
            unhighlightSquares();
            selectedPiece = pieceAtSquare(squareRow, squareCol);
            highlightLegalMoves(selectedPiece);
        } else if (animating[0] == null && selectedPiece) {
            if (isLegalMove(selectedPiece, squareRow, squareCol)) {
                setupAnimation(selectedPiece, squareRow, squareCol);
                selectedPiece = null;
                unhighlightSquares();
            } else {
                selectedPiece = null;
                unhighlightSquares();
            }
        }
    }
}

function computerMove() {
    let possibleMoves = [];
    let pieceMove = [];
    for (let piece of pieces) {
        if (piece.color == "black") {
            let legalMoves = piece.calculateLegalMoves(true);
            possibleMoves = concat(possibleMoves, legalMoves);
            for (let i = 0; i < legalMoves.length; i += 1) {
                pieceMove.push(piece);
            }
        }
    }

    if (possibleMoves.length == 0) {
        if (isAttacked(blackKing)) {
            alert("Player wins!");
        } else {
            alert("Stalemate!");
        }
    } else {

        let points = [];
        for (let i = 0; i < possibleMoves.length; i += 1) {
            let squareRow = possibleMoves[i][0];
            let squareCol = possibleMoves[i][1];
            let pieceAt = pieceAtSquare(squareRow, squareCol);
            if (pieceAt) {
                points.push(pieceAt.points);
            } else {
                points.push(0);
            }
        }
        let indices = getAllIndexes(points, Math.max(...points));
        let bestPieceMoves = [];
        let bestMoves = [];
        for (index of indices) {
            bestPieceMoves.push(pieceMove[index]);
            bestMoves.push(possibleMoves[index]);
        }

        let randomIndex = floor(random(0, bestPieceMoves.length))
        let pieceToMove = bestPieceMoves[randomIndex];
        let bestMove = bestMoves[randomIndex];

        getSquare(pieceToMove.row, pieceToMove.col).color = "yellow";
        getSquare(bestMove[0], bestMove[1]).color = "yellow";
        setupAnimation(pieceToMove, bestMove[0], bestMove[1]);
    }

}