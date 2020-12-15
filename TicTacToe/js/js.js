
// ↓  Welcome message ↓ //

$(document).ready(function(){

    function showWindow(){
        $('.welcomeMessage').show();
        $('html body').css('overflow', 'hidden');

        setTimeout(hideWindow, 5000);
    }
   //  showWindow()

    function hideWindow(){
        $('.welcomeMessage').hide();
        $('html body').css('overflow', 'scroll');
    }
   //  hideWindow()

    showWindow();

    $('#start').click(function(){
        hideWindow();
    })

})

// ↓  Current Player display message ↓ //
const currentPlayerDisplay = document.querySelector('#player');


// ↓  X will always starts first ↓ //
let currentPlayer = "X";


let stillPlaying = true;


// ↓  Winning message ↓ //
const gameMessage = document.querySelector('#message');


// ↓  The game board ↓ //
let game = [
    "", "", "",
    "", "", "",
    "", "", ""
]

// ↓  Winning combinations ↓ //
const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

currentPlayerDisplay.innerHTML = whosTurn();

const cells = document.querySelectorAll('.gridItem');
cells.forEach(cell => {
    cell.addEventListener('click', cellClicked)
});



// will display in (currentPlayerDisplay) 
function whosTurn (){
    return (`It is ${currentPlayer}'s turn`)
} 

// will display in (gameMessage) when a player wins
function winningMessage (){
    return (`Player ${currentPlayer} won !!!!!!!!!!!!!!`)
}

// will display in (gameMessage) when game is drew 
function drewMessage (){
    return ("Drew")
}

// ↓ will check if the box is already clicked, if not the game will still playing.  ↓ //
//  Also, it will activate the cellSelectedPlayer function which the player will claim the box //
//  Then, it will check if anyone win the game //
function cellClicked (box) {  
    const clickedBox = box.target;
    const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-index'));
    if (game[clickedBoxIndex] !== "" || !stillPlaying){
        return;
    }
    cellSelectedByPlayer(clickedBox, clickedBoxIndex);
    checkWin ();    
}

// It will update on the user end, showing X or O in the box //
function cellSelectedByPlayer(clickedBox, clickedBoxIndex) {
    game[clickedBoxIndex] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;
}


// check if the current player win // 
function checkWin (){
    let playerWin = false;
    for (let i = 0; i < winning.length; i++){
        const win = winning[i];
        let x = game[win[0]];
        let y = game[win[1]];
        let z = game[win[2]];
        if (x === "" || y === "" || z === ""){
            continue;
        } else if (x === y && y === z){
            playerWin = true;
            break
        }
    }
    if (playerWin) { 
        confetti.start(2000, 500);
        gameMessage.innerHTML = winningMessage ();
        stillPlaying = false;
        return;
    }

    let playerDraw = !game.includes ("");
    if (playerDraw){
        gameMessage.innerHTML = drewMessage ();
        stillPlaying = false;
        return
    }

    switchPlayer();
}



function switchPlayer (){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerDisplay.innerHTML = whosTurn();

}
function restartGame() {
    stillPlaying = true;
    currentPlayer = "X";
    game = [
        "", "", "",
        "", "", "",
        "", "", ""
    ]
    currentPlayerDisplay.innerHTML = whosTurn();
    gameMessage.innerHTML = "";
    document.querySelectorAll(".gridItem").forEach (gridItem => gridItem.innerHTML = "");
}



/* function clicked(e){
    const cellsArray = Array.from(cells);
    const cellsIndex = cellsArray.indexOf(e.target) // return which cell got clicked
    const player = "";
    currentPlayer.innerHTML = player;

    if (currentPlayer.innerHTML === "Current Player X"){
        currentPlayer.innerHTML = "Current Player O";
    } else {
        currentPlayer.innerHTML = "Current Player X";
    }
}
 */ 






