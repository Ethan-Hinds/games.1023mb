class Bullet {
    constructor(tank, velocity) {
        this.tank = tank;
        this.position = this.tank.position.copy();
        this.velocity = velocity.copy();
        this.radius = 5;
    }

    move() {
        if (this.position.x < -this.radius || this.position.x > width + this.radius || this.position.y < -this.radius || this.position.y > height + this.radius) {
            print ("IN")
            this.crash();
        }

        for (let tank of tanks) {
            if (tank !== this.tank) {
                if (dist(this.position.x, this.position.y, tank.position.x, tank.position.y) < 17) {
                    this.hit();
                }
            }
        }

        this.acc = createVector(0, 0);
        for (let planet of planets) {
            if (dist(this.position.x, this.position.y, planet.position.x, planet.position.y) < planet.radius + this.radius) {
                this.crash();
            }
            let force = p5.Vector.sub(planet.position, this.position);
            let distanceSq = force.magSq();
            let G = 0.0025;
            let strength = G * planet.mass / distanceSq;
            force.setMag(strength);
            this.acc.add(force);
        }

    }

    show() {
        this.position.add(this.velocity);
        this.velocity.add(this.acc);
        fill("red");
        ellipse(this.position.x, this.position.y, 2*this.radius, 2*this.radius);
    }

    crash() {
        bullets.splice(bullets.indexOf(this), 1);
    }

    hit() {
        newMap();
    }
}