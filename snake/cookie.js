function Cookie(row, col) {
    this.row = row;
    this.col = col;

    this.show = function() {
        fill("red");
        rectMode(CENTER)
        rect(this.col * squareSize + squareSize/2, this.row * squareSize + squareSize/2, squareSize - 2, squareSize - 2);
    }
    
}