function Fireman(baby, babyFrame) {
    this.baby = baby;
    this.babyFrame = babyFrame;
    this.framesBefore = this.baby.scene.showFiremen ? 70 : 50;

    this.image = this.baby.scene.showFiremen ? firemanImages[0] : babyImages[0];

    this.x = this.baby.window.x + this.baby.window.width/2;
    this.y;
    this.width = 0;
    this.height = 0;

    this.shouldShow = function() {
        if (this.babyFrame - frameCount > 0 && this.babyFrame - frameCount < this.framesBefore) {
            return true;
        }
        return false;
    }

    this.show = function() {

        this.y = this.baby.window.y + this.baby.window.height - this.height/2;

        if (this.baby.scene.showFiremen) {
            if (this.width < this.baby.window.width && this.height < this.baby.window.height) {
                if (this.baby.scene.n != timeWarpLevel) {
                    this.width += this.image.width*0.005;
                    this.height += this.image.height*0.005;
                } else {
                    this.width += this.image.width*0.015;
                    this.height += this.image.height*0.015;
                }
            }
        } else {
            if (this.width < this.baby.width && this.height < this.baby.height) {
                this.width += this.image.width*0.005;
                this.height += this.image.height*0.005;
            }
        }
        image(this.image, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }



}