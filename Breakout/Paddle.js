class Paddle {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    show() {
        fill("#00f0f0");
        rect(this.x, this.y, this.width, this.height);
    }
}