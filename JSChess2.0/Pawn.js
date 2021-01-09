class Pawn extends Piece {
    constructor(color, square, hasMoved, board) {
        super(color, square, hasMoved, board);

        this.image = pieceImages[`${this.color}Pawn`];
    }

    getDuplicate(square) {
        let newPiece = new Pawn(this.color, square, this.hasMoved, square.board);
        return newPiece;
    }

    setPossibleMoves() {

        this.possibleMoves = [];

        let square;

        if (this.color == "white") {
            if (this.square.row > 0) {
                square = this.board.grid[this.square.row - 1][this.square.col];
                if (!square.piece) {
                    this.possibleMoves.push(square);
                    if (this.square.row == 6) {
                        square = this.board.grid[this.square.row - 2][this.square.col];
                        if (!square.piece) {
                            this.possibleMoves.push(square);
                        }
                    }
                }
            }

            if (this.square.col > 0) {
                if (this.square.row > 0) {
                    square = this.board.grid[this.square.row - 1][this.square.col - 1];
                    if (square.piece && square.piece.color == "black") {
                        this.possibleMoves.push(square);
                    }
                }
            }

            if (this.square.col < 7) {
                if (this.square.row > 0) {
                    square = this.board.grid[this.square.row - 1][this.square.col + 1];
                    if (square.piece && square.piece.color == "black") {
                        this.possibleMoves.push(square);
                    }
                }
            }
        }

        else if (this.color == "black") {   
            if (this.square.row < 7) {
                square = this.board.grid[this.square.row + 1][this.square.col];
                if (!square.piece) {
                    this.possibleMoves.push(square);
                    if (this.square.row == 1) {
                        square = this.board.grid[this.square.row + 2][this.square.col];
                        if (!square.piece) {
                            this.possibleMoves.push(square);
                        }
                    }
                }
            }

            if (this.square.col > 0) {
                if (this.square.row < 7) {
                    square = this.board.grid[this.square.row + 1][this.square.col - 1];
                    if (square.piece && square.piece.color == "white") {
                        this.possibleMoves.push(square);
                    }
                }
            }

            if (this.square.col < 7) {
                if (this.square.row < 7) {
                    square = this.board.grid[this.square.row + 1][this.square.col + 1];
                    if (square.piece && square.piece.color == "white") {
                        this.possibleMoves.push(square);
                    }
                }
            }
        }
        this.removePossibleMovesForCheck();
    }
}