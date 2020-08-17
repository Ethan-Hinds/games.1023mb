
var cWidth = 750;
var cHeight = 750;
var shotFrame = 15;
var shotCool = 15;

var player;

var rocks = [];

var shots = [];

var difficulty = 100;

var gravityDamping = 0.05;

var shotSpeed = 5;

var score = 0;

function setup() {
    createCanvas(cWidth,cHeight);
    player = new Player(cWidth/2, cHeight/2, 0)
}

function draw() {
    background(0);
    if (keyIsDown(RIGHT_ARROW)) {
        player.rot += player.turnSpeed;
    }
    if (keyIsDown(LEFT_ARROW)) {
        player.rot -= player.turnSpeed;
    }

    if (keyIsDown(UP_ARROW)) {
        player.accelerating = true;
        player.dx += sin(player.rot) * player.accel;
        player.dy -= cos(player.rot) * player.accel;
    } else {
        player.accelerating = false;
    }

    if (keyIsDown(32)) {
        if (shotFrame == shotCool) {
            shotFrame = 0;
            shots.push(new Shot(player.x, player.y, shotSpeed*sin(player.rot), -shotSpeed*cos(player.rot)));
        }
    }

    for (let rock of rocks) {
        rock.show();
        rock.move();
    }

    for (let shot of shots) {
        shot.show();
        shot.move();
        shot.dist += 1;
        if (shot.dist == shot.life) {
            shots.splice(shots.indexOf(shot), 1);
        }

        for (let rock of rocks) {
            if (shot.getDistanceFromRock(rock) < rock.r/2 + shot.r/2) {
                score += ceil(80/rock.r + Math.sqrt(rock.dx**2 + rock.dy**2)) * 100;
                if (rock.r > 30) {
                    rock.split();
                }
                rocks.splice(rocks.indexOf(rock), 1);
                shots.splice(shots.indexOf(shot), 1);
            }
        }
    }

    player.move();
    player.show();

    if (shotFrame < shotCool) {
        shotFrame += 1;
    }
    if (frameCount % difficulty == 0) {
        createRock();
    }

    if (frameCount % 100 == 0 && difficulty >= 25) {
        difficulty -= 1;
    }
    textAlign(LEFT);
    textSize(16);
    text(score, 20, 20);
}

function createRock() {
    let r = floor(random(20, 60));
    let side = floor(random(1, 5));
    let x, y;
    let dx = random(1, 2);
    let dy = random(1, 2);
    switch (side) {
        case 1: x = -5*r; y = floor(random(0, cHeight)); break; // Left Side
        case 2: x = cWidth + 5*r; y = floor(random(0, cHeight)); dx *= -1; break; // Right Side
        case 3:y = -5*r; x = floor(random(0, cWidth)); break; // Top Side
        case 3:y = cHeight + 5*r; x = floor(random(0, cWidth)); dy *= -1; break; // Top Side
    }
    rocks.push(new Rock(x, y, dx, dy, r));
}

function keyPressed() {
    if (keyCode == 13) {
        rocks = [];
        shots = [];
        score = 0;
        player = new Player(cWidth/2, cHeight/2, 0);
        loop();
    }

    if (keyCode == 40) {
        player.x = random(0, cWidth);
        player.y = random(0, cHeight);
        player.dx = 0;
        player.dy = 0;
    }
}