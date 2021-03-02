class Brick {
    constructor(x, y, width, height, fallSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fallSpeed = fallSpeed;
        this.fillColor = "red";
    }

    show() {
        fill(this.fillColor);
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.fallSpeed;

        if (this.y > paddle.y) {
            bricks.splice(bricks.indexOf(this), 1)
        }
    }
}
