class Knight extends Piece {
    constructor(color, square, hasMoved, board) {
        super(color, square, hasMoved, board);

        this.image = pieceImages[`${this.color}Knight`];
    }

    getDuplicate(square) {
        let newPiece = new Knight(this.color, square, this.hasMoved, square.board);
        return newPiece;
    }

    setPossibleMoves() {

        this.possibleMoves = [];

        let dr = [-2, -1, 1, 2, 2, 1, -1, -2];
        let dc = [1, 2, 2, 1, -1, -2, -2, -1];

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
        this.removePossibleMovesForCheck();
    }
}