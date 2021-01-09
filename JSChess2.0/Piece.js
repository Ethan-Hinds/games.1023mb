class Piece {
    constructor(color, square, hasMoved, board) {
        this.color = color;
        this.square = square;
        this.hasMoved = hasMoved;
        this.board = board;
        this.x = this.square.x;
        this.y = this.square.y;
        this.possibleMoves = [];

    }

    removePossibleMovesForCheck() {
        for (let i = this.possibleMoves.length - 1; i >= 0; i -= 1) {
            let square = this.possibleMoves[i];
            let newBoard = this.board.getDuplicate();
            let newSquare = newBoard.grid[square.row][square.col];
            // These go together
            newBoard.grid[this.square.row][this.square.col].piece.moveToSquare(newSquare);
            if (newBoard.parent.isOriginal) {
                newBoard.setPossibleMoves();
            }
            //
            let result = newBoard.isCheck();
            if (result && result == this.color) {
                this.possibleMoves.splice(this.possibleMoves.indexOf(square), 1);
            }
        }
    }
    
    show() {
        image(this.image, this.x, this.y, this.board.squareSize, this.board.squareSize);
    }

    setSquare(square) {
        this.square.piece = this;
    }

    moveToSquare(square) {
        this.hasMoved = true;
        this.square.piece = undefined;
        this.square = square;
        this.board.unselect(this);
        this.board.turn = this.board.turn == "white" ? "black" : "white";
        if (this.board.isOriginal) {
            this.board.animatingPiece = [this, this.x, this.y];
        } else {
            if (this.square.piece) {
                this.board.pieces.splice(this.board.pieces.indexOf(this.square.piece), 1);
            }
            this.square.piece = this;
        }
    }

    finishMoving() {
        this.x = this.square.x;
        this.y = this.square.y;
        board.animatingPiece = undefined;
        if (this.square.piece) {
            this.board.pieces.splice(this.board.pieces.indexOf(this.square.piece), 1);
        }
        this.square.piece = this;
        if (this instanceof Pawn && (this.square.row == 0 || this.square.row == 7)) {
            let newQueen = new Queen(this.color, this.square, true, this.board);
            this.square.piece = newQueen;
            this.board.pieces.splice(this.board.pieces.indexOf(this), 1);
            this.board.pieces.push(newQueen);
        }
        board.setPossibleMoves();
        let mateResult = this.board.checkForMate();
        if (mateResult == "white") {
            alert ("Black wins!");
            return;
        } else if (mateResult == "black") {
            alert ("White wins!");
            return;
        } else if (mateResult == "stalemate") {
            alert ("Stalemate!");
            return;
        }
        if (!this.board.isCastling && this.board.turn == "black") {
            this.board.computerMove();
        }
        if (this.board.isCastling) {
            this.board.isCastling = false;
            this.board.grid[7][7].piece.moveToSquare(this.board.grid[7][5]);
            this.board.turn = this.board.turn == "white" ? "black" : "white";
        }
    }

    updateXY(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}