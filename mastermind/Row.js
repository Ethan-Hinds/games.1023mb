function Row(board, index) {
    this.board = board;
    this.index = index;

    this.width = this.board.width;
    this.height = this.board.rowHeight;
    this.x = this.board.x;
    this.y = this.board.y + this.height * (this.index + 1);

    this.colorPegs = new Array(this.board.colsN);
    this.resultPegs = new Array(this.board.colsN);


    for (let i = 0; i < this.colorPegs.length; i += 1) {
        this.colorPegs[i] = new ColorPeg(this, i);
        this.resultPegs[i] = new ResultPeg(this, i);
    }

    this.show = function() {
        line(this.board.x, this.y, this.board.x + this.board.width, this.y);
        for (let colorPeg of this.colorPegs) {
            colorPeg.show();
        }
        for (let resultPeg of this.resultPegs) {
            if (this.board.currentRow.index <= this.index && this.board.currentRow.index >= 0) {
                resultPeg.show();
            }
        }
    }
}