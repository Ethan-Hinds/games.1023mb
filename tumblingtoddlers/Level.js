function Level(n) {
    this.n = n;

    this.init = function() {

        this.backgroundColor = color(0, 0, 0);

        status = "intro";

        this.warning = random([
            "* WARNING:  Babies do not actually fly.",
            "* NOTE:  No babies were harmed in the making of this game.",
            "* WARNING:  Some assembly required.",
            "* CAUTION:  Flying babies are not a life saving device.",
            "* WARNING:  Do not use babies as a floatation device.",
            "* WARNING:  Babies for display purposes only.  Do not ingest.",
            "* WARNING:  Babies are not a toy.",
            "* CAUTION:  Children must be under adult supervision!",
            "* For best results play at maximum volume.",
            "* CAUTION:  Risk of electric shock. Do not open babies.",
            "* WARNING:  Keep babies away from water.",
            "* WARNING:  Not to be used for anything else.",
            "* WARNING:  Never iron clothes on the baby’s body.",
            "* CAUTION:   Avoid dropping babies out of windows.",
            "* WARNING:  Do not use while sleeping.",
            "* CAUTION!  Do not attempt to stop moving baby with hands.",
            "* NOTE:  Manufactured in a facility that contains children.",
            "* NOTE:  This product must be cooked prior to eating.",
            "* Twist to Open",
            "* Warning:  May cause drowsiness.",
            "* Do not play if allergic to babies.",
            "* Use all babies before expiration date",
            "* CAUTION:  Contents may be hot.",
            "* WARNING:  Keep child upright.",
            "* Suitable for vegetarians.",
            "* Do not use babies near fire, flame, or sparks.",
            "* WARNING:  Do not attempt flips or other acrobatic stunts.",
            "* CAUTION:  Risk of fire",
            "* Do not wash or dry clean.",
            "* CAUTION:  Playing this game does not enable you to fly.",
            "* WARNING:  Diaper does not enable user to fly."
        ]);

        this.sounds = {
            "backgroundMusic": sounds["backgroundMusic"],
            "boing": sounds["boing"],
            "break": sounds["break"],
            "dropped": sounds["dropped"],
            "coda": sounds["coda"]
        }

        this.babiesCaught = 0;
        this.babiesDropped = 0;
        this.babies = [];
        this.babyQueue = [];
        this.babyQueueIndex = 0;
        this.lastBaby;
        this.firemanQueue = [];
        this.trampolines = [];
        this.startFrame;
        this.startTime;
        this.columns = [];
        this.type; // "time" "number" "catchAll"
        this.percentage;
        this.time;
        this.catchRequirement;
        this.dropRequirement;
        this.description;
        this.introLength;
        this.helicopters = [];
        this.trampolinesBroken = 0;

        this.sceneButtons = [
            new SceneButton(10, 10, 50, 50, sceneButtonImages["levelsIcon"], new LevelMenu())
        ];

            // Default values
        this.numberOfColumns = 9;
        this.gravity = 0.25;

        this.babyDx = 0; // A range.  Each baby will have a random dx (0, this.babyDx)
        this.babyDy = -5;
        this.babyRotation = 0;
        this.babyWidth;

        this.showFiremen = true;

        this.distanceTime = 30;
        this.clusterTimeMultiplier = 1; // Must be (0, 1), Lower is harder

        this.ladyFrequency = 0.2;

        this.helicopterFrequency;

        this.parachutePercentage = 0;
        this.parachuteHeight = cHeight * 0.55;

        this.createColumns();
        this.babyWidth = cWidth / this.numberOfColumns;

        this.trampolines.push(new Trampoline(this.trampolineWidth, true, this));
        this.trampolineSpeed = cWidth * 0.01;
        this.trampolineWidth = 1.5 * cWidth / this.numberOfColumns;
        this.playerTrampoline = this.trampolines[0];

        switch(this.n) {
            case 1:
                this.type = "number";
                this.catchRequirement = 10;
                this.dropRequirement = 5;
                this.ladyFrequency = 0;
                this.description = "Catch " + this.catchRequirement + " babies before dropping " + this.dropRequirement;
                break;
            case 2:
                this.distanceTime = 20;

                this.type = "time";
                this.percentage = 0.60;
                this.time = 30;
                this.description = "A little bit faster now.\nCatch at least " + this.percentage*100 + "% of the babies in " + this.time + " seconds";
                break;
            case 3:
                this.distanceTime = 20;
                this.helicopterFrequency = 600;

                this.type = "time";
                this.percentage = 0.75;
                this.time = 35;
                this.description = "Catch at least " + this.percentage*100 + "% of the babies in " + this.time + " seconds";
                break;
            case 4:
                this.distanceTime = 11;
                this.clusterTimeMultiplier = 0.5;
                this.ladyFrequency = 0.1;

                this.type = "time";
                this.percentage = 0.75;
                this.time = 45;
                this.description = "Keep up the good work!\nCatch at least " + this.percentage*100 + "% of the babies in " + this.time + " seconds";
                break;
            case 5:
                this.distanceTime = 11;
                this.clusterTimeMultiplier = 0.75;
                this.babyDx = 4;
                this.babyRotation = 0.05;
                this.ladyFrequency = 0.1;

                this.type = "time";
                this.percentage = 0.75;
                this.time = 45;
                this.description = "The firemen are intoxicated!\nCatch at least " + this.percentage*100 + "% of the babies!";
                break;
            case 6:
                this.distanceTime = 12;
                this.clusterTimeMultiplier = 0.5;
                this.ladyFrequency = 0.1;

                this.type = "time";
                this.percentage = 0.70;
                this.time = 45;
                this.description = "Doubletime!\nCatch at least " + this.percentage*100 + "% of the babies!";
                break;
            case 7:
                this.distanceTime = 9;
                this.ladyFrequency = 0;

                this.type = "number";
                this.catchRequirement = 10;
                this.dropRequirement = 2;
                this.description = "This one is tough!\nCatch " + this.catchRequirement + " babies before dropping " + this.dropRequirement;
                break;
            case 8:
                this.distanceTime = 15;
                this.babyDy = -12;
                
                this.type = "time";
                this.percentage = 0.80;
                this.time = 35;
                this.description = "The firemen are enthusiastic!\nCatch " + this.percentage*100 + "% of the babies";
                break;
            case 9:
                this.distanceTime = 11;
                this.clusterTimeMultiplier = 0.4;
                this.ladyFrequency = 0;

                this.type = "catchAll";
                this.catchRequirement = 30;
                this.description = "Be a hero! Catch every baby!";
                break;
            case 10:
                this.distanceTime = 10;
                this.clusterTimeMultiplier = 0.2;
                this.ladyFrequency = 0.70;

                this.type = "time";
                this.percentage = 0.75;
                this.time = 35;
                this.description = "Look out below!\nCatch " + this.percentage*100 + "% of the babies";
                break;
            case 11:
                for (let i = 0; i < this.numberOfColumns; i += 1) {
                    this.columns[i].windows.push(new Window(this.columns[i], cHeight * 0.405));
                }

                this.distanceTime = 11;
                this.clusterTimeMultiplier = 0.55;
                this.ladyFrequency = 0.1;

                this.type = "time";
                this.percentage = 0.80;
                this.time = 45;
                this.description = "The fire has spread!\nCatch " + this.percentage*100 + "% of the babies";
                break;
            case 12:
                this.babyWidth = cWidth / this.numberOfColumns*0.65;
                this.trampolineWidth = 1.5 * cWidth / this.numberOfColumns * 0.60;
                this.sounds = {
                    "break": sounds["break"],
                    "backgroundMusic": sounds["highPitchedBackgroundMusic"],
                    "boing": sounds["highPitchedBoing"],
                    "coda": sounds["highPitchedCoda"],
                    "dropped": sounds["highPitchedDropped"]
                }

                this.distanceTime = 10;
                this.clusterTimeMultiplier = 0.4;
                this.ladyFrequency = 0;

                this.type = "time";
                this.percentage = 0.75;
                this.time = 40;
                this.description = "Preemies! Catch " + this.percentage*100 + "% of the babies";
                break;
            case 13:
                this.distanceTime = 12;
                this.clusterTimeMultiplier = 0.5;
                this.babyDy = 8;
                
                this.type = "time";
                this.percentage = 0.75;
                this.time = 35;
                this.description = "The firemen are angry!\nCatch " + this.percentage*100 + "% of the babies";
                break;
            case 14:
                this.distanceTime = 9;
                this.clusterTimeMultiplier = 0.5;
                this.ladyFrequency = 0;
                this.babyDy = 0;
                this.showFiremen = false;
                
                this.type = "time";
                this.percentage = 0.90;
                this.time = 40;
                this.description = "The firemen are on vacation!\nCatch " + this.percentage*100 + "% of the babies";
                break;
            case 15:
                this.distanceTime = 9;
                this.clusterTimeMultiplier = 0.7;
                this.ladyFrequency = 0.1;
                
                this.type = "time";
                this.percentage = 0.8;
                this.time = 40;
                this.parachutePercentage = 0.4;
                this.description = "BASE Jumping Babies!\nCatch " + this.percentage*100 + "% of the babies";
                break;
            case 16:
                this.distanceTime = 6;
                this.clusterTimeMultiplier = 0.5;
                this.ladyFrequency = 0.1;
                let aiTrampoline = new Trampoline(this.trampolineWidth, false, this);
                this.trampolines.push(aiTrampoline);

                this.type = "time";
                this.percentage = 0.70;
                this.time = 45;
                this.description = "Help has arrived!\nCatch at least " + this.percentage*100 + "% of the babies!";
                break;
            case 17:
                this.distanceTime = 4;
                this.clusterTimeMultiplier = 0.5;
                this.ladyFrequency = 0;
                this.babyDy = 0;
                this.showFiremen = false;
                this.trampolineSpeed *= 1.50;

                this.sounds = {
                    "break": sounds["break"],
                    "backgroundMusic": sounds["babyStormBackgroundMusic"],
                    "boing": sounds["highPitchedBoing"],
                    "coda": sounds["highPitchedCoda"],
                    "dropped": sounds["highPitchedDropped"]
                }
                
                this.type = "time";
                this.percentage = 0.65;
                this.time = 48;
                this.description = "Baby Storm!\nCatch " + this.percentage*100 + "% of the babies";
                break;
            case 18:

                this.distanceTime = 10;
                this.ladyFrequency = 0;
                this.babyRotation = 0.1;
                this.gravity *= 1.25;
                this.type = "time";
                this.time = 50;
                this.percentage = 0.85;
                this.description = "Time warp!\nCatch " + this.percentage*100 + "% of the babies";

                this.babyDx = 10;
                this.babyDy = -10;

                this.leftColumn = new Column(-cWidth/this.numberOfColumns, cWidth/this.numberOfColumns, 0);
                this.leftColumn.windows.push(new Window(this.leftColumn, cHeight * 0.1));
                this.leftColumn.windows.push(new Window(this.leftColumn, cHeight * 0.25));
                this.leftColumn.windows.push(new Window(this.leftColumn, cHeight * 0.40));
                this.leftColumn.windows.push(new Window(this.leftColumn, cHeight * 0.55));
                this.leftColumn.windows.push(new Window(this.leftColumn, cHeight * 0.70));

                this.rightColumn = new Column(cWidth, cWidth/this.numberOfColumns, 0);
                this.rightColumn.windows.push(new Window(this.rightColumn, cHeight * 0.1));
                this.rightColumn.windows.push(new Window(this.rightColumn, cHeight * 0.25));
                this.rightColumn.windows.push(new Window(this.rightColumn, cHeight * 0.40));
                this.rightColumn.windows.push(new Window(this.rightColumn, cHeight * 0.55));
                this.rightColumn.windows.push(new Window(this.rightColumn, cHeight * 0.70));
                break;
        }
    }


    this.show = function() {

        for (let column of this.columns) {
            column.show();
        }
        for (let fireman of this.firemanQueue) {
            if (fireman.shouldShow()) {
                fireman.show();
            }
        }

        for (let button of this.sceneButtons) {
            button.show();
        }

        for (let baby of this.babies) {

            baby.show();
            baby.move();
            baby.handleBoundary();

            if (baby.willParachute && !baby.parachute && baby.y > this.parachuteHeight) {
                baby.oepnParachute();
            }

            if (status == "win" || status == "lose") {
                if (!baby.parachute) {
                    baby.oepnParachute();
                }
            } else {
                if (!baby.parachute) {
                    baby.handleCollision();
                }
            }
        }

        for (let helicopter of this.helicopters) {
            helicopter.show();
            helicopter.move();
            if (frameCount % helicopter.dropFrequency == 0) {
                helicopter.drop();
            }
            if (helicopter.isOutOfBounds()) {
                this.helicopters.splice(this.helicopters.indexOf(helicopter), 1);
            }
        }

        for (let i = this.trampolines.length - 1; i >= 0; i -= 1) {
            let trampoline = this.trampolines[i];
            trampoline.show();
            if (!trampoline.isPlayer) {
                if (this.babies.length > 0) {
                    if (trampoline.needsNewTarget()) {
                        trampoline.target = random(this.babies);
                    }
                    trampoline.moveAI();
                }
            }
        }

        if (keyIsDown(LEFT_ARROW)) {
            this.playerTrampoline.movePlayer(-this.trampolineSpeed);
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.playerTrampoline.movePlayer(this.trampolineSpeed);
        }

        if (mouseIsPressed) {
            if (mouseX < cWidth*0.3) {
                this.playerTrampoline.movePlayer(-this.trampolineSpeed);
            } else if (mouseX > cWidth*0.7) {
                this.playerTrampoline.movePlayer(this.trampolineSpeed);
            }
        }

        // Baby calculations and creations
        if (status == "game") {

            // Helicopters
            if (this.helicopterFrequency) {
                if (frameCount % this.helicopterFrequency == 0 && status == "game") {
                    this.createHelicopter();
                }
            }

            if (this.babyQueue[this.babyQueueIndex]) {
                if (this.babyQueue[this.babyQueueIndex][1] == frameCount) {
                    let baby = this.babyQueue[this.babyQueueIndex][0];
                    if (baby.isLady) {
                        baby.dy *= 0.5;
                        baby.dx = 0;
                        baby.angularVelocity = 0;
                    }
                    this.createBaby(baby.window, this.babyWidth, baby.dx, baby.dy, baby.angularVelocity, baby.isLady, baby.willParachute);
                    this.babyQueueIndex += 1;
                }
            } else {
                this.calculateBabies();
            }

            // End game detection
            if (this.type == "time") {
                if (this.time - (
                    (second() - this.startTime.second)*1 +
                    (minute() - this.startTime.minute)*60 +
                    (hour() - this.startTime.hour)*3600 +
                    (day() - this.startTime.day)*86400)
                    <= 0) {
                    if (this.babiesCaught / (this.babiesCaught + this.babiesDropped) >= this.percentage) {
                        this.endLevel("win");
                    } else {
                        this.endLevel("lose");
                    }
                }
            } else if (this.type == "number") {
                if (this.babiesCaught >= this.catchRequirement) {
                    this.endLevel("win");
                } else if (this.babiesDropped >= this.dropRequirement) {
                    this.endLevel("lose");
                }
            } else if (this.type == "catchAll") {
                if (this.babiesDropped > 0) {
                    this.endLevel("lose");
                } else if (this.babiesCaught >= this.catchRequirement) {
                    this.endLevel("win");
                }
            }
        } else if (status == "intro") {
            textSize("30");
            textAlign(CENTER, CENTER);
            fill("black");
            text(this.description, cWidth/2 + 2, cHeight * 0.45 + 2);
            fill("white");
            text(this.description, cWidth/2, cHeight * 0.45);
            if (this.introLength - floor((frameCount - this.startFrame) / 60) > 0) {
                let n = this.introLength - floor((frameCount - this.startFrame) / 60)
                textSize("40");
                fill("black");
                text("First baby in " + n, cWidth/2 + 2, cHeight*1.0875/2 + 7);
                fill("white");
                text("First baby in " + n, cWidth/2, cHeight*1.0875/2 + 5);
            } else {
                this.endIntro();
            }
        } else if (status == "win") {
            textAlign(CENTER, CENTER);
            textSize("60");
            fill("black");
            text("Level passed!", cWidth/2 + 2, cHeight*0.35 + 2);
            fill(0, 255, 0);
            text("Level passed!", cWidth/2, cHeight*0.35);

            textSize("20");
            fill("black");
            text(this.warning, cWidth/2 + 2, cHeight * 0.8 + 2);
            fill("white");
            text(this.warning, cWidth/2, cHeight * 0.8);

        } else if (status == "lose") {
            textAlign(CENTER, CENTER);
            textSize("60"); 
            fill("black");
            text("Game Over!", cWidth/2 + 2, cHeight*0.35 + 2);
            fill("red");
            text("Game Over!", cWidth/2, cHeight*0.35);

            textSize("20");
            fill("white");
            text(this.warning, cWidth/2, cHeight * 0.8);
        }

        if (this.type == "time" && (status == "game" || status == "win" || status == "lose")) {
            this.showPercentage();
            if (status == "game") {
                this.showTime();
            }
        } else if (this.type == "number" && (status == "game" || status == "win" || status == "lose")) {
            this.showCaught();
            this.showDropped();
        } else if (this.type == "catchAll" && (status == "game" || status == "win" || status == "lose")) {
            this.showCaught();
            this.showRemaining();
        }
        this.showGoal();
    }

    this.startIntro = function(introLength) {
        this.introLength = introLength;
        this.startFrame = frameCount;
    }

    this.endIntro = function() {
        if (this.n != timeWarpLevel) {
            let column = this.columns[floor(random(this.columns.length))];
            let baby = new Baby(random(column.windows), this.babyWidth, this.babyDx, this.babyDy, this.babyRotation, false, false, this)
            this.lastBaby = baby;
        }
        this.calculateBabies();
        this.startTime = {"second": second(), "minute": minute(), "hour": hour(), "day": day()};
        status = "game";
    }

    this.endLevel = function(result) {
        if (this.n != babyStormLevel) {
            this.sounds["backgroundMusic"].stop();
        }
        if (this.n != babyStormLevel) {
            this.sounds["coda"].play();
        }
        this.firemanQueue = [];
        this.gravity = 0;

        if (result == "win" && levels[n]) {
            this.sceneButtons.push(new SceneButton(cWidth/2 - 100, cHeight * 0.45, 200, 79, sceneButtonImages["nextLevel"], levels[this.n]));
        } else if (result == "lose") {
            this.sceneButtons.push(this.tryAgainSceneButton = new SceneButton(cWidth/2 - 100, cHeight * 0.45, 200, 79, sceneButtonImages["tryAgain"], levels[this.n - 1]));
        }

        this.sceneButtons.push(new SceneButton(cWidth/2 - 115, cHeight * 0.60, 230, 79, sceneButtonImages["levels"], new LevelMenu()));

        status = result;
        this.setStats();
    }

    this.createBaby = function(window, width, dx, dy, angularVelocity, isLady, willParachute) {
        let baby = new Baby(window, width, dx, dy, angularVelocity, isLady, willParachute, this);
        this.babies.push(baby);
    }

    this.showPercentage = function() {
        if (this.babiesCaught + this.babiesDropped != 0) {
            textAlign(LEFT, TOP);
            textSize("40");
            let percentage = this.babiesCaught / (this.babiesCaught + this.babiesDropped);
            fill("black");
            text((100 * percentage).toFixed(1) + "%", this.columns[0].windows[0].x + 2, cHeight * 0.235 + 2);
            if (percentage >= this.percentage) {
                fill(0, 255, 0);
            } else {
                fill("red");
            }
            text((100 * percentage).toFixed(1) + "%", this.columns[0].windows[0].x, cHeight * 0.235);
        }
    }
    
    this.showTime = function() {
        textAlign(RIGHT, TOP);
        textSize("40");
        let time = this.time - (
            (second() - this.startTime.second)*1 +
            (minute() - this.startTime.minute)*60 +
            (hour() - this.startTime.hour)*3600 + 
            (day() - this.startTime.day)*86400);
        if (time < 0) {
            time += 60;
        }

        fill("black");
        text(time, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width + 2, cHeight * 0.235 + 2);
        fill("white");
        text(time, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width, cHeight * 0.235);
    }
    
    this.showCaught = function() {
        textAlign(LEFT, TOP);
        textSize("40");
        fill("black");
        text("Saved: " + this.babiesCaught, this.columns[0].windows[0].x + 2, cHeight * 0.235 + 2);
        fill("white");
        text("Saved: " + this.babiesCaught, this.columns[0].windows[0].x, cHeight * 0.235);
    }
    
    this.showDropped = function() {
        textAlign(RIGHT, TOP);
        textSize("40");
        fill("black");
        text("Missed: " + this.babiesDropped, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width + 2, cHeight * 0.235 + 2);
        fill("white");
        text("Missed: " + this.babiesDropped, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width, cHeight * 0.235);
    }

    this.showRemaining = function() {
        let r = this.catchRequirement - this.babiesCaught;
        textAlign(RIGHT, TOP);
        textSize("40");
        fill("black");
        text("Remaining: " + r, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width + 2, cHeight * 0.235 + 2);
        fill("white");
        text("Remaining: " + r, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width, cHeight * 0.235);
    }

    this.showGoal = function() {
        let t;
        if (this.type == "number") {
            t = "Level " + this.n + " Goal: " + this.catchRequirement + " before " + this.dropRequirement;
        } else if (this.type == "time") {
            t = "Level " + this.n + " Goal: " + this.percentage * 100 + "%";
        } else if (this.type == "catchAll") {
            t = "Level " + this.n + " Goal: " + "Save all the babies!";
        }
        textAlign(RIGHT, TOP);
        textSize("25");
        fill("black");
        text(t, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width + 2, cHeight * 0.05 + 2);
        fill("white");
        text(t, this.columns[this.numberOfColumns - 1].windows[0].x + this.columns[0].windows[0].width, cHeight * 0.05);
    }

    this.calculateBabies = function() {
        let frame = frameCount;
        this.babyQueue = [];
        this.babyQueueIndex = 0;
        this.firemanQueue = [];

        if (this.n != timeWarpLevel) {

            while (true)  {
                let possibleColumns = [];
                for (let i = 0; i < this.numberOfColumns; i += 1) {
                    if (this.columns[i].index != this.lastBaby.window.column.index) {
                        possibleColumns.push(this.columns[i]);
                    }
                }
                let nextColumn = random(possibleColumns);
                let indexDifference = abs(this.lastBaby.window.column.index - nextColumn.index);
                if (indexDifference <= 1) {
                    indexDifference *= this.clusterTimeMultiplier;
                }
                let nextBabyFrame = floor(frame + indexDifference * this.distanceTime);
                let babyDx = random(this.babyDx);
                if (nextColumn.index > this.numberOfColumns/2) {
                    babyDx *= -1;
                    this.babyRotation *= -1;
                }
                let isLady = random() < this.ladyFrequency
                let willParachute = isLady? false : random() < this.parachutePercentage;
                let nextBaby = new Baby(random(nextColumn.windows), width, babyDx, random(this.babyDy*.75, this.babyDy), this.babyRotation, isLady, willParachute, this);
                this.babyQueue.push([nextBaby, nextBabyFrame]);
                this.firemanQueue.push(new Fireman(nextBaby, nextBabyFrame));

                if (this.type == "time") {
                    if (this.babyQueue[this.babyQueue.length - 1][1] > frameCount + this.time*60) {
                        break;
                    }
                } else if (this.type == "number") {
                    if (this.babyQueue.length > this.catchRequirement + this.dropRequirement) {
                        break;
                    }
                } else if (this.type == "catchAll") {
                    if (this.babyQueue.length > this.catchRequirement) {
                        break;
                    }
                }

                frame = nextBabyFrame;
                this.lastBaby = nextBaby;
            }
        } else {
            while (true) {
                let nextColumn = random([this.leftColumn, this.rightColumn]);
                let nextBabyFrame = floor(frame + random(10, 40));

                let babyDx = random(this.babyDx*0.25, this.babyDx);
                if (nextColumn.x > 0) {
                    babyDx *= -1;
                    this.babyRotation *= -1;
                }
                let nextBaby = new Baby(random(nextColumn.windows), width, babyDx, random(this.babyDy*.75, this.babyDy), this.babyRotation, false, false, this);
                this.babyQueue.push([nextBaby, nextBabyFrame]);
                this.firemanQueue.push(new Fireman(nextBaby, nextBabyFrame));
                if (this.babyQueue[this.babyQueue.length - 1][1] > frameCount + this.time*60) {
                    break;
                }
                frame = nextBabyFrame;
            }
        }
    }

    this.createColumns = function() {
        for (let i = 0; i < this.numberOfColumns; i += 1) {
            let column = new Column(i*cWidth/this.numberOfColumns, cWidth/this.numberOfColumns, i);
            column.windows.push(new Window(column, cHeight * 0.1));
            this.columns.push(column);
        }
    }

    this.createHelicopter = function() {
        let scale = 1.25;
        let width = helicopterImages[0].width*scale;
        let height = helicopterImages[0].height*scale;
        let x = random([-width, cWidth]);
        let y = cHeight * 0.05;
        let dx = 3;
        let dy = 0;
        let isReversed;
        if (x < 0) {
            isReversed = true;
        } else {
            isReversed = false;
            dx *= -1;
        }
        let dropFrequency = 250;
        this.helicopters.push(new Helicopter(x, y, dx, dy, width, height, isReversed, dropFrequency, this));

    }

    this.setStats = function() {
        let str;
        // Total Babies Caught
        let totalCaught;
        str = "Total Babies Caught";
        if (str in localStorage) {
            totalCaught = parseFloat(localStorage.getItem(str)) + this.babiesCaught;
            localStorage.setItem(str, totalCaught);
        } else {
            totalCaught = parseFloat(this.babiesCaught)
            localStorage.setItem(str, totalCaught);
        }

        // Total Babies Dropped
        let totalDropped;
        str = "Total Babies Dropped";
        if (str in localStorage) {
            totalDropped = parseFloat(localStorage.getItem(str)) + this.babiesDropped;
            localStorage.setItem(str, totalDropped);
        } else {
            totalDropped = parseFloat(this.babiesDropped)
            localStorage.setItem(str, totalDropped);
        }

        // Average Percentage
        str = "Average Percentage";
        let totalPercentage = totalCaught / (totalCaught + totalDropped);
        localStorage.setItem(str, totalPercentage);

        // Games Played
        str = "Games Played";
        if (str in localStorage) {
            localStorage.setItem(str, parseFloat(localStorage.getItem(str)) + 1);
        } else {
            localStorage.setItem(str, 1);
        }

        // Trampolines Broken
        str = "Trampolines Broken";
        if (str in localStorage) {
            localStorage.setItem(str, parseFloat(localStorage.getItem(str)) + this.trampolinesBroken);
        } else {
            localStorage.setItem(str, this.trampolinesBroken);
        }

        // Total Time Played
        str = "Total Time Played";
        let time =
            (second() - this.startTime.second)*1 +
            (minute() - this.startTime.minute)*60 +
            (hour() - this.startTime.hour)*3600 + 
            (day() - this.startTime.day)*86400;
        time /= 60; // Set to minutes
        if (str in localStorage) {
            localStorage.setItem(str, parseFloat(localStorage.getItem(str)) + time);
        } else {
            localStorage.setItem(str, time);
        }
    }
}