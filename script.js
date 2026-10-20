
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restart = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.disabled = true;

        checkWinner();
    });
});

function checkWinner() {
    let winnerFound = false;

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            winnerFound = true;
            break;
        }
    }

    if (winnerFound) {
        message.textContent = "Player " + currentPlayer + " Wins!";
        gameActive = false;
        cells.forEach(cell => cell.disabled = true);
    } else if (!board.includes("")) {
        message.textContent = "It's a Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = "Player " + currentPlayer + "'s Turn";
    }
}

restart.addEventListener("click", function () {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
        cell.disabled = false;
    });

    message.textContent = "Player X's Turn";
});
