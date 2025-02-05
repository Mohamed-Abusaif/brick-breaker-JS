import {  player , movePlayer, createPlayer } from "./player.js";
import { ball, updateBall } from "./ball.js";
import { blockArray, createBlocks, blockColumns, blockRows } from "./block.js";
import { detectCollision } from "./utils.js";

const hitSound = new Audio("../sounds/soccer-ball-kick-37625.mp3");

document.addEventListener("DOMContentLoaded", function () {
  const difficulty = localStorage.getItem("selectedDifficulty") || "hard";
  const difficultyElement = document.getElementById("difficulty");

  if (difficultyElement) {
    difficultyElement.value = difficulty;
  }
});

let score = 0;
let gameOver = false;
let gameWon = false;
let ballSpeedx = 3;
let ballSpeedy = 2;
let scoreIncrement = 50;

if (difficulty === "easy") {
  ballSpeedx = 2;
  ballSpeedy = 2;
  scoreIncrement = 50;
} else if (difficulty === "medium") {
  ballSpeedx = 6;
  ballSpeedy = 5;
  scoreIncrement = 100;
} else if (difficulty === "hard") {
  ballSpeedx = 9;
  ballSpeedy = 10;
  scoreIncrement = 150;
}

ball.velocityX = ballSpeedx;
ball.velocityY = ballSpeedy;

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

      ball.velocityY *= -1;
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
  ball.x = boardWidth / 2;
  //    ball.y = boardHeight / 2;
  ball.y = boardHeight - ballHeight - 80;
  ball.velocityX = 3;
  ball.velocityY = 2;
  createBlocks(difficulty);
  createPlayer(difficulty);
}
