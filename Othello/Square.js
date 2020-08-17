class Square {
    constructor(row, col, size) {
        this.row = row;
        this.col = col;
        this.size = size;

        this.width = this.size * 0.8;

        this.color;
        this.x = this.col * this.size;
        this.y = this.row * this.size;

        this.animationState = 0;
        this.displayColor;
    }

    show(gridColor) {
        if (gridColor) {
            fill(gridColor);
        } else {
            noFill();
        }
        stroke("black");
        rect(this.x, this.y, this.size, this.size);
        if (this.color) {
            fill(this.displayColor);
            ellipse(this.x + this.size/2, this.y + this.size/2, this.   width, this.size * 0.8);
        }

        if (this.animationState == 1) {
            this.width -= 3;
            if (this.width <= 0) {
                this.animationState = 2;
                this.displayColor = this.color;
            }
        }
        if (this.animationState == 2) {
            this.width += 3;
            if (this.width >= this.size * 0.8) {
                this.width = this.size * 0.8;
                this.animationState = 0;
            }
        }
    }

    isInBounds(x, y) {
        return x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size;
    }

    setColor(color) {
        this.color = color;
        this.displayColor = this.color;
    }

    flip() {
        this.displayColor = this.color;
        this.color = this.color == "white" ? "black" : "white";
        this.animationState = 1;
    }
}