function Rock(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;

    this.mass = 2.5 * (this.r ** 2);

    this.onScreen = false;

    this.show = function() {
        noFill();
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < -this.r) {
            this.x = cWidth + this.r;
        } else if (this.x > cWidth + this.r) {
            this.x = -this.r;
        }

        if (this.y < -this.r) {
            this.y = cHeight + this.r;
        } else if (this.y > cHeight + this.r) {
            this.y = -this.r;
        }
    }

    this.split = function() {
        let slope = this.dy/this.dx;
        let dx1 = dy;
        let dx2 = -dy;
        let dy1 = dx;
        let dy2 = -dx;
        rocks.push(new Rock(this.x, this.y, dx1 * random(0.75, 1.1), dy1 * random(0.8, 1.3), this.r/2));
        rocks.push(new Rock(this.x, this.y * random(0.75, 1.1), dx2 * random(0.8, 1.3), dy2, this.r/2));
    }
}