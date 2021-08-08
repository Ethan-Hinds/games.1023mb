function Column(x, width, index) {
    this.x = x;
    this.width = width;
    this.index = index;
    
    this.windows = [];

    this.show = function() {
        fill("gray");
        rect(this.x, 0, this.width - 1,  cHeight);
        fill("black");
        let startX = this.x + this.width/3;
        rect(startX, cHeight * 0.33, this.width/3, cHeight * 0.175);
        rect(startX, cHeight * 0.6, this.width/3, cHeight * 0.175);
        rect(startX, cHeight * 0.85, this.width/3, cHeight * 0.1);
        for (let window of this.windows) {
            window.show();
        }
    }
}