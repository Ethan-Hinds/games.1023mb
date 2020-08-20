class Player {
	constructor(color, name) {
		this.color = color;
		this.name = name;

		this.x;
		this.y;
		this.angle = 45;
		this.power = 50;

		this.activeWeapons = [];

		this.width = tankSettings.width;
		this.height = tankSettings.height;
		this.speed = tankSettings.speed;

		this.health = 100;

		this.menuDiv = $("<div> </div>");
		$("body").append(this.menuDiv);
		this.menuDiv.height("0");

		this.menu = {
			playerIndicator: $(
				`<p style = 'color: rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})'>${this.name}</p><br><br>`
			),
			weaponLabel: $("<label>Weapon: </label>"),
			weaponSelect: $("<select> </select>"),
			angleLabel: $("<br><br><label>Angle: 45</label>"),
			angleSlider: $("<input type = 'range' min = '0' max = '360' value = '45'> </input>"),
			powerLabel: $("<br><br><label>Power: 50</label>"),
			powerSlider: $("<input type = 'range' min = '0' max = '100' value = '50'> </input>"),
			fireButton: $("<button onclick = 'fireButtonPressed()'> Fire </button>"),
		};

		for (let key in this.menu) {
			this.menuDiv.append(this.menu[key]);
			if (key != "weaponSelect") {
				this.menu[key].on("input", updateMenu);
			}
			this.menu[key].css("visibility", "hidden");
		}
	}

	show() {
		this.color.alpha = turn === this ? 255 : 150;
		fill(this.color.red, this.color.green, this.color.blue, this.color.alpha);
		rect(this.x, this.y, this.width, this.height);
		push();
		translate(this.x + this.width / 2, this.y);
		rotate(-this.angle);
		rect(0, 0, 20, 3);
		pop();
		for (let weapon of this.activeWeapons) {
			weapon.show();
			weapon.move();
			weapon.checkCollision();
		}
		fill("white");
		//text(this.health, this.x + this.width / 2, this.y - 10);
	}

	move() {
		if (this.getHighestParticle().y > this.y + this.height) {
			this.y += 1;
		}
	}

	fire(weapon) {
		weapon.fire();
	}

	takeDamage(damage) {
		this.health = max(0, this.health - damage);
	}

	getHighestParticle() {
		let minY = height;
		let highestParticle;
		for (let particle of particles) {
			if (particle.x > this.x && particle.x < this.x + this.width && particle.y < minY) {
				highestParticle = particle;
				minY = particle.y;
			}
		}
		return highestParticle;
	}

	showMenu() {
		for (let key in this.menu) {
			this.menu[key].css("visibility", "visible");
		}
		updateWeaponSelect();
	}

	hideMenu() {
		for (let key in this.menu) {
			this.menu[key].css("visibility", "hidden");
		}
	}
}
