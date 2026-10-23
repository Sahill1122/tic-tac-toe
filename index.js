const playerform = document.getElementById("playerform");

const player1form = document.getElementById("player1");
const player2form = document.getElementById("player2");

const player1text = document.getElementById("player1text");
const player2text = document.getElementById("player2text");

const turnEl = document.getElementById("turn");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let turn = "X";                 // X always starts
let gameOver = false;
let player1Name = "Player 1";   // X
let player2Name = "Player 2";   // O

// Scores
let player1Score = 0;
let player2Score = 0;
let draws = 0;

const gridArr = [];

// Get all 9 boxes
for (let i = 0; i <= 8; i++) {
    gridArr.push(document.getElementById("box" + i));
}

// Helper: name of whoever's symbol is passed in
function nameOf(symbol) {
    return symbol === "X" ? player1Name : player2Name;
}

// Show whose turn it is
function updateTurnText() {
    turnEl.textContent = "TURN: " + nameOf(turn) + " (" + turn + ")";
}

// Show the score
function updateScore() {
    scoreEl.textContent =
        player1Name + ": " + player1Score + " | " +
        player2Name + ": " + player2Score + " | " +
        "Draws: " + draws;
}

updateTurnText();
updateScore();

// All possible winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // Vertical
    [0, 4, 8], [2, 4, 6]               // Diagonal
];

// Add click event to every box
gridArr.forEach((box) => {
    box.addEventListener("click", () => {

        if (gameOver) return;
        if (box.textContent !== "") return;

        // Place the current symbol
        box.textContent = turn;
        box.classList.add(turn === "X" ? "x" : "o");

        // Check winner / draw
        if (checkWinner()) return;

        // Switch turn
        turn = turn === "X" ? "O" : "X";
        updateTurnText();
    });
});

// Player form
playerform.addEventListener("submit", function (event) {
    event.preventDefault();

    player1Name = player1form.value.trim() || "Player 1";
    player2Name = player2form.value.trim() || "Player 2";

    player1text.textContent = "Player 1 (X): " + player1Name;
    player2text.textContent = "Player 2 (O): " + player2Name;

    updateScore();
    if (!gameOver) updateTurnText();
});

// Check winner. Returns true if the game ended.
function checkWinner() {
    const gridTexts = gridArr.map((box) => box.textContent);

    // Check every winning combination
    for (const [a, b, c] of winningCombinations) {
        if (gridTexts[a] !== "" &&
            gridTexts[a] === gridTexts[b] &&
            gridTexts[a] === gridTexts[c]) {

            gameOver = true;
            turnEl.textContent = "WINNER: " + nameOf(gridTexts[a]) + " 🎉";

            // Add 1 point to the winner
            if (gridTexts[a] === "X") {
                player1Score++;
            } else {
                player2Score++;
            }
            updateScore();

            // Highlight winning boxes using a CSS class
            [a, b, c].forEach((i) => {
                gridArr[i].classList.add("win");
            });
            return true;
        }
    }

    // Draw check: runs ONCE, after all combinations are checked
    if (gridTexts.every((value) => value !== "")) {
        gameOver = true;
        draws++;
        updateScore();
        turnEl.textContent = "IT'S A DRAW!";
        return true;
    }

    return false;
}

// Restart the game (the score is kept)
restartBtn.addEventListener("click", () => {
    gridArr.forEach((box) => {
        box.textContent = "";
        box.classList.remove("x", "o", "win");
    });
    turn = "X";
    gameOver = false;
    updateTurnText();
});