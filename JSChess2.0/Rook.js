class Rook extends Piece {
    constructor(color, square, hasMoved, board) {
        super(color, square, hasMoved, board);

        this.image = pieceImages[`${this.color}Rook`];
    }

    getDuplicate(square) {
        let newPiece = new Rook(this.color, square, this.hasMoved, square.board);
        return newPiece;
    }

    setPossibleMoves() {
        // Sets this.possibleMoves to a list of squares

        this.possibleMoves = [];

        let row;
        let col;
        let stopDirection;

        row = this.square.row;
        col = this.square.col;

        stopDirection = false;
        while (!stopDirection && row >= 0) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                row -= 1;
            } else {
                if (square.piece.color != this.color) {
                    this.possibleMoves.push(square);
                }
                stopDirection = true;
            }
        }

        row = this.square.row;

        stopDirection = false;
        while (!stopDirection && row <= 7) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                row += 1;
            } else {
                if (square.piece.color != this.color) {
                    this.possibleMoves.push(square);
                }
                stopDirection = true;
            }
        }

        row = this.square.row;

        stopDirection = false;
        while (!stopDirection && col >= 0) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                col -= 1;
            } else {
                if (square.piece.color != this.color) {
                    this.possibleMoves.push(square);
                }
                stopDirection = true;
            }
        }

        col = this.square.col;

        stopDirection = false;
        while (!stopDirection && col <= 7) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                col += 1;
            } else {
                if (square.piece.color != this.color) {
                    this.possibleMoves.push(square);
                }
                stopDirection = true;
            }
        }

        while (this.possibleMoves.indexOf(this.square) >= 0) {
            this.possibleMoves.splice(this.possibleMoves.indexOf(this.square), 1);
        }
        this.removePossibleMovesForCheck();
    }
}