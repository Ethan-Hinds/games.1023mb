class Square {
    constructor(row, col, board) {
        this.row = row;
        this.col = col;
        this.board = board;
        this.fillColor = this.row%2 == this.col%2 ? "tan" : "#654321";
        this.x = this.col*board.squareSize;
        this.y = this.row*board.squareSize;
        this.piece;
    }

    show() {
        fill(this.fillColor);
        rect(this.x, this.y, this.board.squareSize, this.board.squareSize);
    }

    highlight() {
        this.fillColor = "yellow";
    }

    unhighlight() {
        this.fillColor = this.row%2 == this.col%2 ? "tan" : "#654321";
    }

    isInBounds(x, y) {
        return x > this.x && x < this.x + this.board.squareSize && y > this.y && y < this.y + this.board.squareSize;
    }
}