// game.js
import { player, movePlayer } from "./player.js";
import { ball, updateBall } from "./ball.js";
import { blockArray, createBlocks } from "./block.js";
import { detectCollision } from "./utils.js";

let score = 0;
let gameOver = false;

export function updateGame(context, boardWidth, boardHeight) {
    if (gameOver) return;
    
    context.clearRect(0, 0, boardWidth, boardHeight);
    
    // Draw player (paddle)
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);
    
    // Update and draw ball
    context.fillStyle = "white";
    updateBall(boardWidth, boardHeight);
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
    
    // Check collision between ball and paddle
    if (ball.y + ball.height >= player.y &&
        ball.x + ball.width >= player.x &&
        ball.x <= player.x + player.width) {
        ball.velocityY *= -1;
    }
    
    // Check collision between ball and blocks
    for (let block of blockArray) {
        if (!block.break && detectCollision(ball, block)) {
            block.break = true;
            ball.velocityY *= -1;
            score += 100;
        }
        if (!block.break) {
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }
}

export function resetGame() {
    gameOver = false;
    score = 0;
    createBlocks();
}