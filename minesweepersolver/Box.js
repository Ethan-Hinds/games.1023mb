function Box(row, col, isMine) {
    this.row = row;
    this.col = col;

    this.x = this.col * boxSize;
    this.y = this.row * boxSize;

    this.width = boxSize;
    this.height = boxSize;

    this.mineNeighbors = [];
    this.neighbors = [];

    this.number = -1;

    this.isMine = isMine;

    this.isOpenned = false;
    this.isFlagged = false;

    this.show = function() {
        if (this.isOpenned) {
            fill("lightgray");
        } else {
            fill("gray");
        }
        stroke(0);
        rect(this.x, this.y, this.width, this.height);
        if (this.number != -1 && this.number != 0) {
            textAlign(CENTER, CENTER);
            textSize(16);
            fill(0);
            stroke(0)
            text(this.number, this.x + this.width/2, this.y + this.height/2);
        }

        if (!gameOver) {
            if (this.isFlagged) {
                fill("black");
                noStroke();
                rect(this.x + 10, this.y + this.height - 5, this.width - 20, 3);
                rect(this.x + 13, this.y + this.height - 8, this.width - 26, 3);
                rect(this.x + this.width/2- 2, this.y + this.height/2, 4, this.height - 5 - this.height/2);
                fill("red");
                rect(this.x + this.width/2 - 5, this.y + this.height/2 - 5, 7, 7);
            }
        } else {
            if (this.isMine) {
                fill("black");
                ellipse(this.x + this.width/2, this.y + this.height/2, this.width/4, this.height/4);
            }
        }
    }

    this.open = function() {
        this.isOpenned = true;
        this.isFlagged = false;
        if (this.isMine) {
            if (anyOpened) {
                gameOver = true;
            } else {
                this.isMine = false;
                this.open();
            }
        } else {
            this.number = this.mineNeighbors.length;
            if (this.number == 0) {
                for (let b of this.neighbors) {
                    if (!b.isOpenned) {
                        b.open();
                    }
                }
            }
        }
    }

    this.getNeighbors = function() {

        let dr = [0, -1, -1, -1, 0, 1, 1, 1];
        let dc = [-1, -1, 0, 1, 1, 1, 0, -1];

        for (let i = 0; i <  dr.length; i += 1) {
            let b = getBoxAt(this.row + dr[i], this.col + dc[i]);
            if (b) {
                this.neighbors.push(b);
                if (b.isMine) {
                    this.mineNeighbors.push(b);
                }
            }
        }
    }
}