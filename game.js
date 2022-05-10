import { displayBoard } from "./chessBoard.js";
import {Board} from "./Square.js";
import {King, Knight, Pawn, Rook, Queen, Bishop} from "./chessPieces.js";

displayBoard();

function newGame() {
    let board = new Board();
    board.setSquares();

    for(let i = 0; i < 8; i++) {
        board.setPiece(i, 6, new Pawn('white', i, 6));
        board.setPiece(i, 1, new Pawn('black', i, 1));
    }


    board.setPiece(2, 7, new Bishop('white', 2, 7));
    board.setPiece(5, 7, new Bishop('white', 5, 7));
    board.setPiece(2, 0, new Bishop('black', 2, 0));
    board.setPiece(5, 0, new Bishop('black', 5, 0));

    board.setPiece(0, 7, new Rook('white', 0, 7));
    board.setPiece(7, 7, new Rook('white', 7, 7));
    board.setPiece(0, 0, new Rook('black', 0, 0));
    board.setPiece(7, 0, new Rook('black', 7, 0));

    board.setPiece(1, 7, new Knight('white', 1, 7));
    board.setPiece(6, 7, new Knight('white', 6, 7));
    board.setPiece(1, 0, new Knight('black', 1, 0));
    board.setPiece(6, 0, new Knight('black', 6, 0));

    board.setPiece(3, 7, new King('white', 3, 7));
    board.setPiece(4, 0, new King('black', 4, 0));

    board.setPiece(4, 7, new Queen('white', 4, 7));
    board.setPiece(3, 0, new Queen('black', 3, 0));

    displayPiecesStart(board);
    createUserInteraction(board);
    

    return board;
}

function displayPiecesStart(board) {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 8; j++) {
            board.getPiece(j, i).display(i, j);
        }
    }

    for (let i = 6; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board.getPiece(j, i).display(i, j);
        }
    }
}
let myboard = newGame();

function showOccupied(board) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board.checkSquare(i, j)) {
                let mySquare = document.getElementById('board').children.item(j).children.item(i);
                if ((i + j) % 2 == 0) {
                    //mySquare.style.filter = "brightness(80%)";
                }
                else {
                    mySquare.style.backgroundColor = 'gray';
                }
            }
        }
    }
}

function createUserInteraction(board) {
    for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let mySquare = document.getElementById('board').children.item(i).children.item(j);
                mySquare.addEventListener('click', () => {                    
                    let validMoves = board.getPiece(j,i).getValidMoves(board);  
                    console.log(validMoves);
                })
            }
    }
}

showOccupied(myboard);

