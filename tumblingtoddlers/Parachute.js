function Parachute(baby) {
    this.baby = baby;

    this.width = this.baby.width;
    this.height = this.width * 1;
    this.image = ParachuteImages[0];

    this.show = function() {
        this.x = this.baby.x + this.baby.width * sin(this.baby.rotation);
        this.y = this.baby.y - this.baby.height * cos(this.baby.rotation);
        this.rotation = this.baby.rotation;

        push();
        translate(this.x + this.width/2, this.y + this.height/2);
        rotate(this.rotation);
        image(this.image, -this.width/2, -this.height/2, this.width, this.height);
        pop();
    }

}