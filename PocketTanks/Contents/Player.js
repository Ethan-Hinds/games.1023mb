function Player(x, y, color, angle, power, weapons) {

	this.x = x;
	this.y = y;
	this.color = color;
	this.angle = angle;
	this.power = power;
	this.health = 100;
	this.weapons = weapons;

	this.width = tankWidth;
	this.height = tankHeight;

	this.movingLeft = -1;
	this.movingRight = -1;

	this.show = function() {
		fill(this.color);
		rect(this.x, this.y, this.width, this.height);
		push();
		translate(this.x + this.width / 2, this.y);
		rotate(-this.angle);
		rect(0, 0, 20, 3);
		pop();
		fill(255);
		textAlign(CENTER);
		text(this.health, this.x + this.height, this.y - this.width);
		//image(tankImage, this.x, this.y);
	}
	this.update = function() {
		if (turn == players.indexOf(this)) {
			this.angle = $("#angleSlider").val();
			this.power = $("#powerSlider").val();
		}

		let highestParticleBelowPlayer = getHighestParticleBelowPlayer(this);
		// If the player is on the bottom ground
		if (!highestParticleBelowPlayer) {
			particles.push(new Particle(this.x, height, particleSize));
			highestParticleBelowPlayer = particles[particles.length - 1];
		}
		if (this.y + this.height < highestParticleBelowPlayer.y) {
			this.y += 1;
			if (this.movingRight >= 0) {
				this.x += tankSpeed;
				this.movingRight += 1;
			}
			if (this.movingLeft >= 0) {
				this.x -= tankSpeed;
				this.movingLeft += 1;
			}
		// If the player is below the ground
		} else {
			// Check to see if there is air in the direction the tank is moving
			if (this.movingRight >= 0) {
				let xMin = this.x + this.width;
				let xMax = this.x + this.width + particleSize;
				let yMin = this.y - 2*this.height;
				let yMax = this.y;
				let airSpace = rangeHasAir(xMin, yMin, xMax, yMax)
				if (airSpace == false) {
					this.movingRight = -1;
				} else {
					this.x += tankSpeed;
					this.movingRight += 1;
					let groundParticle = getHighestParticleBelowPlayer(this);
					if (!groundParticle) {
						particles.push(new Particle(this.x, height, particleSize));
						highestParticleBelowPlayer = particles[particles.length - 1];
					}
					let groundY = getHighestParticleBelowPlayer(this);
					this.y = airSpace[1];
				}
			}
			if (this.movingLeft >= 0) {
				let xMin = this.x - this.width - particleSize;
				let xMax = this.x - this.width;
				let yMin = this.y - 2*this.height;
				let yMax = this.y;
				let airSpace = rangeHasAir(xMin, yMin, xMax, yMax)
				if (airSpace == false) {
					this.movingLeft = -1;
				} else {
					this.x -= tankSpeed;
					this.movingLeft += 1;
					let groundParticle = getHighestParticleBelowPlayer(this);
					if (!groundParticle) {
						particles.push(new Particle(this.x, height, particleSize));
						highestParticleBelowPlayer = particles[particles.length - 1];
					}
					let groundY = getHighestParticleBelowPlayer(this);
					this.y = airSpace[1];
				}
			}
		}
		if (this.movingRight >= 20) {
			this.movingRight = -1;
		}
		if (this.movingLeft >= 20) {
			this.movingLeft = -1;
		}
	}

	this.takeDamage = function(d, blastRadius, maxDamage, type) {
		let dmg = floor(map(blastRadius - d, 0, blastRadius, 0, 1) * maxDamage);
		this.health -= dmg;
	}

	//this.move = function(dir) {
	//	if (dir == "left") {
	//		this.x -= tankSpeed;
	//	} else {
//

//		}
//	}
}
