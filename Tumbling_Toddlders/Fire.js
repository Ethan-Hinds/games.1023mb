function Fire(window) {
    this.window = window;

    this.x = this.window.x + this.window.width/2;
    this.y;
    this.width = 0;
    this.height = 0;

    this.imageIndex = floor(random(fireImages.length));
    this.image = fireImages[this.imageIndex];

    this.show = function() {
        image(this.image, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        
        if (this.width < this.window.width && this.height < this.window.height) {
            this.width += this.image.width*0.0005;
            this.height += this.image.height*0.0005;
        }
        this.y = this.window.y + this.window.height - this.height/2;

        if (frameCount % 4 == 0) {
            this.image = fireImages[this.imageIndex];
            this.imageIndex = (this.imageIndex + 1) % fireImages.length;
        }
    }

}