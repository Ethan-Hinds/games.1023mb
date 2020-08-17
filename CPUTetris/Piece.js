function Piece(row, col, type) {
    this.row = row;
    this.col = col;
    this.type = type;

    this.blocks = [];

    this.orientationIndex = 1;


    this.init = function() {
        switch (this.type) {
            case 0:
                this.orientations = [
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                this.color = "red";
                break;
            case 1:
                this.orientations = [
                    [
                        [0, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 1],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 0, 1, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                this.color = "blue";
                break;
            case 2:
                this.orientations = [
                    [
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 1, 1],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                this.color = "green";
                break;
            case 3:
                this.orientations = [
                    [
                        [0, 1, 0, 0],
                        [1, 1, 1, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                this.color = "aqua";
                break;
            case 4:
                this.orientations = [
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 1, 0],
                        [0, 1, 1, 0],
                        [0, 1, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [1, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                this.color = "yellow";
                break;
            case 5:
                this.orientations = [
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 1, 1, 0],
                        [1, 1, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                this.color = "purple";
                break;
            case 6:
                this.orientations = [
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    [
                        [0, 0, 0, 0],
                        [0, 1, 1, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ]
                ];
                this.color = "orange";
                break;
        }
    }

    this.canRotate = function(dir) {
        let testOrientationIndex = (this.orientationIndex + dir) % 4;
        if (testOrientationIndex < 0) {
            testOrientationIndex = 3;
        }
        let testOrientation = this.orientations[testOrientationIndex];
        for (let r = 0; r < testOrientation.length; r += 1) {
            for (let c = 0; c < testOrientation[r].length; c += 1) {
                if (testOrientation[r][c] == 1) {
                    if (this.row + r >= rows || this.row + r < 0 || this.col + c < 0 || this.col + c >= cols) {
                        return false;
                    }
                    if (cells[this.row + r][this.col + c].block != undefined && cells[this.row + r][this.col + c].block.piece != this) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    this.rotate = function(dir) {
        this.orientationIndex = (this.orientationIndex + dir) % 4;
        if (this.orientationIndex < 0) {
            this.orientationIndex = 3;
        }
        this.updateBlocks();
    }

    this.canMove = function(dir) {
        for (let block of this.blocks) {
            if (block.row + dir[0] >= rows) {
                return false;
            }
            if (!cells[block.row + dir[0]][block.col + dir[1]] || (cells[block.row + dir[0]][block.col + dir[1]].block != undefined && cells[block.row + dir[0]][block.col + dir[1]].block.piece != this)) {
                return false;
            }
        }
        return true;
    }

    this.move = function(dir) {
        this.row += dir[0];
        this.col += dir[1];
        this.updateBlocks();
    }

    this.setPosition = function(row, col, orientationIndex) {
        this.row = row;
        this.col = col;
        this.orientationIndex = orientationIndex;
        this.updateBlocks();
    }

    this.updateBlocks = function() {
        for (let block of this.blocks) {
            block.cell.block = undefined;
            block.row = this.row + block.relRow;
            block.col = this.col + block.relCol;
        }

        this.blocks = [];
        for (let r = 0; r < this.orientations[this.orientationIndex].length; r += 1) {
            for (let c = 0; c < this.orientations[this.orientationIndex][r].length; c += 1) {
                if (this.orientations[this.orientationIndex][r][c] == 1) {
                    this.blocks.push(new Block(this, r, c));
                }
            }
        }
    }

    this.hardDrop = function(real) {
        while (this.canMove([1, 0])) {
            this.move([1, 0]);
        }
        if (real) {
            for (block of this.blocks) {
                deadBlocks.push(block);
            }
            createNewPiece();
            checkForFullRow();
        }
    }

    this.getscoreRow = function() {
        let sum = 0;
        for (let block of this.blocks) {
            sum += block.row;
        }
        return sum / this.blocks.length;
    }

    this.delete = function() {
        for (let block of this.blocks) {
            block.delete();
        }
    }

    this.findBestMove = function() {

        let bestCol;
        let bestOrientationIndex;
        let bestScore = -emptySeverity - this.orientations[this.orientationIndex].length;

        let currentRow = this.row;
        let currentCol = this.col;

        for (let turn = 0; turn < 10; turn += 1) {
            this.setPosition(currentRow, currentCol, this.orientationIndex);
            if (turn < 5) {
                if (this.canRotate(1)) {
                    this.rotate(1);
                }
            } else {
                if (this.canRotate(-1)) {
                    this.rotate(-1);
                }
            }
            while (this.canMove([0, -1])) {
                this.move([0, -1]);
            }

            while (this.canMove([0, 1])) {
                this.hardDrop(false);
                let score = this.getscoreRow();
                if (this.hasEmptyCellBelow()) {
                    score -= emptySeverity;
                }
                if (score > bestScore) {
                    bestCol = this.col;
                    bestOrientationIndex = this.orientationIndex;
                    bestScore = score;
                }
                this.setPosition(currentRow, this.col, this.orientationIndex);
                this.move([0, 1]);
            }
            this.hardDrop(false);
            let score = this.getscoreRow();
            if (this.hasEmptyCellBelow()) {
                score -= emptySeverity;
            }
            if (score > bestScore) {
                bestCol = this.col;
                bestOrientationIndex = this.orientationIndex;
                bestScore = score;
            }
            this.setPosition(currentRow, this.col, this.orientationIndex);
        }
        this.setPosition(currentRow, bestCol, bestOrientationIndex);
    }

    this.hasEmptyCellBelow = function() {
        for (let block of this.blocks) {
            if (block.hasEmptyCellBelow()) {
                return true;
            }
        }
        return false;
    }
}