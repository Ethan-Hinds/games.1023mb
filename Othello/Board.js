class Board {
    constructor(gridN, size) {
        this.gridN = gridN;
        this.size = size;

        this.grid = new Array(this.gridN);
        for (let r = 0; r < this.gridN; r += 1) {
            this.grid[r] = [];
            for (let c = 0; c < this.gridN; c += 1) {
                this.grid[r][c] = new Square(r, c, this.size/gridN);
            }
        }
        this.grid[3][3].setColor("white");
        this.grid[3][4].setColor("black");
        this.grid[4][3].setColor("black");
        this.grid[4][4].setColor("white");

        this.moves = {};
        this.computerSquare;
    }
    
    show() {
        for (let r of this.grid) {
            for (let square of r) {
                let fillColor = `${square.row},${square.col}` in this.moves ? "#aaffaa" : undefined;
                if (square === this.computerSquare) {
                    fillColor = "red";
                }
                square.show(fillColor);
            }
        }
    }

    placePiece(square) {
        square.setColor(turn);
        for (let _square of this.moves[`${square.row},${square.col}`]) {
            _square.flip();
        }
    }

    getPossibleMoves() {
        this.moves = {};
        let oppColor = turn == "white" ? "black" : "white";
        for (let _r of this.grid) {
            for (let square of _r) {
                if (!square.color) {
                    let dirs = [[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
                    if (square.row == this.gridN - 1) {
                        for (let i = dirs.length - 1; i >= 0; i -= 1) {
                            if (dirs[i][0] == 1) {
                                dirs.splice(i, 1);
                            }
                        }
                    }
                    if (square.row == 0) {
                        for (let i = dirs.length - 1; i >= 0; i -= 1) {
                            if (dirs[i][0] == -1) {
                                dirs.splice(i, 1);
                            }
                        }
                    }
                    if (square.col == this.gridN - 1) {
                        for (let i = dirs.length - 1; i >= 0; i -= 1) {
                            if (dirs[i][1] == 1) {
                                dirs.splice(i, 1);
                            }
                        }
                    }
                    if (square.col == 0) {
                        for (let i = dirs.length - 1; i >= 0; i -= 1) {
                            if (dirs[i][1] == -1) {
                                dirs.splice(i, 1);
                            }
                        }
                    }

                    let flipped = [];
                    for (let dir of dirs) {
                        let r = square.row;
                        let c = square.col;
                        let toFlip = [];
                        let found = false;

                        while (r >= 0 && r < this.gridN && c >= 0 && c < this.gridN) {
                            r += dir[0];
                            c += dir[1];
                            if (r < 0 || r >= this.gridN || c < 0 || c >= this.gridN) {
                                break;
                            }
                            if (this.grid[r][c].color == oppColor) {
                                toFlip.push(this.grid[r][c]);
                            } else if (this.grid[r][c].color == turn) {
                                found = true;
                                break;
                            } else if (!this.grid[r][c].color) {
                                break;
                            }
                        }
                        if (found) {
                            flipped = flipped.concat(toFlip);
                        }
                    }
                    if (flipped.length > 0) {
                        this.moves[`${square.row},${square.col}`] = flipped;
                    }
                }
            }
        }
    }

    computerMove() {
        let maxFlips = 0;
        let square;
        for (let key in this.moves) {
            if (this.moves[key].length > maxFlips) {
                let r = key.split(",")[0];
                let c = key.split(",")[1];
                square = this.grid[r][c];
                maxFlips = this.moves[key].length;
            }
        }
        this.computerSquare = square;
        setTimeout(() => {
            board.placePiece(square, turn, true);
            turn = turn == "white" ? "black" : "white";
            board.getPossibleMoves();
            this.computerSquare = undefined;
        }, 2000);
    }
}