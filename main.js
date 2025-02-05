import { restartGame } from "./modules/ball.js";
import { createPlayer, movePlayer } from "./modules/player.js";
import { ball } from "./modules/ball.js";
import { createBlocks } from "./modules/block.js";
import { updateGame, resetGame } from "./modules/game.js";

const board = document.getElementById("gameCanvas");
const difficulty = localStorage.getItem("selectedDifficulty") || "easy";
console.log(difficulty);
const context = board.getContext("2d");
const boardWidth = 750;
const boardHeight = 750;

board.width = boardWidth;
board.height = boardHeight;



document.addEventListener("keydown", (e) => movePlayer(e, boardWidth));
document.addEventListener("keydown", (e) => {
 
});

function gameLoop() {
  updateGame(context, boardWidth, boardHeight);
  requestAnimationFrame(gameLoop);
}
function drawBlocks(context) {
    blockArray.forEach(block => {
        context.fillStyle = block.color;
        context.fillRect(block.x, block.y, block.width, block.height);
    });
}

window.onload = () => {
  createBlocks(difficulty);
  createPlayer(difficulty);
  gameLoop();
};


window.restartGame = restartGame;


