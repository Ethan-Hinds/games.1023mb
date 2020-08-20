var cWidth = 1000;
var cHeight = 600;

var particles = [];
var tankSettings = {
	width: 30,
	height: 15,
	speed: 2,
};

var worldSettings = {
	particleSize: 8,
	terrainHarshness: 0.03,
	maxGroundHeight: cHeight * 0.3,
	gravity: 0.15,
	powerDamping: 0.15,
};

var player1;
var player2;
var turn;

function setup() {
	angleMode(DEGREES);
	textAlign(CENTER, BOTTOM);
	createCanvas(cWidth, cHeight);
	generateTerrain(worldSettings.terrainHarshness, worldSettings.maxGroundHeight, worldSettings.particleSize);
	createPlayers();
	turn = player1;
	givePlayersWeapons();
	player1.showMenu();
}

function draw() {
	background(0, 0, 255);
	for (let particle of particles) {
		particle.show();
	}
	player1.show();
	player1.move();
	player2.show();
	player2.move();
}

function generateTerrain(inc, maxGroundHeight, particleSize) {
	xoff = 0;
	for (let x = 0; x < cWidth; x += particleSize) {
		let y = map(noise(xoff), 0, 1, maxGroundHeight, height);
		let px = floor(x);
		let py = floor(y);
		particles.push(new Particle(px, py, particleSize));
		do {
			py += particleSize;
			particles.push(new Particle(px, py, particleSize));
		} while (py < height);
		xoff += inc;
	}
}

function createPlayers() {
	player1 = new Player({red: 255, green: 0, blue: 0, alpha: 255}, "Player 1");
	player1.x = random(50, width * 0.3);
	player1.y = player1.getHighestParticle().y - player1.height;

	player2 = new Player({red: 255, green: 165, blue: 0, alpha: 255}, "Player 2");
	player2.x = random(width * 0.7, width - 50);
	player2.y = player2.getHighestParticle().y - player2.height;
}

function updateMenu() {
	let angle = turn.menu.angleSlider.val();
	let power = turn.menu.powerSlider.val();
	turn.menu.angleLabel.text(`Angle: ${angle}`);
	turn.menu.powerLabel.text(`Power: ${power}`);
	turn.angle = angle;
	turn.power = power;
}

function updateWeaponSelect() {
	turn.menu.weaponSelect.empty();
	for (let key in turn.weapons) {
		if (turn.weapons[key] > 0) {
			turn.menu.weaponSelect.append(`<option>${key}: ${turn.weapons[key]}</option>`);
		}
	}
}

function fireButtonPressed() {
	if (turn.menu.weaponSelect.val()) {
		let info = turn.menu.weaponSelect.val().split(":");
		if (info[1] > 0) {
			turn.weapons[info[0]] -= 1;
			switch (info[0]) {
				case "Single Shot":
					turn.fire(new SingleShot(turn));
					break;
				case "Double Shot":
					turn.fire(new DoubleShot(turn));
					break;
				case "Big Shot":
					turn.fire(new BigShot(turn));
					break;
			}
			updateWeaponSelect();
			turn.hideMenu();
			if (turn === player1) {
				turn = player2;
			} else {
				turn = player1;
			}
			turn.showMenu();
		}
	}
}

function givePlayersWeapons() {
	[player1, player2].forEach((player) => {
		//let weapons = [new SingleShot(player), new DoubleShot(player), new BigShot(player)];
		let weapons = {
			"Single Shot": 2,
			"Double Shot": 2,
			"Big Shot": 4,
		};
		player.weapons = weapons;
	});
	updateMenu();
}

function getOccurrence(array, value) {
	return array.filter((v) => v === value).length;
}
