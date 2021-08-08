class Planet {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
        this.mass = this.radius**3;
    }

    show() {
        fill("green");
        ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
    }
}