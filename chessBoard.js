function addSquares() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((j + i) % 2 == 0) {
                let whiteSquare = document.createElement('div');
                whiteSquare.classList.add('whiteSquare');
                document.getElementById('board').children.item(i).appendChild(whiteSquare);
            }

            else {
                let blackSquare = document.createElement('div');
                blackSquare.classList.add('blackSquare');
                document.getElementById('board').children.item(i).appendChild(blackSquare);
            }
        }
    }
}

function displayBoard() {
    let chessBoard= document.createElement('div');
    chessBoard.setAttribute('id', 'board');
    document.body.appendChild(chessBoard);

    for (let i = 0; i < 8; i++) {
        let boardRow = document.createElement('div');
        chessBoard.appendChild(boardRow);
    }

    addSquares();

}

displayBoard();

import {Knight, Pawn, Queen, King} from "./chessPieces.js";
import Board from "./Square.js";

let board = new Board();
board.setSquares();

let knight = new Knight('black', 4, 4);

console.log(knight);
console.log(knight.getValidMoves(board));

let pawn = new Pawn('white', 6, 6);
console.log(pawn.getValidMoves(board));

let queen = new Queen('white', 3, 4);
console.log(queen.getValidMoves(board));