// ===== DOM refs =====
//Form Elements 
const playerOneInput = document.getElementById("playerOneName");
const playerTwoInput = document.getElementById("playerTwoName");
const submitFormBtn = document.getElementById("submitForm");
const radioSelectSingle = document.getElementById("singlePlayer");
const radioSelectTwo = document.getElementById("twoPlayers");
const playerTwoHidden = document.getElementById("player2only");
const playerCreationForm = document.getElementById("startGame")
// Game Session
const gameSession = document.getElementById("gameUI");
const scoreboard = document.getElementById("scoreboard");
const p1Card = document.getElementById("p1Card");
const p1ScoreMarker = document.getElementById("p1Marker");
const p1Score = document.getElementById("p1Score");
const p2Card = document.getElementById("p2Card");
const p2ScoreMarker = document.getElementById("p2Marker");
const p2Score = document.getElementById("p2Score");
const gameBoardContainer = document.getElementById("board");
const newGameBtn = document.getElementById("newGameBtn");



// ===== Game module (IIFE) =====
// Uses your existing logic, just centralized state + callable init.
const Game = (function () {
  const pieces = ["X", "O"];

  // private state
  let board = [];
  let players = []
  let movesMade = 0;

  function init() {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    movesMade =0;
    renderBoard();
    return board;
  }

  function getBoard() {
    return board;
  }

  function getPlayers() {
    return players;
  }

   function getCurrentPlayer() {
    return players[movesMade % players.length];;
  }

  function getRound() {
    return movesMade;
  }

  function legalRange(num) {
    return num >= 0 && num <= 2;
  }

  function isMoveLegal(row, col) {
    if (!legalRange(row) || !legalRange(col)) return false;
    if (board[row][col] !== "") return false;
    return true;
  }

  function gameOver(num) {
    if (num == 1) return "Game is over";
    if (num == 2) return "you won!!";
    if (num == 3) return "you lost!!";
    return undefined;
  }

  function threeInARow(piece) {
    if (board[0][0] === piece && board[0][1] === piece && board[0][2] === piece) return true;
    if (board[0][0] === piece && board[1][0] === piece && board[2][0] === piece) return true;
    if (board[0][2] === piece && board[1][2] === piece && board[2][2] === piece) return true;
    if (board[0][1] === piece && board[1][1] === piece && board[2][1] === piece) return true;
    if (board[1][0] === piece && board[1][1] === piece && board[1][2] === piece) return true;
    if (board[2][0] === piece && board[2][1] === piece && board[2][2] === piece) return true;
    if (board[0][0] === piece && board[1][1] === piece && board[2][2] === piece) return true;
    if (board[2][0] === piece && board[1][1] === piece && board[0][2] === piece) return true;
    return false;
  }

  function isGameDone(piece) {
    if (threeInARow(piece) === true) return gameOver(2);
    if (movesMade > 8) return gameOver(1);
    return "Continue game";
  }

  function createPlayer(name, piece) {
    function move(row, col) {
      if (!isMoveLegal(row, col)) {
        console.log("illegal move");
        return { ok: false, status: "illegal", reason: "Spot is taken or out of range" };
      }

      console.log("Column and row before:", board[row][col]);
      board[row][col] = piece;
      console.log("Column and row after:", board[row][col]);

      console.log("piece placed");
      console.log(board);

      movesMade++;

      const msg = isGameDone(piece);
      console.log(msg + " This is your piece: " + piece);
      console.log("Round:", movesMade);

      return { ok: true, status: msg };
    }
    const isCpu = (name === "Computer")
    players.push({ name, piece, move, isCpu})
    return { name, piece, move, isCpu };
  }

  function randomCpuMove(cpu) {
    const rowMove = Math.floor(Math.random() * 3);
    const colMove = Math.floor(Math.random() * 3);

    console.log("this is the row:", rowMove);
    console.log("this is the col:", colMove);

    if (!isMoveLegal(rowMove, colMove)) {
      // same recursion approach you had
      return randomCpuMove(cpu);
    }
    return cpu.move(rowMove, colMove);
  }

  function getOtherPiece(piece) {
    return pieces.find((p) => p !== piece);
  }
  // public API
  return {
    init,
    getBoard,
    getRound,
    createPlayer,
    randomCpuMove,
    getOtherPiece,
    getPlayers,
    getCurrentPlayer,
  };
})();
// ===== UI helpers =====
function updatePlayerVisibility() {
  playerTwoHidden.classList.toggle("hidden", !radioSelectTwo.checked);
}
radioSelectTwo.addEventListener("change", updatePlayerVisibility);
radioSelectSingle.addEventListener("change", updatePlayerVisibility);

function renderBoard() {
    // Clear the container first to prevent duplicates when updating the board
    gameBoardContainer.innerHTML = ''; 
    const board= Game.getBoard();
    // Loop through the rows of the 2D array
    board.forEach((row, rowIndex) => {
        // Loop through the cells in each row
        row.forEach((cellValue, colIndex) => {
            // Create a new div element for each cell
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            // Set the cell's content to the value in the array
            cellElement.textContent = cellValue; 
            
            // Optional: Add data attributes for position (useful for game logic)
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;

            // Optional: Add event listener for user interaction (e.g., clicking a cell)
            cellElement.addEventListener('click', () => {
                console.log(`Clicked on cell at row ${rowIndex}, column ${colIndex}`);
                // Add game logic here (e.g., make a move, update the array, then re-render)
            });

            // Append the cell element to the game board container
            gameBoardContainer.appendChild(cellElement);
        });
    });
}
// ===== “Start game” wiring =====
let playerOnePlayer = null;
let cpuPlayer = null;

function startNewGame() {
  Game.init();
  gameSession.classList.remove("hidden");
  playerCreationForm.classList.add("hidden");
}

// Submit -> build player(s) -> init game
submitFormBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const markerEl = document.querySelector('input[name="playerMarker"]:checked');
  const marker = markerEl ? markerEl.value : "";

  if (playerOneInput.value && radioSelectSingle.checked && marker) {
    playerOnePlayer = Game.createPlayer(playerOneInput.value, marker);
    cpuPlayer = Game.createPlayer("Computer", Game.getOtherPiece(marker));

    startNewGame();

    // Game.randomCpuMove(cpuPlayer);

    return;
  }

  //  add a toast fail-safe later
});
