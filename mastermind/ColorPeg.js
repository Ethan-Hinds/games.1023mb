function ColorPeg(row, index) {
    this.row = row;
    this.index = index;
    this.color;

    this.x = this.row.x + this.row.board.colWidth * this.index + this.row.board.colWidth/2;
    this.y = this.row.y + this.row.height/2;

    this.wasCompared = false;

    this.show = function() {
        if (this.color) {
            fill(this.color);
            ellipse(this.x, this.y, 20, 20);
        } else if (this.row.index == -1) {
            noFill();
            ellipse(this.x, this.y, 20, 20);
        }
    }
}