import { displayBoard } from "./chessBoard.js";
import {Board} from "./Square.js";
import {King, Knight, Pawn, Rook, Queen, Bishop} from "./chessPieces.js";

displayBoard();

function newGame() {
    let board = new Board();
    board.setSquares();

    for(let i = 0; i < 8; i++) {
        board.setPiece(6, i, new Pawn('white', i, 6));
        board.setPiece(1, i, new Pawn('black', i, 1));
    }


    board.setPiece(7, 2, new Bishop('white', 2, 7));
    board.setPiece(7, 5, new Bishop('white', 5, 7));
    board.setPiece(0, 2, new Bishop('black', 2, 0));
    board.setPiece(0, 5, new Bishop('black', 5, 0));

    board.setPiece(7, 0, new Rook('white', 0, 7));
    board.setPiece(7, 7, new Rook('white', 7, 7));
    board.setPiece(0, 0, new Rook('black', 0, 0));
    board.setPiece(0, 7, new Rook('black', 7, 0));

    board.setPiece(7, 1, new Knight('white', 1, 7));
    board.setPiece(7, 6, new Knight('white', 6, 7));
    board.setPiece(0, 1, new Knight('black', 1, 0));
    board.setPiece(0, 6, new Knight('black', 6, 0));

    board.setPiece(7, 3, new King('white', 3, 7));
    board.setPiece(7, 4, new King('black', 4, 7));

    board.setPiece(0, 4, new Queen('white', 4, 0));
    board.setPiece(0, 3, new Queen('black', 3, 0));

    return board;
}

let myboard = newGame();

function showOccupied(board) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board.checkSquare(i, j)) {
                let mySquare = document.getElementById('board').children.item(i).children.item(j);
                if ((i + j) % 2 == 0) {
                    mySquare.style.filter = "brightness(80%)";
                }
                else {
                    mySquare.style.backgroundColor = 'gray';
                }
            }
        }
    }
}

showOccupied(myboard);