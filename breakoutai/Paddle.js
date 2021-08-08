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

    move(dir) {
        if (dir == "left") {
            this.x -= this.speed;
        } else if (dir == "right") {
            this.x += this.speed;
        }

        // if (this.x < 0) {
        //     this.x = 0;
        // } else if (this.x + this.width > cWidth) {
        //     this.x = cWidth - this.width;
        // }

    }
}