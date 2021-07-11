var planets = [];
var tanks = [];
var bullets = [];
var players = [];
var turn;

var images = {
}

function preload() {
    images.redTankImage = loadImage("redTank.png");
    images.blueTankImage = loadImage("blueTank.png");
}

function setup() {
    createCanvas(900, 600);
    imageMode(CENTER);
    newMap();

}

function newMap() {
    planets = [];
    tanks = [];
    bullets = [];
    players = [];

    if (players.length > 0) {
        players[1].hideMenu();
        players[1].hideMenu();
    }

    createPlanets();
    tanks.push(new Tank(random(planets), random(TWO_PI), images.redTankImage));
    let planet;
    do {
        planet = random(planets);
    } while (planet === tanks[0].planet)
    tanks.push(new Tank(planet, random(TWO_PI), images.blueTankImage));
    createPlayers();
    turn = players[0];
    players[0].showMenu();
}

function draw() {
    background(0);
    for (let planet of planets) {
        planet.show();
    }
    for (let tank of tanks) {
        tank.show();
    }

    for (let bullet of bullets) {
        bullet.move();
        bullet.show();
    }
}

function createPlayers() {
    players.push(new Player(tanks[0], "Player 1"));
    players.push(new Player(tanks[1], "Player 2"));
}

function createPlanets() {
    let numPlanets = floor(random(4, 8));
    for (let i = 0; i < numPlanets; i += 1) {
        let radius = floor(random(20, 50));
        let x;
        let y;
        let position;
        do {
            x = floor(random(radius + 30, width - radius - 30));
            y = floor(random(radius + 30, height - radius - 30));
            position = createVector(x, y);
        } while (!isValidPlacement(position, radius));
        planets.push(new Planet(position, radius));
    }
}

function isValidPlacement(position, radius) {
    for (let planet of planets) {
        if (dist(position.x, position.y, planet.position.x, planet.position.y) <= radius + planet.radius + 100) {
            return false;
        }
    }
    return true;
}

function updateMenu() {
	let angle = turn.menu.angleSlider.val();
	let power = turn.menu.powerSlider.val();
	turn.menu.angleLabel.text(`Angle: ${angle}`);
	turn.menu.powerLabel.text(`Power: ${power}`);
	turn.angle = angle;
	turn.power = power;
}

function fireButtonPressed() {
    if (bullets.length == 0) {
        let dx = cos(turn.menu.angleSlider.val() * PI/180);
        let dy = sin(-turn.menu.angleSlider.val() * PI/180);
        let velocity = createVector(dx ,dy).setMag(turn.power/10);
        bullets.push(new Bullet(turn.tank, velocity))

        turn.hideMenu();
        turn = turn === players[0] ? players[1] : players[0];
        turn.showMenu();
    }
}