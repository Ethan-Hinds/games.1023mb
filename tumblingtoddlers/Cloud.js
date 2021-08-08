function Cloud(x, scale) {
    this.image = cloudImages[0];
    this.x = x;
    this.scale = scale;
    this.width =this.image.width * this.scale;
    this.height = this.width * this.image.height / this.image.width;
    this.y = cHeight + this.height;
    this.dy = -50*this.scale**1.75;

    this.show = function() {
        image(this.image, this.x, this.y, this.width, this.height)
    }

    this.move = function() {
        this.y += this.dy;
    }

    this.isAboveScreen = function() {
        return this.y + this.height < 0;
    }
}