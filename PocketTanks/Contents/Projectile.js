function Projectile(type, x, y, dx, dy) {
	this.type = type;
	this.r = 5;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.ax = 0;
	this.ay = gravity;

	this.blastRadius;
	this.maxDamage;

	this.fireEvent = function() {

		let angle = parseInt($("#angleSlider").val());
		let power = parseInt($("#powerSlider").val());

		switch (this.type) {
			case "Single Shot":
				this.blastRadius = 30;
				this.maxDamage = 30;
				break;
			case "Double Shot":
				this.blastRadius = 30;
				this.maxDamage = 30;
				projectiles.push(new Projectile("Single Shot", this.x, this.y, power * cos(angle - 5) * powerDampening, -power * sin(angle - 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				projectiles.push(new Projectile("Single Shot", this.x, this.y, power * cos(angle + 5) * powerDampening, -power * sin(angle + 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				projectiles.splice(projectiles.indexOf(this), 1);
				break;
			case "Triple Shot":
				this.blastRadius = 30;
				this.maxDamage = 30;
				projectiles.push(new Projectile("Single Shot", this.x, this.y, power * cos(angle - 5) * powerDampening, -power * sin(angle - 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				projectiles.push(new Projectile("Single Shot", this.x, this.y, power * cos(angle + 5) * powerDampening, -power * sin(angle + 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				break;
			case "Big Shot":
				this.blastRadius = 70;
				this.maxDamage = 30;
				break;
			case "Double Big Shot":
				this.blastRadius = 70;
				this.maxDamage = 30;
				projectiles.push(new Projectile("Big Shot", this.x, this.y, power * cos(angle - 5) * powerDampening, -power * sin(angle - 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				projectiles.push(new Projectile("Big Shot", this.x, this.y, power * cos(angle + 5) * powerDampening, -power * sin(angle + 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				projectiles.splice(projectiles.indexOf(this), 1);
				break;
			case "Triple Big Shot":
				this.blastRadius = 70;
				this.maxDamage = 30;
				projectiles.push(new Projectile("Big Shot", this.x, this.y, power * cos(angle - 5) * powerDampening, -power * sin(angle - 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				projectiles.push(new Projectile("Big Shot", this.x, this.y, power * cos(angle + 5) * powerDampening, -power * sin(angle + 5) * powerDampening));
				projectiles[projectiles.length - 1].fireEvent();
				break;
		}
	}

	this.show = function() {
		fill(255);
		circle(this.x, this.y, this.r);
	}

	this.update = function() {
		this.dx += this.ax;
		this.dy += this.ay;
		this.x += this.dx;
		this.y += this.dy;
	}

	this.checkForCollisionOrBounds = function() {
		let hitTank = false;
		for (let i = particles.length - 1; i >= 0; i -= 1) {
			if (dist(this.x, this.y, particles[i].x, particles[i].y) <= this.r + particleSize/2) {
				this.collision();
				break;
			} else if (this.x < 0 || this.x > width) {
				projectiles.splice(projectiles.indexOf(this), 1);
				break;
			} else if (this.y >= height) {
				this.collision();
				break;
			} else {
				// Check for player collisions
				for (p of players) {
					if (this.x >= p.x && this.x <= p.x + p.width && this.y >= p.y && this.y <= p.y + p.height) {
						this.x = p.x;
						this.y = p.y;
						this.collision();
						hitTank = true;
						break;
					}
				}
				if (hitTank) {
					break;
				}
			}
		}
	}

	this.collision = function() {
		for (let i = particles.length - 1; i >= 0; i -= 1) {
			if (dist(this.x, this.y, particles[i].x, particles[i].y) <= this.blastRadius) {
				particles[i].explode();
			}
		}
		for (player of players) {
			let d = dist(this.x, this.y, player.x, player.y);
			if (d <= this.blastRadius) {
				player.takeDamage(d, this.blastRadius, this.maxDamage, this.type);
			}
		}
		projectiles.splice(projectiles.indexOf(this), 1);
	}

}
