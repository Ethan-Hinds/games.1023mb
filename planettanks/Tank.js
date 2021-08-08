class Tank {
    constructor(planet, angle, img) {
        this.planet = planet;
        this.angle = angle;
        this.img = img;

        let x = this.planet.position.x + (this.planet.radius + 15)*cos(this.angle);
        let y = this.planet.position.y + (this.planet.radius + 15)*sin(this.angle);
        this.position = createVector(x, y);
        this.size = {width: 30, height: 30};
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle + PI/2);
        image(this.img, 0, 0, this.size.width, this.size.height);
        pop();
    }
}