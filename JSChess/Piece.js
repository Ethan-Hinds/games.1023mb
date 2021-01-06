function Piece(row, col, type, color, points, image) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.color = color;
    this.image = image;
    this.points = points;
    this.numberOfMoves = 0;


    this.update = function() {
        if (animating[0] != this) {
            this.x = this.col * squareSize;
            this.y = this.row * squareSize;
        }
    }

    this.show = function() {
        if (this.image) {
            drawPiece(this); 
        }
    }

    this.move = function(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    this.calculateLegalMoves = function(checkForChecks) {
        let possibleSquares = [];
        switch (this.type) {
            case "rook":
                for (let r = this.row - 1; r >= 0; r -= 1) {
                    let atSquare = pieceAtSquare(r, this.col);
                    if (atSquare == null) {
                        possibleSquares.push([r, this.col]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([r, this.col]);
                        break;
                    } else {
                        break;
                    }
                }

                for (let r = this.row + 1; r < 8; r += 1) {
                    let atSquare = pieceAtSquare(r, this.col);
                    if (atSquare == null) {
                        possibleSquares.push([r, this.col]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([r, this.col]);
                        break;
                    } else {
                        break;
                    }
                }

                for (let c = this.col - 1; c >= 0; c -= 1) {
                    let atSquare = pieceAtSquare(this.row, c);
                    if (atSquare == null) {
                        possibleSquares.push([this.row, c]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([this.row, c]);
                        break;
                    } else {
                        break;
                    }
                }

                for (let c = this.col + 1; c < 8; c += 1) {
                    let atSquare = pieceAtSquare(this.row, c);
                    if (atSquare == null) {
                        possibleSquares.push([this.row, c]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([this.row, c]);
                        break;
                    } else {
                        break;
                    }
                }
                break;
            case "knight":
                for (let i = 0; i < 4; i += 1) {
                    for (let j = 0; j < 4; j += 1) {
                        let dr; let dc;
                        if (i == 0) { dr = -2;
                        } else if (i == 1) { dr = -1;
                        } else if (i == 2) { dr = 1;
                        } else { dr = 2;}

                        if (j == 0) { dc = -2;
                        } else if (j == 1) { dc = -1;
                        } else if (j == 2) { dc = 1;
                        } else { dc = 2;}

                        let atSquare = pieceAtSquare(this.row + dr, this.col + dc);
                        if ( (abs(dr) != abs(dc)) && (atSquare == null || atSquare.color != this.color) && inBounds(this.row + dr, this.col + dc)) {
                            possibleSquares.push([this.row + dr, this.col + dc]);
                        }
                    }
                }
                break;
            case "bishop":
                let r = this.row - 1;
                let c = this.col - 1;
                while (r >= 0 && c >= 0) {
                    let atSquare = pieceAtSquare(r,c);
                    if (atSquare == null) {
                        possibleSquares.push([r, c]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([r, c]);
                        break;
                    } else {
                        break;
                    }
                    r -= 1;
                    c -= 1;
                }
                r = this.row - 1;
                c = this.col + 1;
                while (r >= 0 && c < 8) {
                    let atSquare = pieceAtSquare(r,c);
                    if (atSquare == null) {
                        possibleSquares.push([r, c]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([r, c]);
                        break;
                    } else {
                        break;
                    }
                    r -= 1;
                    c += 1;
                }
                r = this.row + 1;
                c = this.col - 1;
                while (r < 8 && c >= 0) {
                    let atSquare = pieceAtSquare(r,c);
                    if (atSquare == null) {
                        possibleSquares.push([r, c]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([r, c]);
                        break;
                    } else {
                        break;
                    }
                    r += 1;
                    c -= 1;
                }
                r = this.row + 1;
                c = this.col + 1;
                while (r < 8 && c < 8) {
                    let atSquare = pieceAtSquare(r,c);
                    if (atSquare == null) {
                        possibleSquares.push([r, c]);
                    } else if (atSquare.color != this.color) {
                        possibleSquares.push([r, c]);
                        break;
                    } else {
                        break;
                    }
                    r += 1;
                    c += 1;
                }
                break;
            case "queen":
                pieces.push(new Piece(this.row, this.col, "rook", this.color, null));
                pieces.push(new Piece(this.row, this.col, "bishop", this.color, null));
                possibleSquares = concat(pieces[pieces.length - 2].calculateLegalMoves(), pieces[pieces.length - 1].calculateLegalMoves());
                pieces.splice(pieces.length - 2, 2);
                break;
            case "king":
                for (let dr = -1; dr <= 1; dr += 1) {
                    for (let dc = -1; dc <= 1; dc += 1) {
                        let atSquare = pieceAtSquare(this.row + dr, this.col + dc);
                        if ((atSquare == null || atSquare.color != this.color) && inBounds(this.row + dr, this.col + dc) && (dc != 0 || dr != 0)) {
                            possibleSquares.push([this.row + dr, this.col + dc]);
                        }
                    }
                }
                break;
            case "pawn":
                let dr = this.color == "white" ? -1 : 1;
                let homeRow = this.color == "white" ? 6 : 1;
                if (pieceAtSquare(this.row + dr, this.col) == null) {
                    possibleSquares.push([this.row + dr, this.col]);
                    if (this.row == homeRow && pieceAtSquare(this.row + 2*dr, this.col) == null) {
                        possibleSquares.push([this.row + 2*dr, this.col]);
                    }
                }
                let atSquare = pieceAtSquare(this.row + dr, this.col - 1);
                if (atSquare != null && atSquare.color != this.color) {
                    possibleSquares.push([this.row + dr, this.col - 1]);
                }
                atSquare = pieceAtSquare(this.row + dr, this.col + 1);
                if (atSquare != null && atSquare.color != this.color) {
                    possibleSquares.push([this.row + dr, this.col + 1]);
                }

                break;
        }

        if (checkForChecks) {

            let currentRow = this.row;
            let currentCol = this.col;


            for (let i = possibleSquares.length - 1; i >= 0; i -= 1) {
                let pieceAtMoveSquare = pieceAtSquare(possibleSquares[i][0], possibleSquares[i][1]);
                if (pieceAtMoveSquare) {
                    pieces.splice(pieces.indexOf(pieceAtMoveSquare), 1);
                }
                this.row = possibleSquares[i][0];
                this.col = possibleSquares[i][1];
                if (this.color == "white") {
                    if (isAttacked(whiteKing)) {
                        possibleSquares.splice(i, 1);
                    }
                } else {
                    if (isAttacked(blackKing)) {
                        possibleSquares.splice(i, 1);
                    }
                }
                if (pieceAtMoveSquare) {
                    pieces.push(pieceAtMoveSquare);
                }
            }
            this.row = currentRow;
            this.col = currentCol;
        }

        return possibleSquares;
    }


}