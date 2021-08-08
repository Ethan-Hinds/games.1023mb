class Board {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.squareSize = 150;
        this.turn = "X";

        this.grid = [["", "", ""],["", "", ""],["", "", ""]];
    }

    show() {
        stroke(175);
        line(this.x - this.squareSize*1.5, this.y - this.squareSize/2, this.x + this.squareSize*1.5, this.y - this.squareSize/2);
        line(this.x - this.squareSize*1.5, this.y + this.squareSize/2, this.x + this.squareSize*1.5, this.y + this.squareSize/2);
        line(this.x - this.squareSize/2, this.y - this.squareSize*1.5, this.x - this.squareSize/2, this.y + this.squareSize*1.5);
        line(this.x + this.squareSize/2, this.y - this.squareSize*1.5, this.x + this.squareSize/2, this.y + this.squareSize*1.5);

        for (let r = 0; r < this.grid.length; r += 1) {
            for (let c = 0; c < this.grid[r].length; c += 1) {
                let type = this.grid[r][c];
                if (type != "") {
                    if (type == "X") { fill("red")} else {fill("blue")};
                    noStroke();
                    text(this.grid[r][c], this.x - this.squareSize + this.squareSize*c, this.y - this.squareSize + this.squareSize*r);
                }
            }
        }
    }

    // Returns true if the game is over, otherwise returns false
    playMove(row, col) {
        this.grid[row][col] = this.turn;
        this.turn = this.turn == "X" ? "O" : "X";
        return this.checkStatus();
    }

    gameOver(winner) {
        if (winner == "X") {
            alert ("Computer wins!");
        } else if (winner == "O") {
            alert ("Player wins!");
        } else {
            alert ("Tie game!");
        }
    }

    // Returns true if the game is over, otherwise returns false
    checkStatus() {
        for (let r = 0; r < this.grid.length; r += 1) {
            if (this.grid[r][0] == this.grid[r][1] && this.grid[r][1] == this.grid[r][2] && this.grid[r][0] != "") {
                this.gameOver(this.grid[r][0]);
                return true;
            }
        }

        for (let c = 0; c < this.grid.length; c += 1) {
            if (this.grid[0][c] == this.grid[1][c] && this.grid[1][c] == this.grid[2][c] && this.grid[0][c] != "") {
                this.gameOver(this.grid[0][c]);
                return true;
            }
        }

        if (this.grid[0][0] == this.grid[1][1] && this.grid[1][1] == this.grid[2][2] && this.grid[0][0] != "") {
            this.gameOver(this.grid[0][0]);
            return true;
        }

        if (this.grid[0][2] == this.grid[1][1] && this.grid[1][1] == this.grid[2][0] && this.grid[0][2] != "") {
            this.gameOver(this.grid[0][2]);
            return true;
        }
        
        for (let r = 0; r < this.grid.length; r += 1) {
            for (let c = 0; c < this.grid[r].length; c += 1) {
                if (this.grid[r][c] == "") {
                    return false;
                }
            }
        }
        this.gameOver(undefined);
        return true;
    }

    computerMove() {
        let rows = [];
        let cols = [];
        let row;
        let col;
        let winPos = this.canWin("O");
        if (winPos) {
            this.playMove(winPos[0], winPos[1]);
        } else {
            for (let r = 0; r < this.grid.length; r += 1) {
                for (let c = 0; c < this.grid[r].length; c += 1) {
                    if (this.grid[r][c] == "") {
                        let newBoard = new Board();
                        for (let _r = 0; _r < this.grid.length; _r += 1) {
                            for (let _c = 0; _c < this.grid[_r].length; _c += 1) {
                                newBoard.grid[_r][_c] = this.grid[_r][_c];
                            }
                        }
                        newBoard.grid[r][c] = "O";
                        if (!newBoard.canWin("O")) {
                            rows.push(r);
                            cols.push(c);
                        } else {
                            print ("Avoiding: " + r + ", " + c)
                        }
                    }
                }
            }

            let playerWinMove = this.canWin("X");
            if (playerWinMove) {
                if (rows.indexOf(playerWinMove[0]) > 0 && cols.indexOf(playerWinMove[1]) > 0) {
                    rows.splice(rows.indexOf(playerWinMove[0]));
                    cols.splice(cols.indexOf(playerWinMove[1]));
                    print ("Don't block on: " + playerWinMove[0] + " " + playerWinMove[1])
                }
            }
            if (rows.length == 0) {
                do {
                    row = random([0, 1, 2]);
                    col = random([0, 1, 2]);
                } while (this.grid[row][col] != "");
            } else {
                let i = floor(random(rows.length));
                row = rows[i];
                col = cols[i];
            }
            this.playMove(row, col);
            return;
        }
    }

    canWin(turn) {
        for(let r = 0; r < this.grid.length; r += 1) {
            if (this.grid[r][0] == turn && this.grid[r][1] == turn && this.grid[r][2] == "") {
                return [r, 2];
            }
            if (this.grid[r][0] == turn && this.grid[r][1] == "" && this.grid[r][2] == turn) {
                return [r, 1];
            }
            if (this.grid[r][0] == "" && this.grid[r][1] == turn && this.grid[r][2] == turn) {
                return [r, 0];
            }
        }
        for(let c = 0; c < this.grid.length; c += 1) {
            if (this.grid[0][c] == turn && this.grid[1][c] == turn && this.grid[2][c] == "") {
                return [2, c];
            }
            if (this.grid[0][c] == turn && this.grid[1][c] == "" && this.grid[2][c] == turn) {
                return [1, c];
            }
            if (this.grid[0][c] == "" && this.grid[1][c] == turn && this.grid[2][c] == turn) {
                return [0, c];
            }
        }
        if (this.grid[0][0] == turn && this.grid[1][1] == turn && this.grid[2][2] == "") {
            return [2, 2];
        }
        if (this.grid[0][0] == turn && this.grid[1][1] == "" && this.grid[2][2] == turn) {
            return [1, 1];
        }
        if (this.grid[0][0] == "" && this.grid[1][1] == turn && this.grid[2][2] == turn) {
            return [0, 0];
        }
        
        if (this.grid[0][2] == turn && this.grid[1][1] == turn && this.grid[2][0] == "") {
            return [2, 0];
        }
        if (this.grid[0][2] == turn && this.grid[1][1] == "" && this.grid[2][0] == turn) {
            return [1, 1];
        }
        if (this.grid[0][2] == "" && this.grid[1][1] == turn && this.grid[2][0] == turn) {
            return [0, 2];
        }
        return false;
    }
}