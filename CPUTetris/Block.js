function Block(piece, relRow, relCol) {
    this.piece = piece;
    this.relRow = relRow;
    this.relCol = relCol;
    this.row = this.piece.row + relRow;
    this.col = this.piece.col + relCol;

    this.cell = cells[this.row][this.col];
    this.cell.block = this;

    this.show = function() {
        fill(this.piece.color);
        rect(this.col * cellSize, this.row * cellSize, cellSize, cellSize);
    }

    this.update = function() {
        this.row = this.piece.row + relRow;
        this.col = this.piece.col + relCol;

        this.cell.block = undefined;
        this.cell = cells[this.row][this.col];
        this.cell.block = this;
    }

    this.delete = function() {
        this.cell.block = undefined;
        deadBlocks.splice(deadBlocks.indexOf(this), 1);
    }

    this.hasEmptyCellBelow = function() {
        
        for (let r = this.row + 1; r < rows; r += 1) {
            if (cells[r][this.col].block == undefined) {
                return true;
            }
        }
        return false;


        // if (this.row == rows - 1) {
        //     return false;
        // }
        // if (cells[this.row + 1][this.col].block == undefined) {
        //     return true;
        // }
        // return false;
    }
}