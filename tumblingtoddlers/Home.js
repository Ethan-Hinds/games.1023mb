function Home() {

    this.init = function() {

        this.backgroundColor = color(0, 0, 0);

        this.columns = [];
        this.numberOfColumns = 9;

        this.tumbling = new function() {
            this.image = titleImages[0],
            this.width = 500,
            this.height = this.width*this.image.height/this.image.width;
            this.x = -this.width;
            this.y = cHeight * 0.3 - this.height * 1.1;

            this.show = function() {
                image(this.image, this.x, this.y, this.width, this.height);
            },
            this.move = function() {
                if (cWidth/2 - this.x - this.width/2 > 1) {
                    this.x += (cWidth/2 - this.width/2 - this.x) * 0.025;
                } else {
                    this.x = cWidth/2 - this.width/2;
                }
            }
        }   

        this.toddlers = new function() {
            this.image = titleImages[1],
            this.width = 500,
            this.x = cWidth,
            this.height = this.width*this.image.height/this.image.width;
            this.y = cHeight * 0.3 - this.height * 1.1 + this.height + 20;
            this.show = function() {
                image(this.image, this.x, this.y, this.width, this.height);
            },
            this.move = function() {
                if (this.x + this.width/2 - cWidth/2 > 1) {
                    this.x -= (this.width/2 + this.x - cWidth/2) * 0.025;
                } else {
                    this.x = cWidth/2 - this.width/2;
                }
            }
        }
        
        for (let i = 0; i < this.numberOfColumns; i += 1) {
            let column = new Column(i*cWidth/this.numberOfColumns, cWidth/this.numberOfColumns, i);
            column.windows.push(new Window(column, cHeight * 0.1));
            this.columns.push(column);
        }

        let w = 300;
        this.levelSelectButton = new SceneButton(cWidth/2 - w - 20, cHeight/2 - w*294/907/2, w, w*294/907, sceneButtonImages["levels"], new LevelMenu());
        this.levelSelectButton.alpha = 0;

        this.statsButton = new SceneButton(cWidth/2 + 20, cHeight/2 - 0.5*w*146/737, w, w*146/737, sceneButtonImages["stats"], new Stats());
        this.statsButton.alpha = 0;

        this.creditsSceneButton = {
            "text": "Credits",
            "x": 8,
            "y": cHeight - 24,
            "textSize": 20,
            "fill": "white",
            "highlightedFill": "green",
            "width": 60,
            "height": 20,
            "isHighlighted": false,
            inBounds: function(x, y) {
                if (this.x < x && this.x + this.width > x) {
                    if (this.y < y && this.y + this.height > y) {
                        return true;
                    }
                }
            },
            show: function() {
                textSize(this.textSize);
                textAlign(LEFT, TOP);
                fill("black");
                text(this.text, this.x + 2, this.y + 2);
                if (this.isHighlighted) {
                    fill(this.highlightedFill);
                } else {
                    fill(this.fill);
                }
                text(this.text, this.x, this.y);
            }
        };
    }

    this.show = function() {
        for (let column of this.columns) {
            column.show();
        }
        this.tumbling.show();
        this.tumbling.move();

        this.toddlers.show();
        this.toddlers.move();

        if (this.levelSelectButton.alpha < 255) {
            this.levelSelectButton.alpha += 2
            this.statsButton.alpha += 2;
        }
        
        this.levelSelectButton.show();
        this.statsButton.show();

        this.creditsSceneButton.show();




    }

}