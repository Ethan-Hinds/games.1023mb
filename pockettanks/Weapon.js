class Weapon {
	constructor(tank) {
		this.tank = tank;
		this.angle = parseFloat(tank.angle);
		this.radius = 5;
		this.x;
		this.y;
		this.dx;
		this.dy;
		this.ay;
	}

	fire() {
		this.x = this.tank.x + this.tank.width / 2 + 20 * cos(this.tank.angle);
		this.y = this.tank.y - 3 - 20 * sin(this.tank.angle);
		this.dx = this.tank.power * cos(this.angle) * worldSettings.powerDamping;
		this.dy = -this.tank.power * sin(this.angle) * worldSettings.powerDamping;
		this.ay = worldSettings.gravity;
		this.tank.activeWeapons.push(this);
	}

	show() {
		fill("white");
		ellipse(this.x, this.y, 2 * this.radius, 2 * this.radius);
	}

	move() {
		this.x += this.dx;
		this.y += this.dy;
		this.dy += this.ay;
	}

	checkCollision() {
		for (let i = particles.length - 1; i >= 0; i -= 1) {
			let particle = particles[i];
			if (dist(particle.x, particle.y, this.x, this.y) < this.radius) {
				this.explode();
				break;
			}
		}
		if (this.y > cHeight - this.radius) {
			this.explode();
		}
	}

	explode() {
		this.tank.activeWeapons.splice(this.tank.activeWeapons.indexOf(this), 1);
		for (let i = particles.length - 1; i >= 0; i -= 1) {
			let particle = particles[i];
			if (dist(particle.x, particle.y, this.x, this.y) < this.explosionRadius) {
				particle.isExploding = true;
			}
		}

		[player1, player2].forEach((player) => {
			let d = dist(player.x + player.width / 2, player.y + player.height, this.x, this.y);
			if (d < this.explosionRadius) {
				player.takeDamage(floor(map(d, 0, this.explosionRadius, this.maxDamage, 0)));
			}
		});
	}
}
