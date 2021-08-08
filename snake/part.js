function Part(row, col) {
    this.row = row;
    this.col = col;

    this.show = function() {
        if (parts.indexOf(this) == 0) {
            fill("green");
        } else {
            fill("yellow")
        };
        rectMode(CENTER)
        rect(this.col * squareSize + squareSize/2, this.row * squareSize + squareSize/2, squareSize - 2, squareSize - 2);
    }
}