class BigShot extends Weapon {
	constructor(tank) {
		super(tank);
		this.name = "Big Shot";
		this.explosionRadius = 60;
		this.maxDamage = 30;
	}
}
