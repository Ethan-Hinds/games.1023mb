var tankImage;
var particles = [];

var particleSize = 10;
var tankWidth = 30;
var tankHeight = 15;

var explodingParticles = [];

var powerDampening = 0.15;
var gravity = 0.2;
var tankSpeed = 2;

var players = [];
var projectiles = [];

var fireButton;
var moveLeftButton;
var moveRightButton;

var turn = 0;

function preload() {
    //tankImage = loadImage("tank.png")
}

function setup() {

    createCanvas(1000, 600);
    angleMode(DEGREES);
    generateTerrain(0.03, height * 0.3);
    createPlayers();
    createPlayerMenu();
}

function draw() {

    background(0, 0, 255);
    for (particle of particles) {
        particle.show();
    }

    for (explodingParticle of explodingParticles) {
        explodingParticle.show();
        explodingParticle.explode();
    }

    for (player of players) {
        player.show();
        player.update();
        // if (player.movingLeft >= 0) {
        //     player.move("left");
        //     player.movingLeft += 1;
        //     if (player.movingLeft >= 20) {
        //         player.movingLeft = -1;
        //     }
        // }
        // if (player.movingRight >= 0) {
        //     player.move("right");
        //     player.movingRight += 1;
        //     if (player.movingRight >= 20) {
        //         player.movingRight = -1;
        //     }
        // }
    }

    for (projectile of projectiles) {
        projectile.show();
        projectile.update();
        projectile.checkForCollisionOrBounds();
    }

    $("#turnIndicator").text("Player " + turn + 1);
    $("#angleParagraph").text("Angle: " + $("#angleSlider").val());
    $("#powerParagraph").text("Power: " + $("#powerSlider").val());
}

function generateTerrain(inc, maxGroundHeight) {
    xoff = 0;
	for (let x = 0; x < width; x += particleSize) {
		let y = floor(map(noise(xoff), 0, 1, maxGroundHeight, height));
		particles.push(new Particle(x, y, particleSize));
		xoff += inc;
	}
    for (let x = 0; x < width; x += particleSize) {
        y = getHighestParticleInRange(x, 1).y + particleSize
        while (y < height) {
            particles.push(new Particle(x, y, particleSize));
            y += particleSize;
        }
    }
}

function createPlayers() {
    let x1 = random(50, width * 0.3);
    let x2 = random(width * 0.6, width - 50);
    let y1 = getHighestParticleInRange(x1, tankWidth).y - tankHeight;
    let y2 = getHighestParticleInRange(x2, tankWidth).y - tankHeight;
    players.push(new Player(x1, y1, "red", 45, 50));
    players.push(new Player(x2, y2, "gray", 180, 50));
}

function createPlayerMenu() {
    $("body").append("<p id = 'turnIndicator'> </p> <br>")
    let weapons = ["Single Shot", "Double Shot", "Triple Shot", "Big Shot", "Double Big Shot", "Triple Big Shot"];
    createP("Weapon: ");
    let str = "";
    for (weapon of weapons) {
        str += "<option value = '" + weapon + "'>" + weapon + "</option>";
    }
    $("body").append("<select id = 'weaponSelector'>" + str + "</select>");
    $("body").append("<br>");
    $("body").append("<p id = 'angleParagraph'> </p>");
    $("body").append("<input type = 'range' min = '0' max = '360' value = '45' class = 'slider' id = 'angleSlider'> </input>");
    $("body").append("<br>");
    $("body").append("<p id = 'powerParagraph'> </p>");
    //powerSlider = createSlider(0, 100);
    $("body").append("<input type = 'range' min = '0' max = '100' value = '50' class = 'slider' id = 'powerSlider'> </input>");
    $("body").append("<br>");
    fireButton = createButton("Fire");
    fireButton.mousePressed(fire);

    moveLeftButton = createButton("Move Left");
    moveLeftButton.mousePressed(moveLeft);

    moveRightButton = createButton("Move Right");
    moveRightButton.mousePressed(moveRight);
}

function getHighestParticleInRange(x, width) {
    let particlesInRange = [];
    for (particle of particles) {
        if (particle.x >= x && particle.x < x + width) {
            particlesInRange.push(particle);
        }
    }
    // For each particle in the range, find the lowest one that has air above it
    let highestParticle = particlesInRange[0];
    for (p of particlesInRange) {
        if (p.y < highestParticle.y) {
            highestParticle = p;
        }
    }
    return highestParticle;
}

function getHighestParticleBelowPlayer(player) {
    let particlesInRange = [];
    for (particle of particles) {
        if (particle.x > player.x && particle.x < player.x + player.width && particle.y > player.y + player.height - 0.1) {
            particlesInRange.push(particle);
        }
    }
    let highestParticle = particlesInRange[0];
    for (particleInRange of particlesInRange) {
        if (particleInRange.y < highestParticle.y) {
            highestParticle = particleInRange;
        }
    }
    return highestParticle;
}

// There is no air in the range
function rangeHasAir(x1, y1, x2, y2) {
    let isAir = false;
    for (let x = x1; x <= x2; x += particleSize) {
        for (let y = y1; y <= y2; y += particleSize) {
            let nearestParticle = getNearestParticle(x, y);
            if (dist(x, y, nearestParticle.x, nearestParticle.y) > particleSize / 2) {
                isAir = [x, y];
            }
        }
    }

    return isAir;
}

function getNearestParticle(x, y) {
    let closest = particles[0];
    for (p of particles) {
        let d = dist(x, y, p.x, p.y);
        if (d < dist(x, y, closest.x, closest.y)) {
            closest = p;
        }
    }
    return closest;
}

$(document).keydown(function() {
    if (keyCode == LEFT_ARROW) {
        document.getElementById("angleSlider").value = parseInt($("#angleSlider").val()) + 1;
    } else if (keyCode == RIGHT_ARROW) {
        document.getElementById("angleSlider").value = parseInt($("#angleSlider").val()) - 1;
    } else if (keyCode == UP_ARROW) {
        document.getElementById("powerSlider").value = parseInt($("#powerSlider").val()) + 1;
    }  else if (keyCode == DOWN_ARROW) {
        document.getElementById("powerSlider").value = parseInt($("#powerSlider").val()) - 1;
    }
});

function fire() {
    let type = $("#weaponSelector").val();
    let angle = parseInt($("#angleSlider").val());
    let power = parseInt($("#powerSlider").val());
    let player = players[turn];
    projectiles.push(new Projectile(type, player.x + tankWidth / 2 + 20*cos(angle), player.y - 3 - 20*sin(angle), power * cos(angle) * powerDampening, -power * sin(angle) * powerDampening));
    projectiles[projectiles.length - 1].fireEvent();

    turn = (turn + 1)%players.length;
}

function moveLeft() {
    if (players[turn].movingLeft == -1 && players[turn].movingRight == -1) {
        players[turn].movingLeft = 1;
    }
}

function moveRight() {
    if (players[turn].movingLeft == -1 && players[turn].movingRight == -1) {
        players[turn].movingRight = 1;
    }
}
