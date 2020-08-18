function Particle(x, y, particleSize) {
	this.x = x;
	this.y = y;
	this.size = particleSize + 1;
	this.color = [0, 255, 0];
	this.exploding = false;
	this.alpha =  300;

	this.show = function() {
		noStroke();
		fill(this.color[0], this.color[1], this.color[2], this.alpha);
		rect(this.x, this.y, this.size, this.size);
	}

	this.explode = function() {
		if (this.exploding == false) {
			this.exploding = true;
			explodingParticles.push(this);
			particles.splice(particles.indexOf(this), 1);
		}
		this.alpha -= 10;
		this.color = [255, 255, 255, this.alpha];
		if (this.alpha == 0) {
			explodingParticles.splice(explodingParticles.indexOf(this), 1);
		}
	}
}
