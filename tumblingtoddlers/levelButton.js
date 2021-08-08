function LevelButton(x, y, width, height, level, scene) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.scene = scene;

    this.width = width;
    this.height = height;

    this.show = function() {
        if (this.scene.selected === this) {
            fill("red");
        } else {
            noStroke();
            fill(64, 128, 128);
        }
        rect(this.x, this.y, this.width, this.height);
        textAlign(CENTER, CENTER);
        textSize("16");
        fill("white");
        text(this.level.n, this.x + this.width/2, this.y + this.height/2);
    }

    this.inBounds = function(x, y) {
        if (this.x < x && this.x + this.width > x) {
            if (this.y < y && this.y + this.height > y) {
                return true;
            }
        }
        return false;
    }
}