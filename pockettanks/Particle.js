class Particle {
	constructor(x, y, particleSize) {
		this.x = x;
		this.y = y;
		this.size = particleSize;
		this.color = {red: 0, green: 255, blue: 0, alpha: 255};

		this.isExploding = false;
	}

	show() {
		noStroke();
		fill(this.color.red, this.color.green, this.color.blue, this.color.alpha);
		rect(this.x, this.y, this.size, this.size);

		if (this.isExploding) {
			this.color.red = 255;
			this.color.green = 255;
			this.color.blue = 255;
			this.color.alpha -= 10;
		}
		if (this.color.alpha <= 0) {
			particles.splice(particles.indexOf(this), 1);
		}
	}
}
