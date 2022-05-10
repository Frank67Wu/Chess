import { displayBoard } from "./chessBoard.js";
import {Board} from "./Square.js";
import {King, Knight, Pawn, Rook, Queen, Bishop} from "./chessPieces.js";


const delay = 750;
displayBoard();

function newGame() {
    let board = new Board();
    board.setSquares();

    let highlighted  = [];
    let toMove = [];
    let playerColours = ['white']

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
    createUserInteraction(board, highlighted, toMove, playerColours);

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

function clearHighlight(board, toClear) {
    while (toClear.length > 0) {
        document.getElementById('board').children.item(toClear[0].y).children.item(toClear[0].x).classList.remove('highlight');
        toClear.shift();
    }
}

function createUserInteraction(board, highlighted, toMove, playerColour) {
    for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let mySquare = document.getElementById('board').children.item(i).children.item(j);
                mySquare.addEventListener('click', () => {   
                    if (mySquare.classList.contains('highlight')) {
                        console.log(toMove[0]);
                        let imgRemove = document.getElementById('board').children.item(toMove[0].y).children.item(toMove[0].x);
                        imgRemove.removeChild(imgRemove.children[0]);
                        board.removePiece(toMove[0].x, toMove[0].y);
                        board.setPiece(j, i, toMove[0]);
                        toMove[0].move(j, i);
                        board.getPiece(j, i).display(i, j);
                        board.changeTurn();
                        moveBlackPiece(board, 1);
                    } 

                    clearHighlight(board, highlighted);    
                    toMove.shift(); 
                    if (board.checkSquare(j, i) && board.getTurn() == board.getSquare(j, i).getPieceColour(j, i) && playerColour.includes(board.getTurn())) {
                        toMove.push(board.getPiece(j, i));
                        let validMoves = board.getPiece(j,i).getValidMoves(board);  
                        for (let k = 0; k < validMoves.length; k++) {
                            document.getElementById('board').children.item(validMoves[k].y).children.item(validMoves[k].x).classList.add('highlight');
                            highlighted.push(validMoves[k]);
                        }
                    } 
                    })  
            }
    }
}

function chooseRandomPiece(board, colour) {
    let x = -1;
    let y = -1;
    let validArrayLength = 0;
    let validMoves = []
    let toMove = [];
    while (validMoves <= 0) {
        x = Math.floor(Math.random() * 8);
        y = Math.floor(Math.random() * 8);
        if (board.checkSquare(x, y) && board.getSquare(x, y).getPieceColour() == colour) {
            validMoves = board.getPiece(x, y).getValidMoves(board);
            validArrayLength = validMoves.length;
            console.log(board.getPiece(x, y).getValidMoves(board));
        }
    }

    toMove.push(board.getPiece(x, y));
    moveToRandomSquare(board, toMove, validMoves);
}

function moveToRandomSquare(board, toMove, validMoves) {
    let index = Math.floor(Math.random() * validMoves.length);
    let i = validMoves[index].y;
    let j = validMoves[index].x;

    let imgRemove = document.getElementById('board').children.item(toMove[0].y).children.item(toMove[0].x);
    imgRemove.removeChild(imgRemove.children[0]);
    board.removePiece(toMove[0].x, toMove[0].y);
    board.setPiece(j, i, toMove[0]);
    toMove[0].move(j, i);
    board.getPiece(j, i).display(i, j);
    board.changeTurn();
}


function moveBlackPiece(board, i) {
    setTimeout(function() {
        chooseRandomPiece(board, 'black')}, delay * i);
}

function moveWhitePiece(board, i) {
    setTimeout(function() {
        chooseRandomPiece(board, 'white')}, delay * i);
}


function botsPlay100(board) {
    for (let i = 2; i < 102; i++) {
        if (i % 2 == 0) {
            moveWhitePiece(board, i);
        }
        else {
            moveBlackPiece(board, i);
        }
    }
}

//botsPlay100(myboard);