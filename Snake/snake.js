function Snake() {
    this.parts = parts;
    this.direction;

    this.row;
    this.col;

    this.update = function() {
        this.row = parts[0].row;
        this.col = parts[0].col;
    }

    this.swap = function(list, i, j) {
        holder = list[i];
        list[i] = list[j];
        list[j] = holder;
    }

    this.move = function() {
        for (let i = this.parts.length - 1; i > 0; i -= 1) {
            parts[i].row = parts[i - 1].row;
            parts[i].col = parts[i - 1].col;
        }

        switch(this.direction) {
            case "up":
                parts[0].row -= 1;
                break;
            case "left":
                parts[0].col -= 1;
                break;
            case "down":
                parts[0].row += 1;
                break;
            case "right":
                parts[0].col += 1;
                break;
        }
    }

    this.calculateDirection = function() {
        for (let i = this.directionOrder.length - 1; i >=0; i -= 1) {
            let  direction = this.directionOrder[i];
            if (this.possibleDirections.indexOf(direction) == -1) {
                this.directionOrder.splice(this.directionOrder.indexOf(direction), 1);
            }
        }
        return this.directionOrder[0];
    }

    this.calculatePossibleDirections = function() {
        this.possibleDirections = ["up", "left", "right", "down"];
        this.allowedSquares = ["blank", "cookie"];


        if (this.allowedSquares.indexOf(squareType(this.row - 1, this.col)) == -1) {
            this.possibleDirections.splice(this.possibleDirections.indexOf("up"), 1);
        }
        if (this.allowedSquares.indexOf(squareType(this.row + 1, this.col)) == -1) {
            this.possibleDirections.splice(this.possibleDirections.indexOf("down"), 1);
        }
        if (this.allowedSquares.indexOf(squareType(this.row, this.col - 1)) == -1) {
            this.possibleDirections.splice(this.possibleDirections.indexOf("left"), 1);
        }
        if (this.allowedSquares.indexOf(squareType(this.row, this.col + 1)) == -1) {
            this.possibleDirections.splice(this.possibleDirections.indexOf("right"), 1);
        }
        return this.possibleDirections;
    }

    this.calculateDirectionOrder = function() {

        this.directionOrder = [];

        dr = cookie.row - this.row;
        dc = cookie.col - this.col;

        let nUp = blankNeighbors(this.row - 1, this.col);
        let nDown = blankNeighbors(this.row + 1, this.col);
        let nLeft = blankNeighbors(this.row, this.col - 1);
        let nRight = blankNeighbors(this.row, this.col + 1);

        if (dr == 0) {
            if (dc > 0) {
                this.directionOrder.push("right");
            } else {
                this.directionOrder.push("left");
            }
        } else if (dc == 0) {
            if (dr > 0) {
                this.directionOrder.push("down");
            } else {
                this.directionOrder.push("up");
            }
        } else {
            if (abs(dc) < abs(dr)) {
                // Prioritize column movement
                if (dc > 0) {
                    if (dr > 0) {
                        this.directionOrder.push("right");
                        this.directionOrder.push("down");
                    } else {
                        this.directionOrder.push("right");
                        this.directionOrder.push("up");
                    }
                } else {
                    if (dr > 0) {
                        this.directionOrder.push("left");
                        this.directionOrder.push("down");
                    } else {
                        this.directionOrder.push("left");
                        this.directionOrder.push("up");
                    }
                }
            } else {
                // Prioritize row movement
                if (dr > 0) {
                    if (dc > 0) {
                        this.directionOrder.push("down");
                        this.directionOrder.push("right");
                    } else {
                        this.directionOrder.push("down");
                        this.directionOrder.push("left");
                    }
                } else {
                    if (dc > 0) {
                        this.directionOrder.push("up");
                        this.directionOrder.push("right");
                    } else {
                        this.directionOrder.push("up");
                        this.directionOrder.push("left");
                    }
                }
            }
        }

        if (this.directionOrder.indexOf("up") == -1) {
            this.directionOrder.push("up");
        }
        if (this.directionOrder.indexOf("left") == -1) {
            this.directionOrder.push("left");
        }
        if (this.directionOrder.indexOf("right") == -1) {
            this.directionOrder.push("right");
        }
        if (this.directionOrder.indexOf("down") == -1) {
            this.directionOrder.push("down");
        }

        // Part 2

        /*
        this.nOrder = [];

        for (let i = 0; i < 4; i += 1) {
            if (this.directionOrder[i] == "up") {
                this.nOrder.push(nUp);
            } else if (this.directionOrder[i] == "right") {
                this.nOrder.push(nRight);
            } else if (this.directionOrder[i] == "down") {
                this.nOrder.push(nDown);
            } else if (this.directionOrder[i] == "left") {
                this.nOrder.push(nLeft);
            }
        }

        for (let i = 0; i < this.directionOrder.length - 1; i += 1) {
            for (let j = i + 1; j < this.directionOrder.length; j += 1) {
                if (this.nOrder[j] > this.nOrder[i] && this.nOrder[i] <= 1) {
                    this.swap(this.nOrder, j, i);
                    this.swap(this.directionOrder, j, i);
                }
            }
        }

        */

        return this.directionOrder;

    }
}