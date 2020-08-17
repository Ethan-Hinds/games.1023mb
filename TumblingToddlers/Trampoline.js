function Trampoline(width, isPlayer, scene) {
    this.width = width;
    this.isPlayer = isPlayer;
    this.target;
    this.scene = scene

    if (this.isPlayer || this.scene instanceof Credits) {
        this.images = trampolineImages;
    } else {
        this.images = aiTrampolineImages;
    }
    this.image = this.images[0];

    this.x = cWidth/2 - this.width/2;
    this.height = this.width * this.image.height/this.image.width;
    //this.height = 70;
    this.y = cHeight - this.height - 5;

    this.brokenFrame;
    this.brokenFrames = 100;

    this.show = function() {
        image(this.image, this.x, this.y, this.width, this.height);

        if (this.brokenFrame) {
            if (frameCount - this.brokenFrame >= this.brokenFrames) {
                this.brokenFrame = undefined;
                this.image = this.images[0];
            }
        }
    }

    this.movePlayer = function(dx) {
        if (!this.brokenFrame) {
            this.x += dx;
            if (this.x > cWidth) {
                this.x = -this.width;
            } else if (this.x < -this.width) {
                this.x = cWidth;
            }
        }
    }

    this.needsNewTarget = function() {
        return this.scene.babies.indexOf(this.target) < 0 || this.target.hasBounced;
    }

    this.moveAI = function() {
        if (this.x - this.target.x > 1.2*this.scene.trampolineSpeed) {
            this.movePlayer(-this.scene.trampolineSpeed);
        } else if (this.target.x - this.x > 1.2*this.scene.trampolineSpeed) {
            this.movePlayer(this.scene.trampolineSpeed);
        }
    }

    this.break = function() {
        this.brokenFrame = frameCount;
        this.image = this.images[1];
    }
}