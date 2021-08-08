function Player(x, y, rot) {
    this.x = x;
    this.y = y;
    this.rot = rot;

    this.dx = 0;
    this.dy = 0;

    this.accel = 2;
    this.turnSpeed = 0.075;
    this.accel = 0.075;
    this.damping = 0.99;

    this.accelerating = false;

    this.show = function() {
        noFill();
        stroke("white");
        strokeWeight(2);
        push();
        translate(this.x - this.dx, this.y - this.dy);
        rotate(this.rot);
        line(-7, 10, 0, -15);
        line(0, -15, 7, 10);
        line(7, 10, -7, 10);
        if (this.accelerating) {
            line(0, 10, 0, 17);
            line(-5, 10, -5, 17);
            line(5, 10, 5, 17);
        }
        pop()
    }

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy;

        let netForce = this.getNetForce();
        this.dx *= this.damping;
        this.dy *= this.damping;

        this.dx += netForce[0] * gravityDamping;
        this.dy += netForce[1] * gravityDamping;

        if (this.x < -15) {
            this.x = cWidth + 15;
        } else if (this.x > cWidth + 15) {
            this.x = -15;
        }

        if (this.y < -15) {
            this.y = cHeight + 15;
        } else if (this.y > cHeight + 15) {
            this.y = -15;
        }
        
    }

	this.getNetForce = function() {

		var netX = 0;
		var netY = 0;

		for (var i = 0; i < rocks.length; i += 1) {
			let rock = rocks[i];

            let radius = this.getDistanceFromRock(rock, this.x, this.y);
            
            if (radius < rock.r/2 + 8) {
                noLoop();
                textAlign(CENTER);
                textSize(32);
                fill(255)
                text("YOU LOSE!\nPress Enter to play again!", cWidth/2, cHeight/2);
            }

            let magnitude = rock.mass / (radius ** 2);
            if (magnitude) {
                let yDistance = rock.y - this.y;
                let xDistance = rock.x - this.x;
                let angle = Math.atan(Math.abs(yDistance / xDistance));
                let xComponent = magnitude * Math.cos(angle);
                let yComponent = magnitude * Math.sin(angle);


                if (rock.x < this.x) {
                    xComponent *= -1;
                }
                if (rock.y < this.y) {
                    yComponent *= -1;
                }

                netX += xComponent;
                netY += yComponent;
            }
		}

		return [netX, netY];
    }
    
    this.getDistanceFromRock = function(rock) {
        let xDistance = this.x - rock.x;
        let yDistance = this.y - rock.y;
        return Math.sqrt(xDistance ** 2 + yDistance ** 2);
    }




}