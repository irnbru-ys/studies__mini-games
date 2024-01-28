let players = ["x", "o"];
let activePlayer = 0;

let board;

function startGame() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    renderBoard(board);
}

let gamer = players[activePlayer];

function click(row, col) {
    if (gamer === "x") {
        gamer = "o";
    } else {
        gamer = "x";
    }
    board[row][col] = gamer;

    if (
        (board[0][0] === "x" && board[1][0] === "x" && board[2][0] === "x") ||
        (board[0][0] === "o" && board[1][0] === "o" && board[2][0] === "o") ||
        (board[0][1] === "x" && board[1][1] === "x" && board[2][1] === "x") ||
        (board[0][1] === "o" && board[1][1] === "o" && board[2][1] === "o") ||
        (board[0][2] === "x" && board[1][2] === "x" && board[2][2] === "x") ||
        (board[0][2] === "o" && board[1][2] === "o" && board[2][2] === "o") ||
        (board[0][0] === "x" && board[0][1] === "x" && board[0][2] === "x") ||
        (board[0][0] === "o" && board[0][1] === "o" && board[0][1] === "o") ||
        (board[1][0] === "x" && board[1][1] === "x" && board[1][2] === "x") ||
        (board[1][0] === "o" && board[1][1] === "o" && board[1][2] === "o") ||
        (board[2][0] === "x" && board[2][1] === "x" && board[2][2] === "x") ||
        (board[2][0] === "o" && board[2][1] === "o" && board[2][2] === "o") ||
        (board[0][0] === "x" && board[1][1] === "x" && board[2][2] === "x") ||
        (board[0][0] === "o" && board[1][1] === "o" && board[2][2] === "o") ||
        (board[0][2] === "x" && board[1][1] === "x" && board[2][0] === "x") ||
        (board[0][2] === "o" && board[1][1] === "o" && board[2][0] === "o")
    ) {
        showWinner(gamer);
    }

    renderBoard(board);
}
