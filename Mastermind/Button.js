function Button(x, y, width, height, board) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;

    this.show = function() {
        fill("gray");
        rect(this.x, this.y, this.width, this.height);
        textAlign(CENTER, CENTER)
        fill("red");
        textSize(25);
        noStroke();
        text("Submit", this.x + this.width/2, this.y + this.height/2);
    }
}