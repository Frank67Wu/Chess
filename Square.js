class Square {

    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.occupied = false;
    }

    getPiece() {
        return this.piece;
    }

    setPiece() {
        this.piece = piece;
    }
}

export default class Board{
    
    constructor() {
        this.myBoard = [];
    }

    setSquares() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let colour = (i + j) % 2;
                let square = new Square(j, i, colour);
                this.myBoard.push(square);
            }
            
        }
    }

    getPiece(x, y) {
        return (this.myBoard[y*8 + x]);
    }

    checkSquare(x, y) {
        return (this.myBoard[y*8 + x].occupied);
    }

}