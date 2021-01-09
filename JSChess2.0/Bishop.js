class Bishop extends Piece {
    constructor(color, square, hasMoved, board) {
        super(color, square, hasMoved, board);

        this.image = pieceImages[`${this.color}Bishop`];
    }

    getDuplicate(square) {
        let newPiece = new Bishop(this.color, square, this.hasMoved, square.board);
        return newPiece;
    }

    setPossibleMoves() {

        this.possibleMoves = [];

        let row;
        let col;
        let stopDirection;

        row = this.square.row;
        col = this.square.col;

        stopDirection = false;
        while (!stopDirection && row >= 0 && col >= 0) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                row -= 1;
                col -= 1;
            } else {
                if (square.piece.color != this.color) {
                    this.possibleMoves.push(square);
                }
                stopDirection = true;
            }
        }

        row = this.square.row;
        col = this.square.col;

        stopDirection = false;
        while (!stopDirection && row <= 7 && col <= 7) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                row += 1;
                col += 1;
            } else {
                if (square.piece.color != this.color) {
                    this.possibleMoves.push(square);
                }
                stopDirection = true;
            }
        }

        row = this.square.row;
        col = this.square.col;

        stopDirection = false;
        while (!stopDirection && row <= 7 && col >= 0) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                row += 1;
                col -= 1;
            } else {
                if (square.piece.color != this.color) {
                    this.possibleMoves.push(square);
                }
                stopDirection = true;
            }
        }

        row = this.square.row;
        col = this.square.col;

        stopDirection = false;
        while (!stopDirection && row >= 0 && col <= 7) {
            let square = this.board.grid[row][col];
            if (!square.piece || square.piece === this) {
                this.possibleMoves.push(square);
                row -= 1;
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