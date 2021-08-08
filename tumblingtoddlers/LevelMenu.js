function LevelMenu() {

    this.init = function() {

        status = "menu";

        this.backgroundColor = color(0, 0, 128);

        this.levelButtons = [];
        this.goToGameButton;
        this.selected;

        let buttonWidth = 50;
        let buttonHeight = 50;
        let leftMargin = 65;
        let horizontalSpacing = (cWidth - 2*leftMargin - buttonWidth)/9;
        for (let i = 1; i <= 10; i += 1) {
            this.levelButtons.push(new LevelButton(leftMargin + (i-1)*horizontalSpacing, 60, buttonWidth, buttonHeight, levels[i-1], this));
        }

        for (let i = 11; i <= levels.length; i += 1) {
            this.levelButtons.push(new LevelButton(leftMargin + (i-11)*horizontalSpacing, 160, buttonWidth, buttonHeight, levels[i-1], this));
        }

        this.selectButton(this.levelButtons[0]);

        this.goToHomeSceneButton = new SceneButton(10, 10, 50, 50, sceneButtonImages["homeIcon"], new Home());
    }

    this.show = function() {
        for (levelButton of this.levelButtons) {
            levelButton.show();
        }

        if (this.selected) {
            textAlign(CENTER, BOTTOM);
            textSize("30");
            fill("black");
            text(this.selected.level.description, cWidth/2 + 2, cHeight - 120 + 2);
            fill("white");
            text(this.selected.level.description, cWidth/2, cHeight - 120);
            this.goToGameButton.show();
        }

        this.goToHomeSceneButton.show();
    }

    this.selectButton = function(button) {
        this.selected = button;
        this.goToGameButton = new SceneButton(cWidth - 200, cHeight - 100, 166, 40, sceneButtonImages["play"], levels[scene.selected.level.n - 1])
    }
}