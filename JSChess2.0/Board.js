class Board {
    constructor(isOriginal, turn) {
        this.isOriginal = isOriginal
        this.turn = turn;
        this.squareSize = 75;
        this.createGrid();
        this.pieces = [];
        if (isOriginal) {
            this.addStartingPieces();
        }

        for (let piece of this.pieces) {
            piece.setSquare();
        }

        this.setPossibleMoves();
        this.selectedPiece;

        this.whiteKing;
        this.blackKing;

        this.isCastling = false;
        this.animatingPiece;
        this.parent;
    }

    // check if any pieces of color color are attacking square Square
    isAttacked(_square, color) {
        for (let piece of this.pieces) {
            if (piece.color == color) {
                for (let square of piece.possibleMoves) {
                    if (square === _square) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    getDuplicate() {
        let newBoard = new Board(false, this.turn);
        newBoard.parent = this;
        newBoard.pieces = [];
        for (let r = 0; r < 7; r += 1) {
            for (let c = 0; c < 7; c += 1) {
                newBoard.grid[r][c].piece = undefined;
            }
        }
        for (let piece of this.pieces) {
            let newPiece = piece.getDuplicate(newBoard.grid[piece.square.row][piece.square.col]);
            newBoard.pieces.push(newPiece);
            if (piece === this.whiteKing) {
                newBoard.whiteKing = newPiece;
            } else if (piece === this.blackKing) {
                newBoard.blackKing = newPiece;
            }
        }

        for (let piece of newBoard.pieces) {
            piece.setSquare();
        }
        return newBoard;
    }

    setPossibleMoves() {
        for (let piece of this.pieces) {
            piece.setPossibleMoves();
        }
    }

    select(piece) {
        this.selectedPiece = piece;
        for (let square of piece.possibleMoves) {
            square.highlight();
        }
    }
    
    unselect(piece) {
        this.selectedPiece = undefined;
        for (let square of piece.possibleMoves) {
            square.unhighlight();
        }
    }

    isCheck() {
        // returns "white" if white is in check, and "black" if black is in check
        for (let piece of this.pieces) {
            if (piece.color == "black") {
                for (let square of piece.possibleMoves) {
                    if (square === this.whiteKing.square) {
                        return "white";
                    }
                }
            }
        }

        for (let piece of this.pieces) {
            if (piece.color == "white") {
                for (let square of piece.possibleMoves) {
                    if (square === this.blackKing.square) {
                        return "black";
                    }
                }
            }
        }
        return false;
    }

    addStartingPieces() {
        this.pieces.push(new Rook("black", this.grid[0][0], false, this));
        this.pieces.push(new Rook("black", this.grid[0][7], false, this));
        this.pieces.push(new Knight("black", this.grid[0][1], false, this));
        this.pieces.push(new Knight("black", this.grid[0][6], false, this));
        this.pieces.push(new Bishop("black", this.grid[0][2], false, this));
        this.pieces.push(new Bishop("black", this.grid[0][5], false, this));
        this.pieces.push(new Queen("black", this.grid[0][3], false, this));
        this.blackKing = new King("black", this.grid[0][4], false, false, this)
        this.pieces.push(this.blackKing);

        for (let i = 0; i < 8; i += 1) {
            this.pieces.push(new Pawn("black", this.grid[1][i], false, this));
        }

        this.pieces.push(new Rook("white", this.grid[7][0], false, this));
        this.pieces.push(new Rook("white", this.grid[7][7], false, this));
        this.pieces.push(new Knight("white", this.grid[7][1], false, this));
        this.pieces.push(new Knight("white", this.grid[7][6], false, this));
        this.pieces.push(new Bishop("white", this.grid[7][2], false, this));
        this.pieces.push(new Bishop("white", this.grid[7][5], false, this));
        this.pieces.push(new Queen("white", this.grid[7][3], false, this));
        this.whiteKing = new King("white", this.grid[7][4], false, false, this)
        this.pieces.push(this.whiteKing);

        for (let i = 0; i < 8; i += 1) {
            this.pieces.push(new Pawn("white", this.grid[6][i], false, this));
        }

        // this.blackKing = new King("black", this.grid[0][4], this)
        // this.pieces.push(this.blackKing);
        // this.whiteKing = new King("white", this.grid[2][4], this)
        // this.pieces.push(this.whiteKing);
        // this.pieces.push(new Queen("white", this.grid[0][0], this));
    }

    createGrid() {
        this.grid = [];
        for (let r = 0; r < 8; r += 1) {
            this.grid.push([]);
            for (let c = 0; c < 8; c += 1) {
                this.grid[r].push(new Square(r, c, this));
            }
        }
    }

    getBestMove(side) {
        let bestScore = side == "white" ? -Infinity : Infinity;
        let bestMove = []; // [piece, square]
        for (let piece of this.pieces) {
            if (piece.color == side) {
                for (let square of piece.possibleMoves) {
                    let newBoard = this.getDuplicate();
                    let newSquare = newBoard.grid[square.row][square.col];
                    // These go together
                    newBoard.grid[piece.square.row][piece.square.col].piece.moveToSquare(newSquare);
                    //if (newBoard.parent.isOriginal) {
                        newBoard.setPossibleMoves();
                    //}
                    //
                    let score = newBoard.evaluate();
                    if (side == "white") {
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = [piece, square];
                        }
                    } else if (side == "black") {
                        if (score < bestScore) {
                            bestScore = score;
                            bestMove = [piece, square];
                        }
                    }
                }
            }
        }
        return bestMove;
    }

    evaluate() {

        let mateResult = this.checkForMate();
        if (mateResult == "white") {
            return -Infinity
        } else if (mateResult == "black") {
            return Infinity;
        }

        let score = 0;
        for (let piece of this.pieces) {
            if (piece instanceof Pawn) {
                score += piece.color == "white" ? 1 : -1;
            } else if (piece instanceof Rook) {
                score += piece.color == "white" ? 5 : -5;
            } else if (piece instanceof Knight) {
                score += piece.color == "white" ? 3 : -3;
            } else if (piece instanceof Bishop) {
                score += piece.color == "white" ? 3 : -3;
            } else if (piece instanceof Queen) {
                score += piece.color == "white" ? 9 : -9;
            }
        }

        if (this.blackKing.hasMoved) {
            if (this.blackKing.hasCastled) {
                score -= 2;
            } else {
                score += 2;
            }
        }

        if (this.whiteKing.hasMoved) {
            if (this.whiteKing.hasCastled) {
                score += 2;
            } else {
                score -= 2;
            }
        }

        return score;
    }

    checkForMate() {
        // Returns "white" if white is checkmated, "black" if black is checkmated, and "stalemate" if stalemate
        let isMate = true;
        if (this.turn == "white") {
            for (let piece of this.pieces) {
                if (piece.color == "white" && piece.possibleMoves.length > 0) {
                    isMate = false;
                    break;
                }
            }
            if (isMate) {
                if (this.isCheck() == "white") {
                    return "white";
                } else {
                    return "stalemate";
                }
            }
        }

        isMate = true;
        if (this.turn == "black") {
            for (let piece of this.pieces) {
                if (piece.color == "black" && piece.possibleMoves.length > 0) {
                    isMate = false;
                    break;
                }
            }
            if (isMate) {
                if (this.isCheck() == "black") {
                    print ("returning black")
                    return "black";
                } else {
                    return "stalemate";
                }
            }
        }
        return false;
    }

    computerMove() {

        shuffle(this.pieces, true);

        let bestScore = Infinity;
        let bestMove = []; // [piece, square]
        for (let piece of this.pieces) {
            if (piece.color == "black") {
                for (let square of piece.possibleMoves) {
                    let newBoard = this.getDuplicate();
                    let newSquare = newBoard.grid[square.row][square.col];
                    // These go together
                    newBoard.grid[piece.square.row][piece.square.col].piece.moveToSquare(newSquare);
                    newBoard.setPossibleMoves();
                    //
                    // Check each possible move against white's best move in that position
                    let bestResponse = newBoard.getBestMove("white");
                    bestResponse[0].moveToSquare(bestResponse[1]);
                    let score = newBoard.evaluate();
                    if (score < bestScore) {
                        bestScore = score;
                        bestMove = [piece, square];
                    }
                }
            }
        }
        bestMove[0].moveToSquare(bestMove[1]);

    }

    show() {
        for (let row of this.grid) {
            for (let square of row) {
                square.show();
            }
        }
        for (let piece of this.pieces) {
            piece.show();
        }
    }
}