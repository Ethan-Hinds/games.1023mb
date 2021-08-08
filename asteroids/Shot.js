function Shot(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.r = 10;

    this.dist = 0;
    this.life = 100;

    this.show = function() {
        fill(255);
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

    this.getDistanceFromRock = function(rock) {
        let xDistance = this.x - rock.x;
        let yDistance = this.y - rock.y;
        return Math.sqrt(xDistance ** 2 + yDistance ** 2);
    }

}