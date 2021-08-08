class SingleShot extends Weapon {
	constructor(tank) {
		super(tank);
		this.name = "Single Shot";
		this.explosionRadius = 20;
		this.maxDamage = 30;
	}
}
