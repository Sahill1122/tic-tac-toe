const playerform = document.getElementById("playerform")
const player1form = document.getElementById("player1")
const player2form = document.getElementById("player2")

const player1text = document.getElementById("player1text")
const player2text = document.getElementById("player2text")
const turnEl = document.getElementById("turn")

let turn = "";

const gridArr = []
for(let i = 0; i<=8; i++){
    let box = document.getElementById("box"+i)
    gridArr.push(box)
}

gridArr.forEach((box,index)=>{
    box.addEventListener("click",()=>{

    if(gridArr[index].innerText !== "") return
    
        
    if (turn === ""){
        turn = "X"
    }
    else if (turn === "X"){
        turn = "O"
    }
    else{
        turn = "X"
    }

    gridArr[index].innerText = turn;
    checkWinner()

    })
})





function showPlayer(){
    event.preventDefault();
    player1text.innerText = "Player 1: " + player1form.value;
    player2text.innerText = "Player 2: " + player2form.value;
    turnEl.innerText = "Turn: " + turn;
    
} 

const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8] //horizontal
    [0,3,6],[1,4,7], [3,5,8] //vertical
    [0,4,8],[2,4,6] //diagonals
]
function checkWinner(){
    let gridTexts = []
        for(let i = 0; i<9; i++){
            gridTexts.push(gridArr[i].innerText)
            console.log(gridTexts)
        }
        winningCombinations.forEach((winningArr)=>{
            let a = "";
            let b = "";
            let c = "";
            winningArr.forEach(()=>{
                a = gridTexts[winningArr[0]];
                b = gridTexts[winningArr[1]];
                c = gridTexts[winningArr[2]];
                
            })
            if ( a === b && a === c){
                console.log ("winner!")
            }
            

        })
        
}