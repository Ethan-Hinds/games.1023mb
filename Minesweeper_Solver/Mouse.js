function Mouse(x, y, isShowing) {
    this.x = x;
    this.y = y;
    this.isShowing = isShowing;

    this.goal = box;
    this.action = undefined;

    this.show = function() {
        image(mouseImage, this.x, this.y);
    }

    this.setGoal = function(box, action) {
        this.goal = box;
        this.action = action;
    }

    this.move = function() {
        this.x += (this.goal.x + boxSize / 2 - this.x) / 10;
        this.y += (this.goal.y + boxSize / 2- this.y) / 10;
        if (abs(this.goal.x + boxSize / 2- this.x) < 2 && abs(this.goal.y + boxSize / 2- this.y) < 2) {
            this.x = this.goal.x;
            this.y = this.goal.y;
            if (this.action == "flag") {
                this.goal.isFlagged = true;
                minesRemaining -= 1;
            } else if (this.action == "open") {
                this.goal.open();
                if (!anyOpened) {
                    anyOpened = true;
                }
            }
            this.action = undefined;
            if (!gameOver) {
                findMove();
            }
        }
    }
}