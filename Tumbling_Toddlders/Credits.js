function Credits() {
    this.init = function() {

        this.backgroundColor = color(0, 0, 128);
        this.trampolineSpeed = cWidth * 0.01;

        this.text = {
            "text": "Tumbling Toddlers Copyright © 2017 Cool Blue Room and Ethan Hinds. All rights reserved.\n\nMusic: \"Haywire,\" by Eino Toivanen, kongano.com.\nLicensed under Creative Commons: By Attribution 4.0 creativecommons.org/licenses/by/4.0. \n\nHall of the Mountain King Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0 License.\n\nOriginal baby image\nLicensed from Scratch under the Creative Commons Attribution-ShareAlike 2.0 license.\nhttps://creativecommons.org/licenses/by-sa/2.0/legalcode. Baby animated by Ethan Hinds.\nScratch is developed by the Lifelong Kindergarten Group at the MIT Media Lab.\nSee http://scratch.mit.edu",
            "x": 20,
            "y": 20,
            "textSize": 16,
            "fill": "white",
        }
        let w = 150;
        let h = w * 150/604;
        this.homeSceneButton = new SceneButton(20, cHeight - h - 20, w, h, sceneButtonImages["home"], new Home());
        this.baby.reset();
    }

    this.baby = new function(x) {
        this.imageIndex = 0;
        this.image = babyImages[0];
        this.width = cWidth / 10;
        this.x = x;
        this.height = this.width * this.image.height / this.image.width;
        this.y = -this.height;
        this.dy = 0;
        this.gravity = 0.25;
        this.rotation = 0;
        this.angularVelocity = 0;
        this.hasBounced = false;
        this.show = function() {
            if (frameCount % 5 == 0) {
                this.image = babyImages[this.imageIndex];
                this.imageIndex = (this.imageIndex + 1) % babyImages.length;
            }
            push();
            translate(this.x + this.width/2, this.y + this.height/2);
            rotate(this.rotation);
            image(this.image, -this.width/2, -this.height/2, this.width, this.height);
            pop();
        }
        this.move = function() {
            this.x += this.dx;
            this.y += this.dy;
            this.dy += this.gravity;
            this.rotation += this.angularVelocity;
        }
        this.reset = function() {
            this.x = random(cWidth * 0.3, cWidth * 0.85);
            this.y = -this.height;
            this.dx = 0;
            this.dy = -2;
            this.rotation = 0;
            this.angularVelocity = 0;
            this.hasBounced = false;
        }
        this.bounce = function() {
            this.hasBounced = true;
            this.dy = -abs(this.dy) * 0.9;
            if (this.x + this.width/2 > cWidth / 2) {
                this.dx = 8;
                this.angularVelocity = 0.15;
            } else {
                this.dx = -8;
                this.angularVelocity = -0.15;
            }
        }
    };
    this.trampoline = new Trampoline(cWidth/8, false, this);
    this.trampoline.target = this.baby;


    this.show = function() {

        this.homeSceneButton.show();

        fill(this.text.fill);
        textSize(this.text.textSize);
        textAlign(LEFT, TOP);
        text(this.text.text, this.text.x, this.text.y);

        this.baby.show();
        this.baby.move();

        if (this.baby.x < -this.baby.width || this.baby.x > cWidth || this.baby.y > cHeight + this.baby.height) {
            this.baby.reset();
        } else {
            if (!this.baby.hasBounced && this.baby.y + this.baby.height >= this.trampoline.y) {
                this.baby.bounce();
            }
        }
        this.trampoline.show();
        if (!this.baby.hasBounced) {
            this.trampoline.moveAI();
        }
    }
}