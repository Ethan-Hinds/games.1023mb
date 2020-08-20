class DoubleShot extends Weapon {
	constructor(tank) {
		super(tank);
		this.name = "Double Shot";
		this.explosionRadius = 20;
	}

	fire() {
		let shot1 = new SingleShot(this.tank);
		let shot2 = new SingleShot(this.tank);
		shot1.angle -= 5;
		shot2.angle += 5;
		shot1.fire();
		shot2.fire();
	}
}
