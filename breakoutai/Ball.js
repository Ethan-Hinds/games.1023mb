class Ball {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }

    show() {
        fill("red");
        ellipse(this.x, this.y, this.radius*2, this.radius*2);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }

    checkCollision() {
        if (this.y - this.radius <= 0 && this.dy < 0) {
            this.dy *= -1;
        } else if (this.y + this.radius >= cHeight && this.dy > 0) {
            this.dy *= -1;
            // The ball was dropped, handle it here somehow
        }
    
        if (this.x - this.radius <= 0 && this.dx < 0) {
            this.dx *= -1;
        } else if (this.x + this.radius >= cWidth && this.dx > 0) {
            this.dx *= -1;
        }
    
        let minPaddleX = paddle.x;
        let maxPaddleX = paddle.x + paddle.width;
        let minPaddleY = paddle.y;
        let maxPaddleY = paddle.y + paddle.height;
    
        if (this.x + this.radius > minPaddleX && this.x - this.radius < maxPaddleX && this.y + this.radius > minPaddleY && this.y - this.radius < maxPaddleY) {
            this.dy *= -1;
            let diff = this.x - (paddle.x + paddle.width / 2);
            let percentage = diff / paddle.width;
            this.dx = percentage * 10;
        }
    
        for (let brick of bricks) {
            var minBrickX = brick.x
            var maxBrickX = brick.x + brick.width;
            var minBrickY = brick.y;
            var maxBrickY = brick.y + brick.height;
    
            if (this.x + this.radius > minBrickX && this.x - this.radius < maxBrickX && this.y + this.radius > minBrickY && this.y - this.radius < maxBrickY) {
    
                let ballFromLeft = this.x - minBrickX;
                let ballFromRight = maxBrickX - this.x;
                let ballFromTop = this.y - minBrickY;
                let ballFromBottom = maxBrickY - this.y;
    
                let distances = [ballFromLeft, ballFromRight, ballFromTop, ballFromBottom];
    
                distances.sort(function(a, b) {
                      return a - b;
                });
    
                if (distances[0] == ballFromLeft || distances[0] == ballFromRight) {
                    this.dx *= -1;
                    bricks.splice(bricks.indexOf(brick), 1);
                } else if (distances[0] == ballFromTop || distances[0] == ballFromBottom) {
                    this.dy *= -1;
                    bricks.splice(bricks.indexOf(brick), 1);
                }
            }
        }
    }
}