function Helicopter(x, y, dx, dy, width, height, isReversed, dropFrequency, _scene) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.isReversed = isReversed;
    this.dropFrequency = dropFrequency;
    this.scene = _scene;
    this.imageIndex = 0;
    this.image = helicopterImages[this.imageIndex];
    this.column = new Column(this.x, cWidth/this.scene.numberOfColumns);
    this.column.windows.push(new Window(this.column, this.y + 60));

    this.show = function() {
        if (frameCount % 2 == 0) {
            this.image = helicopterImages[this.imageIndex];
            this.imageIndex = (this.imageIndex + 1) % helicopterImages.length;
        }
        if (this.isReversed) {
            push();
            translate(this.x, this.y);
            scale(-1, 1);
            image(this.image, 0, 0, this.width, this.height);
            pop();
        } else {
            image(this.image, this.x, this.y, this.width, this.height);
        }
    }
    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.column.x = this.x;
        if (this.isReversed) {
            this.column.windows[0].x = this.column.x - this.column.width;
        } else {
            this.column.windows[0].x = this.column.x + 2*this.column.width/3;
        }
    }

    this.isOutOfBounds = function() {
        return this.x < -this.width || this.x > cWidth + this.width || this.y < -this.height || this.y > cHeight;
    }

    this.drop = function() {
        let baby = new Baby(this.column.windows[0], this.scene.babyWidth, this.dx*0.75, 0, 0.05, false, false, this.scene);
        this.scene.babies.push(baby);
    }

    this.createBaby = function(window, dx, dy, angularVelocity, isLady) {

    }
}