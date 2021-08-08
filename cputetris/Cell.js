function Cell(row, col) {
    this.row = row;
    this.col = col;

    this.cellBelow;

    this.block = undefined;

    this.getCellBelow = function() {
        if (this.row < rows - 1) {
            this.cellBelow = cells[this.row + 1][this.col];
        } else {
            this.cellBelow = undefined;
        }
    }
}