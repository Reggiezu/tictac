// ===== DOM refs =====
const playerOneInput = document.getElementById("playerOneName");
const playerTwoInput = document.getElementById("playerTwoName");
const submitFormBtn = document.getElementById("submitForm");
const radioSelectSingle = document.getElementById("singlePlayer");
const radioSelectTwo = document.getElementById("twoPlayers");
const playerTwoHidden = document.getElementById("player2only");
const gameSession = document.getElementById("gameSession");

// ===== UI helpers =====
function updatePlayerVisibility() {
  playerTwoHidden.classList.toggle("hidden", !radioSelectTwo.checked);
}
radioSelectTwo.addEventListener("change", updatePlayerVisibility);
radioSelectSingle.addEventListener("change", updatePlayerVisibility);

// ===== Game module (IIFE) =====
// Uses your existing logic, just centralized state + callable init.
const Game = (function () {
  const pieces = ["X", "O"];

  // private state
  let board = [];
  let gameRound = 1;

  function init() {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    gameRound = 1;
    return board;
  }

  function getBoard() {
    return board;
  }

  function getRound() {
    return gameRound;
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
    if (gameRound > 9) return gameOver(1);
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

      gameRound++;

      const msg = isGameDone(piece);
      console.log(msg + " This is your piece: " + piece);
      console.log("Round:", gameRound);

      // IMPORTANT: no TS union in JS
      // status is just a plain string for now (your existing messages)
      return { ok: true, status: msg };
    }

    return { name, piece, move };
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
  };
})();

// ===== “Start game” wiring =====
let playerOnePlayer = null;
let cpuPlayer = null;

function startNewGame() {
  Game.init();
  // you can swap this for whatever container you *actually* want hidden/shown
  gameSession.classList.remove("hidden");
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

    // (Optional) your old behavior example:
    // Game.randomCpuMove(cpuPlayer);

    return;
  }

  // you said you’ll add a toast fail-safe later, so leaving this empty on purpose
});
