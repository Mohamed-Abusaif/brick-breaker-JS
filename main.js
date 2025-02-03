import { restartGame } from "./modules/ball.js"; 
import { player, movePlayer } from "./modules/player.js";
import { ball } from "./modules/ball.js";
import { createBlocks } from "./modules/block.js";
import { updateGame, resetGame } from "./modules/game.js";

const board = document.getElementById("gameCanvas");
const difficulty = localStorage.getItem('selectedDifficulty') || 'easy';
console.log(difficulty);
const context = board.getContext("2d");
const boardWidth = 750;
const boardHeight = 750;

board.width = boardWidth;
board.height = boardHeight;

// createBlocks(difficulty);

document.addEventListener("keydown", (e) => movePlayer(e, boardWidth));
document.addEventListener("keydown", (e) => { 
    if (e.code === "Space") resetGame();
});

function gameLoop() {
    updateGame(context, boardWidth, boardHeight);
    requestAnimationFrame(gameLoop);
}


window.onload = () => {
    createBlocks(difficulty);
    gameLoop();
};

window.restartGame = restartGame;
