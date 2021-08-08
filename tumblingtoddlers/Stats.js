function Stats() {
    this.init = function() {

        this.backgroundColor = color(0, 0, 128);

        let t = "";
        let str;
        str = "Total Babies Caught";
        if (str in localStorage) {
            t += `${str}: ${localStorage.getItem(str)}\n\n`;
        }

        str = "Total Babies Dropped";
        if (str in localStorage) {
            t += `${str}: ${localStorage.getItem(str)}\n\n`;
        }

        str = "Average Percentage";
        if (str in localStorage) {
            t += `${str}: ${parseFloat(localStorage.getItem(str)*100).toFixed(1)}%\n\n`;
        }

        str = "Trampolines Broken";
        if (str in localStorage) {
            t += `${str}: ${localStorage.getItem(str)}\n\n`;
        }

        str = "Games Played";
        if (str in localStorage) {
            t += `${str}: ${localStorage.getItem(str)}\n\n`;
        }

        str = "Total Time Played";
        if (str in localStorage) {
            t += `${str}: ${parseFloat(localStorage.getItem(str)).toFixed(1)} minutes\n\n`;
        }

        this.text = {
            "text": t,
            "x": 20,
            "y": 20,
            "textSize": 24,
            "fill": "white",
        }

        let w = 150;
        let h = w * 150/604;
        this.homeSceneButton = new SceneButton(20, cHeight - h - 20, w, h, sceneButtonImages["home"], new Home());

        this.baby = new function() {
            this.imageIndex = 0;
            this.image = babyImages[0];
            this.width = cWidth / 7;
            this.x = cWidth - 3*this.width;
            this.height = this.width * this.image.height / this.image.width;
            this.y = -this.height;
            this.show = function() {
                if (frameCount % 5 == 0) {
                    this.image = babyImages[this.imageIndex];
                    this.imageIndex = (this.imageIndex + 1) % babyImages.length;
                }
                image(this.image, this.x, this.y, this.width, this.height);
            }
            this.move = function() {
                this.y += min((cHeight/2 - this.height/2 - this.y) * 0.02, 3);
            }
        };
        this.smallClouds = [];
        this.bigClouds = [];

        this.nextCloudFrame;

        this.createCloud();
    }

    this.createCloud = function() {
        let x = random(cWidth * 0.25, cWidth * 0.90);
        let scale = random(0.2, 0.4);
        if (scale > 0.3) {
            this.bigClouds.push(new Cloud(x, scale));
        } else {
            this.smallClouds.push(new Cloud(x, scale));
        }
        this.nextCloudFrame = frameCount + floor(random(2, 80));
    }

    this.show = function() {

        this.homeSceneButton.show();

        for (let cloud of this.smallClouds) {
            cloud.show();
            cloud.move();
            if (cloud.isAboveScreen()) {
                this.smallClouds.splice(this.smallClouds.indexOf(cloud), 1);
            }
        }

        this.baby.show();
        this.baby.move();

        for (let cloud of this.bigClouds) {
            cloud.show();
            cloud.move();
            if (cloud.isAboveScreen()) {
                this.bigClouds.splice(this.bigClouds.indexOf(cloud), 1);
            }
        }

        if (frameCount == this.nextCloudFrame) {
            this.createCloud();
        }

        fill(this.text.fill);
        textSize(this.text.textSize);
        textAlign(LEFT, TOP);
        text(this.text.text, this.text.x, this.text.y);
    }
}