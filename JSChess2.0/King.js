class King extends Piece {
    constructor(color, square, hasMoved, hasCastled, board) {
        super(color, square, hasMoved, board);

        this.image = pieceImages[`${this.color}King`];

        this.queenCastleSquare = undefined;
        this.kingCastleSquare = undefined;

        this.hasCastled = hasCastled;
    }

    getDuplicate(square) {
        let newPiece = new King(this.color, square, this.hasMoved, this.hasCastled, square.board);
        return newPiece;
    }

    setPossibleMoves() {

        this.queenCastleSquare = undefined;
        this.kingCastleSquare = undefined;

        this.possibleMoves = [];

        let dr = [-1, -1, -1, 0, 1, 1, 1, 0];
        let dc = [-1, 0, 1, 1, 1, 0, -1, -1];

        for (let i = 0; i < dr.length; i += 1) {
            let row = this.square.row + dr[i];
            let col = this.square.col + dc[i];

            if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
                let square = this.board.grid[row][col];
                if (square.piece && square.piece.color == this.color) {
                    continue;
                }
                this.possibleMoves.push(this.board.grid[row][col]);
            }
        }

        // Castling logic
        if (!this.hasMoved) {
            if (this.color == "white") {
                let queenRookSquare = this.board.grid[7][0];
                let queenRook = queenRookSquare.piece;
                if (queenRook && queenRook instanceof Rook && queenRook.color == "white" && !queenRook.hasMoved) {
                    let square1 = this.board.grid[7][2];
                    let square2 = this.board.grid[7][3];

                    if (!square1.piece && !square2.piece) {
                        if (!this.board.isAttacked(square1, "black") && !this.board.isAttacked(square2, "black")) {
                            if (!(this.board.isCheck() == "white")) {
                                this.queenCastleSquare = square1;
                                this.possibleMoves.push(square1);
                            }
                        }
                    }
                }

                let kingRookSquare = this.board.grid[7][7];
                let kingRook = kingRookSquare.piece;
                if (kingRook && kingRook instanceof Rook && kingRook.color == "white" && !kingRook.hasMoved) {
                    let square1 = this.board.grid[7][6];
                    let square2 = this.board.grid[7][5];

                    if (!square1.piece && !square2.piece) {
                        if (!this.board.isAttacked(square1, "black") && !this.board.isAttacked(square2, "black")) {
                            if (!(this.board.isCheck() == "white")) {
                                this.kingCastleSquare = square1;
                                this.possibleMoves.push(square1);
                            }
                        }
                    }
                }
            } else {
                let queenRookSquare = this.board.grid[0][0];
                let queenRook = queenRookSquare.piece;
                if (queenRook && queenRook instanceof Rook && queenRook.color == "black" && !queenRook.hasMoved) {
                    let square1 = this.board.grid[0][2];
                    let square2 = this.board.grid[0][3];

                    if (!square1.piece && !square2.piece) {
                        if (!this.board.isAttacked(square1, "white") && !this.board.isAttacked(square2, "white")) {
                            if (!(this.board.isCheck() == "black")) {
                                this.queenCastleSquare = square1;
                                this.possibleMoves.push(square1);
                            }
                        }
                    }
                }

                let kingRookSquare = this.board.grid[0][7];
                let kingRook = kingRookSquare.piece;
                if (kingRook && kingRook instanceof Rook && kingRook.color == "black" && !kingRook.hasMoved) {
                    let square1 = this.board.grid[0][6];
                    let square2 = this.board.grid[0][5];

                    if (!square1.piece && !square2.piece) {
                        if (!this.board.isAttacked(square1, "white") && !this.board.isAttacked(square2, "white")) {
                            if (!(this.board.isCheck() == "black")) {
                                this.kingCastleSquare = square1;
                                this.possibleMoves.push(square1);
                            }
                        }
                    }
                }
            }
        }
        this.removePossibleMovesForCheck();
    }
}