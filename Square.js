export class Square {

    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.occupied = false;
        this.piece = null;
    }

    putPiece(piece) {
        this.piece = piece;
        this.occupied = true;
    }

    getPieceColour() {
        return this.piece.colour;
    }
}

export class Board{
    
    constructor() {
        this.myBoard = [];
        this.turnColour = 'white';
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

    getSquare(x, y) {
        return (this.myBoard[y*8 + x]);
    }

    getPiece(x, y) {
        return (this.myBoard[y * 8 + x].piece);
    }

    setPiece(x, y, piece) {
        this.myBoard[y * 8 + x].putPiece(piece);
    }

    removePiece(x, y) {
        this.myBoard[y * 8 + x].piece = null;
        this.myBoard[y * 8 + x].occupied = false;
    }

    checkSquare(x, y) {
        return (this.myBoard[y*8 + x].occupied);
    }

    displayBoard() {
        console.log(this.myBoard);
    }

    getTurn() {
        return this.turnColour;
    }

    changeTurn() {
        if (this.turnColour == 'white') {
            this.turnColour = 'black';
        }
        else if (this.turnColour == 'black') {
            this.turnColour = 'white';
        }
    }

}