class Square {
    constructor(row, col, size) {
        this.row = row;
        this.col = col;
        this.size = size;

        this.x = this.col * this.size;
        this.y = this.row * this.size;

        this.neighbors = [];

        this.fillColor;

        this.isWalkable = true;

        this.gScore; // Distance from start
        this.hScore; // Distance from end
        this.fScore; // g + h

        this.parent;
    }

    show() {
        stroke(0);
        if (this.fillColor) {
            fill(this.fillColor);
        } else {
            noFill();
        }
        rect(this.x, this.y, this.size-1, this.size-1);

        // fill(0);
        // if (this.hScore != undefined) {
        //     text(this.hScore, this.x + this.size*3/4, this.y + this.size*1/4);
        // }

        // if (this.gScore != undefined) {
        //     text(this.gScore, this.x + this.size*1/4, this.y + this.size*1/4);
        // }

        // if (this.hScore != undefined) {
        //     text(this.hScore, this.x + this.size*1/2, this.y + this.size*1/2);
        // }
    }

    calculateNeighbors() {

        // Allows for diagonal movement

        let dr = [-1, -1, -1, 0, 1, 1, 1, 0];
        let dc = [-1, 0, 1, 1, 1, 0, -1, -1];

        for (let i = 0; i < 8; i += 1) {
            let r = this.row + dr[i];
            let c = this.col + dc[i];

            if (r >= 0 && r < rows && c >= 0 && c < cols) {
                this.neighbors.push(squares[r][c]);
            }
        }

        // Prevent the path from going through diagonals that should be blocked

        if (this.neighbors[5] && this.neighbors[7] && !this.neighbors[5].isWalkable && !this.neighbors[7].isWalkable) {
            this.neighbors.splice(6, 1);
        }

        if (this.neighbors[3] && this.neighbors[5] && !this.neighbors[3].isWalkable && !this.neighbors[5].isWalkable) {
            this.neighbors.splice(4, 1);
        }

        if (this.neighbors[1] && this.neighbors[3] && !this.neighbors[1].isWalkable && !this.neighbors[3].isWalkable) {
            this.neighbors.splice(2, 1);
        }

        if (this.neighbors[1] && this.neighbors[7] && !this.neighbors[1].isWalkable && !this.neighbors[7].isWalkable) {
            this.neighbors.splice(0, 1);
        }

        // Does not allow for diagonal movement

        // let dr = [-1, 0, 1, 0];
        // let dc = [0, 1, 0, -1];

        // for (let i = 0; i < 8; i += 1) {
        //     let r = this.row + dr[i];
        //     let c = this.col + dc[i];

        //     if (r >= 0 && r < rows && c >= 0 && c < cols) {
        //         this.neighbors.push(squares[r][c]);
        //     }
        // }
    }

    calculateScore() {

        let diag;
        let rowDist;
        let colDist;

        if (openSquares.indexOf(this) < 0) {
            this.parent = current;
        }

        diag = min(abs(this.row - goal.row), abs(this.col - goal.col));
        rowDist = abs(this.row - goal.row) - diag;
        colDist = abs(this.col - goal.col) - diag;

        let hScore = 14 *diag + 10*rowDist + 10*colDist;

        if (this.hScore != undefined) {
            this.hScore = min(this.hScore, hScore);
        } else {
            this.hScore = hScore;
        }

        diag = min(abs(this.row - current.row), abs(this.col - current.col));
        rowDist = abs(this.row - current.row) - diag;
        colDist = abs(this.col - current.col) - diag;

        let gScore = 14 *diag + 10*rowDist + 10*colDist;

        if (this.gScore != undefined) {
            if (gScore < this.gScore) {
                this.parent = current;
                this.gScore = gScore;
            }
        } else {
            this.gScore = gScore;
        }

        this.fScore = this.gScore + this.hScore;
    }

    isInBounds(x, y) {
        return x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size;
    }

    addToOpen() {
        openSquares.push(this);
        this.fillColor = "#0000ff";
    }

    removeFromOpen() {
        openSquares.splice(openSquares.indexOf(this), 1);
    }

    addToClosed() {
        closedSquares.push(this);
        this.fillColor = "red";
    }

    setUnwalkable() {
        this.isWalkable = false;
        this.fillColor = "black";
    }

    setWalkable() {
        this.isWalkable = true;
        this.fillColor = undefined;
    }
}