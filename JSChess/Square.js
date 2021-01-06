function Square(row,col) {
    this.row = row;
    this.col = col;
    this.color = this.row%2 == this.col%2 ? "tan" : "#654321";
    this.x = this.col * squareSize;
    this.y = this.row * squareSize;

    this.piece = null;


    this.show = function() {
        fill(this.color);
        rect(this.x, this.y, squareSize, squareSize);
    }

}