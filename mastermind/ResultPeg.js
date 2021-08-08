function ResultPeg(row, index) {
    this.row = row;
    this.index = index;

    this.x = this.row.x + this.row.width + 40 + 20*this.index;
    this.y = this.row.y + this.row.height/2;

    this.color;
    
    this.show = function() {
        if (this.color) {
            fill(this.color);
            ellipse(this.x, this.y, 10, 10);
        } else {
            noFill();
            stroke("white");
            ellipse(this.x, this.y, 10, 10);
            stroke("black");
        }
    }

}