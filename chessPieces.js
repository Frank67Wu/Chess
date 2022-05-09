const PI = Math.PI;

class Piece {

    constructor(colour, x, y) {
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.taken = false;
    }

    getColour() {
        return this.colour;
    }

    setColour(colour) {
        this.colour = colour
    }

    take() {
        this.taken = true;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class King extends Piece {

    constructor(colour, x, y) {
        super(colour, x, y);
    }

    getValidMoves(board) {
        let validArr = [];
        for (let i = this.x - 1; i <= this.x + 1; i++) {
            for (let j = this.y - 1; j <= this.y + 1; j++) {
                if ((i == this.x && j == this.y) || (i < 0) || (j < 0)) {
                    continue;
                }
                else if (board.myBoard[i * 8+j].occupied && board.myBoard[i * 8+j].getPiece().colour == this.colour) {
                    continue;
                }
                else {
                    validArr.push(board.myBoard[i * 8+j]);
                }
            }
        }
        return validArr;
    }
}

export class Knight extends Piece{

    constructor(colour, x, y) {
        super(colour, x, y);
    }

    getValidMoves(board) {
        let validArr = [];

        for (let i = PI; i <= 2 * PI; i += PI) {
            for (let j = PI; j <= 2 * PI; j+= PI) {
                let xcheck = Math.round(this.x + Math.cos(i) * 1);
                let ycheck = Math.round(this.y + Math.cos(j) * 2);
                if (xcheck >= 0 && xcheck < 8 && ycheck < 8 && ycheck >= 0) {
                    if (board.checkSquare(xcheck, ycheck) && board.getPiece(xcheck, ycheck) == this.colour) {
                        continue;
                    }
                    else {
                        validArr.push(board.getPiece(xcheck, ycheck));
                    }
                }
            }
        }

        for (let i = PI; i <= 2 * PI; i += PI) {
            for (let j = PI; j <= 2 * PI; j+= PI) {
                let xcheck = Math.round(this.x + Math.cos(i) * 2);
                let ycheck = Math.round(this.y + Math.cos(j) * 1);
                if (xcheck >= 0 && xcheck < 8 && ycheck < 8 && ycheck >= 0) {
                    if (board.checkSquare(xcheck, ycheck) && board.getPiece(xcheck, ycheck) == this.colour) {
                        continue;
                    }
                    else {
                        validArr.push(board.getPiece(xcheck, ycheck));
                    }
                }
            }
        }

        return validArr;

    }
}

export class Pawn extends Piece{

    constructor(colour, x, y) {
        super(colour, x, y);
    }

    getValidMoves(board) {
        let validArr = [];
        let direction = 0;
        if (this.colour == 'white') {
            direction = -1;
        }
        else {
            direction = 1;
        }
        
        if (!board.checkSquare(this.x, this.y + direction) || board.getPiece(this.x, this.y + direction).colour != this.colour) {
            validArr.push(board.getPiece(this.x, this.y + direction));
            console.log('1');
        }
        if (this.y == ((7 + direction) % 7) && (!board.checkSquare(this.x, this.y + 2 * direction) || board.getPiece(this.x, this.y + 2 * direction).colour != this.colour)) {
            validArr.push(board.getPiece(this.x, this.y + 2 * direction));
        }
        if (board.checkSquare(this.x + 1, this.y + direction) && board.getPiece(this.x + 1, this.y + direction).colour != this.colour) {
            validArr.push(board.getPiece(this.x + 1, this.y + direction));
        }
        if (board.checkSquare(this.x - 1, this.y + direction ) && board.getPiece(this.x - 1, this.y + direction).colour != this.colour) {
            validArr.push(board.getPiece(this.x - 1, this.y + direction));
        }

        return validArr;
    }
}   

function checkBottomLine(colour, x, y, board, arr) {
    y += 1;
    while (y <= 7 && !board.myBoard[y * 8 + x].occupied) {
        arr.push(board.myBoard[y * 8 + x]);
        y++;
    }
    if(y <= 0 && board.myBoard[y * 8 + x].getPiece().colour != colour) {
        arr.push(board.myBoard[y * 8 + x]);
    }
}

function checkTopLine(colour, x, y, board, arr) {
    y -= 1;
    while (y >= 0 && !board.myBoard[y * 8 + x].occupied) {
        arr.push(board.myBoard[y*8 + x]);
        y--;
    }

    if(y >= 0 && board.myBoard[y * 8 + x].getPiece().colour != colour) {
        arr.push(board.myBoard[y*8 + x]);
    }

}function checkRightLine(colour, x, y, board, arr) {
    x += 1;
    while (x <= 7 && !board.myBoard[y * 8 + x].occupied) {
        arr.push(board.myBoard[y*8 + x]);
        x++;
    }
    if(x <= 7 && board.myBoard[y * 8 + x].getPiece().colour != colour) {
        arr.push(board.myBoard[y*8 + x]);
    }

}function checkLeftLine(colour, x, y, board, arr) {
    x--;
    while (x >= 0 && !board.myBoard[y * 8 + x].occupied) {
        arr.push(board.myBoard[y*8 + x]);
        x--;
    }
    if(x >= 0 && board.myBoard[y * 8 + x].getPiece().colour != colour) {
        arr.push(board.myBoard[y*8 + x]);
    }
}

function checkTopLeft(colour, x, y, board, arr) {
    x--;
    y--;
    while (x >= 0 && y >= 0 && !board.checkSquare(x, y)) {
        arr.push(board.getPiece(x, y));
        x--;
        y--;
    }
    if (x >= 0 && y >= 0 && board.getPiece(x, y).colour != colour) {
        arr.push(board.getPiece(x, y));
    }
}

function checkTopRight(colour, x, y, board, arr) {
    x++;
    y--;
    while (x <= 7 && y >= 0 && !board.checkSquare(x, y)) {
        arr.push(board.getPiece(x, y));
        x++;
        y--;
    }
    if (x <= 7 && y >= 0 && board.getPiece(x, y).colour != colour) {
        arr.push(board.getPiece(x, y));
    }
}

function checkBottomLeft(colour, x, y, board, arr) {
    x--;
    y++;
    while (x >= 0 && y <= 7 && !board.checkSquare(x, y)) {
        arr.push(board.getPiece(x, y));
        x--;
        y++;
    }
    if (x >= 0 && y <= 7 && board.getPiece(x, y).colour != colour) {
        arr.push(board.getPiece(x, y));
    }
}

function checkBottomRight(colour, x, y, board, arr) {
    x++;
    y++;
    while (x <= 7 && y <= 7 && !board.checkSquare(x, y)) {
        arr.push(board.getPiece(x, y));
        x++;
        y++;
    }
    if (x <= 7 && y <= 7 && board.getPiece(x, y).colour != colour) {
        arr.push(board.getPiece(x, y));
    }
}

export class Rook extends Piece {
    constructor(colour, x, y) {
        super(colour, x, y);
    }

    getValidMoves(board) {
        let validArr = [];
        let curX = this.x;
        let curY = this.y;
        checkBottomLine(this.colour, this.x, this.y, board, validArr);
        checkTopLine(this.colour, this.x, this.y, board, validArr);
        checkLeftLine(this.colour, this.x, this.y, board, validArr);
        checkRightLine(this.colour, this.x, this.y, board, validArr);
        return validArr;
    }
}

export class Bishop extends Piece {

    constructor(colour, x, y) {
        super(colour, x, y);
    }

    getValidMoves() {
        let validArr = [];
        checkBottomLeft(this.colour, this.x, this.y, board, validArr);
        checkBottomRight(this.colour, this.x, this.y, board, validArr);
        checkTopLeft(this.colour, this.x, this.y, board, validArr);
        checkTopRight(this.colour, this.x, this.y, board, validArr);
    }
}

export class Queen extends Piece {

    constructor(colour, x, y) {
        super(colour, x, y);
    }

    getValidMoves(board) {
        let validArr = [];
        let curX = this.x;
        let curY = this.y;
        checkBottomLine(this.colour, this.x, this.y, board, validArr);
        checkTopLine(this.colour, this.x, this.y, board, validArr);
        checkLeftLine(this.colour, this.x, this.y, board, validArr);
        checkRightLine(this.colour, this.x, this.y, board, validArr);
        checkBottomLeft(this.colour, this.x, this.y, board, validArr);
        checkBottomRight(this.colour, this.x, this.y, board, validArr);
        checkTopLeft(this.colour, this.x, this.y, board, validArr);
        checkTopRight(this.colour, this.x, this.y, board, validArr);
        return validArr;
    }
}
