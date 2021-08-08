function Baby(window, width, dx, dy, angularVelocity, isLady, willParachute, _scene) {
    this.window = window;
    this.dx = dx;
    this.dy = dy;
    this.angularVelocity = angularVelocity;
    this.scene = _scene;
    this.isLady = isLady;
    this.willParachute = willParachute;
    this.parachute;
    this.hasBounced = false;

    this.images = this.willParachute ? babyBackpackImages : babyImages;

    this.rotation = 0;
    this.imageIndex = 0;
    this.image = this.images[this.imageIndex];
    this.width = width;
    this.height = this.width * this.image.height / this.image.width;
    if (this.isLady) {
        this.width *= 1.75;
        this.height *= 1.75 * this.image.height / this.image.width;
    }
    this.x = this.window.x - this.width/3;
    this.y = this.window.y + this.window.height*4/3 - this.height;
    this.thrownFrame = frameCount;

    this.isAffectedByGravity = true;

    this.show = function() {
        
        if (this.isLady) {
            this.image = ladyImages[0];
        } else {
            if (frameCount % 5 == 0) {
                this.image = this.images[this.imageIndex];
                this.imageIndex = (this.imageIndex + 1) % this.images.length;
            }
        }
    }

    this.move = function() {

        if (this.isAffectedByGravity) {
            this.dy += this.scene.gravity;
        }
        this.y += this.dy;

        this.x += this.dx;
        this.rotation += this.angularVelocity;

        push();
        translate(this.x + this.width/2, this.y + this.height/2);
        rotate(this.rotation);
        image(this.image, -this.width/2, -this.height/2, this.width, this.height);
        pop();

        if (this.parachute) {
            this.dx *= 0.95;
            this.rotation *= 0.75;
            if (this.rotation < 0.5) {
                this.rotation = 0;
            }
            this.dy = 2 + this.dy * 0.50;
            this.parachute.show();
        }

        if (this.scene.n == timeWarpLevel) {
            if (this.targetWindow) {
                if (dist(this.x + this.width/2, this.y + this.height/2, this.targetWindow.x + this.targetWindow.width/2, this.targetWindow.y + this.targetWindow.height/2) < -this.dy*1.5) {
                    this.scene.babies.splice(this.scene.babies.indexOf(this), 1);
                    this.scene.babiesCaught += 1;
                }
            }
        }

    }

    this.handleCollision = function() {



        let centerX = this.x + this.width/2;
        let centerY = this.y + this.height/2;
        let r = sqrt(this.width ** 2 + this.height ** 2) * 0.38;

        if (this.isLady) {
            r *= 0.75;
        }

        for (let trampoline of this.scene.trampolines) {

            let trampolineLeft = trampoline.x + trampoline.width/4;
            let trampolineRight = trampoline.x + trampoline.width*3/4;
            let trampolineCenterY = trampoline.y + trampoline.height*2/3;
            let trampolineR = sqrt(trampoline.width ** 2 + trampoline.height ** 2) * 0.2;

            //noFill();
            //ellipse(centerX, centerY, r*2, r*2);
            //ellipse(trampolineLeft, trampolineCenterY, trampolineR*2, trampolineR*2);
            //ellipse(trampolineRight, trampolineCenterY, trampolineR*2, trampolineR*2);

            if (dist(centerX, centerY, trampolineLeft, trampolineCenterY) < r + trampolineR || dist(centerX, centerY, trampolineRight, trampolineCenterY) < r + trampolineR) {
                if (this.isLady) {
                    trampoline.break();
                    if (!this.scene.sounds["break"].isPlaying()) {
                        this.scene.sounds["break"].play();
                        this.scene.trampolinesBroken += 1;
                    }
                } else {
                    this.hasBounced = true;
                    if (!trampoline.brokenFrame) {


                        if (this.scene.n != timeWarpLevel) {
                            this.dy = -abs(this.dy);
                            if (this.x + this.width/2 > cWidth/2) {
                                this.dx = 8;
                            } else {
                                this.dx = -8;
                            }
                        } else {
                            this.dy = -15;
                            let nearestColumn;
                            let minXDist = cWidth;
                            for (let column of this.scene.columns) {
                                let xDist = (column.x + column.width/2) - (this.x + this.width/2);
                                if (abs(xDist) < abs(minXDist)) {
                                    minXDist = xDist;
                                    nearestColumn = column;
                                }
                            }
                            let yDist = nearestColumn.windows[0].y - this.y + this.height/2;
                            this.dx = this.dy * minXDist / yDist;
                            this.isAffectedByGravity = false;
                            this.targetWindow = nearestColumn.windows[0];
                            this.window = this.targetWindow;
                            this.scene.firemanQueue.push(new Fireman(this, floor(frameCount + yDist/this.dy)));
                        }
                        if (this.scene.n != babyStormLevel) {
                            this.scene.sounds["boing"].play();
                        }
                        this.angularVelocity = random(-0.2, 0.2);
                    } else {
                        this.dy = -abs(this.dy) * 0.2;
                        if (this.x + this.width/2 > trampoline.x + trampoline.width/2) {
                            this.dx = 5;
                            this.angularVelocity = 0.2;
                        } else {
                            this.dx = -5;
                            this.angularVelocity = -0.2;
                        }
                    }
                }
            }
        }
    }

    this.handleBoundary = function() {
        if (!this.isLady && !this.parachute) {
            if (this.y > cHeight) {
                this.scene.babies.splice(this.scene.babies.indexOf(this), 1);
                this.scene.babiesDropped += 1;
                if (this.scene.n != babyStormLevel) {
                    this.scene.sounds["dropped"].play();
                }
            }
            
            if (this.x + this.width < 0 || this.x > cWidth) {
                this.scene.babies.splice(this.scene.babies.indexOf(this), 1);
                this.scene.babiesCaught += 1;
            }
        } else {
            if (this.y > cHeight + this.height*2) {
                this.scene.babies.splice(this.scene.babies.indexOf(this), 1);
            }
        }
    }

    this.oepnParachute = function() {
        this.parachute = new Parachute(this);
        this.isParachuted = true;
    }
}