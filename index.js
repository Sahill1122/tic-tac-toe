
const playerform = document.getElementById("playerform");

const player1form = document.getElementById("player1");
const player2form = document.getElementById("player2");

const player1text = document.getElementById("player1text");
const player2text = document.getElementById("player2text");

const turnEl = document.getElementById("turn");

let turn = "";

const gridArr = [];

// Get all 9 boxes
for (let i = 0; i <= 8; i++) {
    let box = document.getElementById("box" + i);
    gridArr.push(box);
}


// Add click event to every box
gridArr.forEach((box, index) => {

    box.addEventListener("click", () => {

        // Don't allow clicking an already-filled box
        if (gridArr[index].innerText !== "") {
            return;
        }

        // Change turn
        if (turn === "") {
            turn = "X";
        }
        else if (turn === "X") {
            turn = "O";
        }
        else {
            turn = "X";
        }

        // Put X or O inside the box
        gridArr[index].innerText = turn;

        // Update turn display
        turnEl.innerText = "Turn: " + turn;

        // Check winner
        checkWinner();
    });
});


// Player form
playerform.addEventListener("submit", function(event) {

    event.preventDefault();

    player1text.innerText = "Player 1: " + player1form.value;
    player2text.innerText = "Player 2: " + player2form.value;

});


// All possible winning combinations
const winningCombinations = [

    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6]

];


// Check winner
function checkWinner() {

    let gridTexts = [];

    // Get X/O from all boxes
    for (let i = 0; i < 9; i++) {
        gridTexts.push(gridArr[i].innerText);
    }

    // Check every winning combination
    winningCombinations.forEach((winningArr) => {

        let a = gridTexts[winningArr[0]];
        let b = gridTexts[winningArr[1]];
        let c = gridTexts[winningArr[2]];

        // Check if all three are same AND not empty
        if (a !== "" && a === b && a === c) {

            console.log("Winner!");

            turnEl.innerText = "Winner: " + a;
        }

    });
}
