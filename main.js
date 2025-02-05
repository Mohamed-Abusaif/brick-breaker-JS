import { createPlayer, movePlayer, player } from "./modules/player.js";
import { ball, updateBall, setDifficulty, restartGame } from "./modules/ball.js";
import { createBlocks, blockArray } from "./modules/block.js";
import { detectCollision } from "./modules/utils.js";

const board = document.getElementById("gameCanvas");
const difficulty = localStorage.getItem("selectedDifficulty") || "easy";
const context = board.getContext("2d");
const boardWidth = 750;
const boardHeight = 750;
let score = 0;
let gameOver = false;
let gameWon = false;
let ballSpeedx = 3;
let ballSpeedy = 2;
let scoreIncrement =
  difficulty === "easy" ? 50 : difficulty === "medium" ? 100 : 150;

board.width = boardWidth;
board.height = boardHeight;

const hitSound = new Audio("../sounds/soccer-ball-kick-37625.mp3");

function detectBounce(ball, block) {
  if (ball.y + ball.height <= block.y + block.height / 2 && ball.y + ball.height > block.y) {
    ball.velocityY *= -1;
  }
  else if (ball.y >= block.y + block.height / 2 && ball.y < block.y + block.height) {
    ball.velocityY *= -1;
  }

  if (ball.x + ball.width <= block.x + block.width / 2 && ball.x + ball.width > block.x) {
    ball.velocityX *= -1;
  }
  else if (ball.x >= block.x + block.width / 2 && ball.x < block.x + block.width) {
    ball.velocityX *= -1;
  }
}

function gameLoop() {
  updateGame(context, boardWidth, boardHeight);
  requestAnimationFrame(gameLoop);
}

function drawBlocks(context) {
  blockArray.forEach((block) => {
    context.fillStyle = block.color;
    context.fillRect(block.x, block.y, block.width, block.height);
  });
}

export function updateGame(context, boardWidth, boardHeight) {
  if (gameOver) {
    context.clearRect(0, 0, boardWidth, boardHeight);
    context.fillStyle = "black";
    context.font = "30px Arial";
    const message = gameWon ? "You Win! 🎉" : "Game Over! 💀";
    const scoreText = `Final Score: ${score}`;
    context.fillText(message, boardWidth / 2 - 80, boardHeight / 2 - 20);
    context.fillText(scoreText, boardWidth / 2 - 100, boardHeight / 2 + 20);
    return;
  }

  context.clearRect(0, 0, boardWidth, boardHeight);
  context.fillStyle = player.color;
  context.fillRect(player.x, player.y, player.width, player.height);

  if (updateBall(boardWidth, boardHeight)) {
    gameOver = true;
    return;
  }

  context.beginPath();
  context.arc(
    ball.x + ball.width / 2,
    ball.y + ball.height / 2,
    ball.width / 2,
    0,
    Math.PI * 2
  );
  context.fillStyle = "#FFD700";
  context.fill();
  context.closePath();

  if (detectCollision(ball, player)) {
    ball.velocityY *= -1;
    ball.y = player.y - ball.height;
  }

  for (let block of blockArray) {
    if (detectCollision(ball, block) && block.hits < 2) {
      block.hits += 1;
      detectBounce(ball, block);
      hitSound.play();

      if (block.hits == 2) {
        score += scoreIncrement;
      }
    }

    if (block.hits < 2) {
      context.fillStyle = block.hits === 1 ? "white" : block.color;
      context.fillRect(block.x, block.y, block.width, block.height);
    }
  }

  const allBlocksDestroyed = blockArray.every((block) => block.hits >= 2);
  if (allBlocksDestroyed) {
    gameWon = true;
    gameOver = true;
  }

  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
}

export function resetGame(boardWidth, boardHeight) {
  gameOver = false;
  gameWon = false;
  score = 0;
  ball.x = player.x + player.width / 2 - ball.width / 2;
  ball.y = player.y - ball.height - 5;
  ball.velocityX = 3;
  ball.velocityY = 2;
  createBlocks(difficulty);
  createPlayer(difficulty);
  restartGame(difficulty);
}

window.onload = () => {
  createBlocks(difficulty);
  createPlayer(difficulty);
  gameLoop();
  setDifficulty(difficulty);
};

document.addEventListener("keydown", (e) => movePlayer(e, boardWidth));

document.getElementById("scoreDisplay").innerText = `Score: 0`;

window.resetGame = resetGame;

document.addEventListener("DOMContentLoaded", function () {
  const difficultyElement = document.getElementById("difficulty");

  if (difficultyElement) {
    difficultyElement.value = difficulty;
  }
  setDifficulty(difficulty);
});
