// Global vars
const pieces =["X","O"]
let board = []
let gameRound =1;

// Build a function that set's piece and creates a computer
function createPlayer(name,piece) {
function  move (row,col){
if(isMoveLegal(row,col)){
    board[row][col]=piece
    console.log("piece placed")
    console.log(board);
    gameRound++;
    console.log(isGameDone(piece) + " This is your piece: "+ piece)
    console.log("Round: "+gameRound);
    return { ok: true, status: "continue" | "win" | "draw" }
}
return {legalmove:false, reason:"Spot is taken"}
};
    return{name,piece,move}
}

//This will restore all values to default 
const initGame =(function(){
 board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
return board
})();

const startNewGame = () => {
    initGame();
    gameRound=1;
}


// Check if the game is over due to spacing or if the user won
const gameOver = (num)=>{
    if (num==1){
        return "Game is over"}
    if (num ==2){
        return "you won!!"
    }if (num ==3){
        return "you lost!!"
    }
    return
}

//need a way to see if player won
const isGameDone =(piece)=>{
if(threeInARow(piece)===true){
    return gameOver(2)
}if (gameRound>9){
    return gameOver(1);
}
return "Continue game"
};

//what pattern do you notice? How can it be leveraged to run a loop?
const threeInARow=(piece)=>{
    if(board[0][0]===piece&&board[0][1]===piece&&board[0][2]===piece){
        return true
    } if(board[0][0]===piece&&board[1][0]===piece&&board[2][0]===piece){
        return true
    } if(board[0][2]===piece&&board[1][2]===piece&&board[2][2]===piece){
        return true
    } if(board[0][1]===piece&&board[1][1]===piece&&board[2][1]===piece){
        return true
    }if(board[1][0]===piece&&board[1][1]===piece&&board[1][2]===piece){
        return true
    }if(board[2][0]===piece&&board[2][1]===piece&&board[2][2]===piece){
        return true
    }if(board[0][0]===piece&&board[1][1]===piece&&board[2][2]===piece){
        return true
    }if(board[2][0]===piece&&board[1][1]===piece&&board[0][2]===piece){
        return true}
    return false
}
// Two function to check if the move is legal
const legalRange=(num)=>{
    if (num>=0&&num<=2){
        return true
    }
    return false
}
const isMoveLegal =(row,col)=>{
if (board[row][col]===""&& legalRange(row)&&legalRange(col)){
    return true
}
console.log("illegal move")
return false
};

//Controller moves
const randomCpuMove = (cpu) =>{
const rowMove =Math.floor(Math.random()*3);
const colMove =Math.floor(Math.random()*3);
console.log("this is the row:"+rowMove)
console.log("this is the col:"+colMove)
if(!isMoveLegal(rowMove,colMove)){
return randomCpuMove(cpu)
}
return cpu.move(rowMove,colMove)
}

const Zu =  createPlayer("Zu","X")
const cpu =  createPlayer("Computer",pieces.find(item => item !== Zu.piece))


