function SceneButton(x, y, width, height, _image, sceneTo) {
    this.x = x;
    this.y = y;
    this.image = _image;
    this.width = width;
    this.height = height;
    this.sceneTo = sceneTo;
    this.isHighlighted;
    this.alpha = 255;

    this.show = function() {
        if (this.isHighlighted) {
            tint(255, 255, 255, this.alpha);
        } else {
            tint(220, 220, 220, this.alpha);
        }
        image(this.image, this.x, this.y, this.width, this.height);
        noTint();
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