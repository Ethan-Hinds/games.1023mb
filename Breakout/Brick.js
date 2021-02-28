class Brick {
    constructor(x, y, width, height, fallSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fallSpeed = fallSpeed;
    }

    show() {
        fill("red");
        rect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.y += this.fallSpeed;
    }
}