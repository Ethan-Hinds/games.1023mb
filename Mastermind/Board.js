function Board() {

    this.init = function() {
        this.rowsN = 10;
        this.colsN = 4;

        this.rowHeight = 55;
        this.colWidth = 70;

        this.rows = new Array(this.rowsN);

        this.width = this.colsN * this.colWidth;
        this.height = this.rowHeight*(this.rowsN + 1);
        this.x = (width - this.width)/2 - 75;
        this.y = (height - this.height)/2;

        this.codeRow = new Row(this, -1);
        for (let i = 0; i < this.rowsN; i += 1) {
            this.rows[i] = new Row(this, i);
        }

        this.selected = this.codeRow.colorPegs[0];

        this.submitButton = new Button(this.x - 120, this.codeRow.y + 10, 100, this.codeRow.height - 20, this);

        this.possibilities = this.getAllPossibilities();

        this.currentRow = this.codeRow;
    }

    this.show = function() {
        fill("gray");
        rect(this.x, this.y, this.width, this.height);
        for (let row of this.rows) {
            row.show();
        }
        this.codeRow.show();
        this.submitButton.show();
    }

    this.highlightSelected = function() {
        stroke("red");
        strokeWeight(5);
        if (this.selected instanceof ColorPeg) {
            line(this.selected.x - 15, this.selected.y + 18, this.selected.x + 15, this.selected.y + 18);
        } else if (this.selected instanceof ResultPeg) {
            line(this.selected.x - 5, this.selected.y + 10, this.selected.x + 5, this.selected.y + 10);
        }
        strokeWeight(1);
        stroke("black");
    }

    this.codeSubmitted = function() {   
        this.currentRow = this.rows[this.rows.length - 1];
        this.moveButton(this.currentRow);
        this.makeGuess(this.currentRow);
        this.selected = this.currentRow.resultPegs[0];
    }

    this.moveButton = function(row) {
        this.submitButton.y = row.y + 10;
    }

    this.makeGuess = function(row) {
        let guess = random(this.possibilities);
        if (guess) {
            this.rows[this.currentRow.index].colorPegs[0].color = guess.colorPegs[0].color;
            this.rows[this.currentRow.index].colorPegs[1].color = guess.colorPegs[1].color;
            this.rows[this.currentRow.index].colorPegs[2].color = guess.colorPegs[2].color;
            this.rows[this.currentRow.index].colorPegs[3].color = guess.colorPegs[3].color;
        } else {
            status = "no solution";
        }
    }

    this.getAllPossibilities = function() {
        let p = [];
        for (let i = 0; i < colors.length; i += 1) {
            for (let j = 0; j < colors.length; j += 1) {
                for (let k = 0; k < colors.length; k += 1) {
                    for (let l = 0; l < colors.length; l += 1) {
                        let _colors = [colors[i], colors[j], colors[k], colors[l]];
                        let row = new Row(this, -2);
                        for (let m = 0; m < this.colsN; m += 1) {
                            row.colorPegs[m].color = _colors[m];
                        }
                        p.push(row);
                    }
                }
            }
        }
        return p;
    }

    this.resultPegsSubmitted = function() {

        let didWin = true;
        for (let resultPeg of this.currentRow.resultPegs) {
            if (resultPeg.color != "red") {
                didWin = false;
            }
        }
        if (didWin) {
            status = "win";
        }

        for (let i = this.possibilities.length - 1; i >= 0; i -= 1) {
            let a = {...this.currentRow};
            let b = {...this.possibilities[i]};
            let actualResults = [this.currentRow.resultPegs[0].color, this.currentRow.resultPegs[1].color, this.currentRow.resultPegs[2].color, this.currentRow.resultPegs[3].color];
            for (let j = actualResults.length - 1; j >= 0; j -= 1) {
                if (!actualResults[j]) {
                    actualResults.splice(j, 1);
                }
            }
            if (!arraysEqual(sort(this.compareRows(a, b)), sort(actualResults))) {
                this.possibilities.splice(i, 1);
            }
        }
        this.currentRow = this.rows[this.currentRow.index - 1];
        this.moveButton(this.currentRow);
        this.makeGuess(this.currentRow);
        this.selected = this.currentRow.resultPegs[0];
    }

    this.compareRows = function(a, b) {
        let resultPegs = [];
        let row1 = this.duplicateRow(a);
        let row2 = this.duplicateRow(b);
        for (let i = 0; i < row1.colorPegs.length; i += 1) {
            if (row1.colorPegs[i].color == row2.colorPegs[i].color) {
                resultPegs.push("red");
                row2.colorPegs[i].wasCompared = true;
                row1.colorPegs[i].wasCompared = true;
            }
        }

        for (let i = 0; i < row1.colorPegs.length; i += 1) {
            for (let j = 0; j < row2.colorPegs.length; j += 1) {
                if (row1.colorPegs[i].color == row2.colorPegs[j].color && i != j && !row1.colorPegs[i].wasCompared && !row2.colorPegs[j].wasCompared) {
                    resultPegs.push("white");
                    row1.colorPegs[i].wasCompared = true;
                    row2.colorPegs[j].wasCompared = true;
                }
            }
        }
        return resultPegs;
    }

    this.duplicateRow = function(row) {
        let newRow = new Row(this, row.index);
        for (let i = 0; i < row.colorPegs.length; i += 1) {
            let newColorPeg = new ColorPeg(newRow, i);
            newColorPeg.color = row.colorPegs[i].color;
            newRow.colorPegs[i] = newColorPeg;
        }
        return newRow;
    }

}