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

export function displayBoard() {
    let chessBoard= document.createElement('div');
    chessBoard.setAttribute('id', 'board');
    document.body.appendChild(chessBoard);

    for (let i = 0; i < 8; i++) {
        let boardRow = document.createElement('div');
        chessBoard.appendChild(boardRow);
    }

    addSquares();

}





