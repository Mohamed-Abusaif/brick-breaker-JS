// game.js
import { player, movePlayer } from "./player.js";
import { ball, updateBall } from "./ball.js";
import { blockArray, createBlocks } from "./block.js";
import { detectCollision } from "./utils.js";
 
let score = 0;
let gameOver = false;

export function updateGame(context, boardWidth, boardHeight) {
    if (gameOver) {
        return;
    }
    
    context.clearRect(0, 0, boardWidth, boardHeight);
    
    // Draw player (paddle)
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

     // Update and draw ball
    if (updateBall(boardWidth, boardHeight)) {
        gameOver = true; // Set game over flag
        return; // Stop further updates
    }
    

    // Draw ball as a circle
    context.beginPath();
    context.arc(ball.x + ball.width / 2, ball.y + ball.height / 2, ball.width / 2, 0, Math.PI * 2);
    context.fillStyle = "red"; 
    context.fill();
    context.closePath();

  // Check collision between ball and paddle
  if (detectCollision(ball, player)) {
    ball.velocityY *= -1;
    ball.y = player.y - ball.height; // Prevent getting stuck
}
    
    
 // Check collision between ball and blocks
 for (let block of blockArray) {
    if (detectCollision(ball, block) && !block.break) {
        block.break = true;
        ball.velocityY *= -1;
        score += 100;
    }

    // Always draw unbroken blocks
    if (!block.break) {
        context.fillStyle = "blue";
        context.fillRect(block.x, block.y, block.width, block.height);
    }
}



}/// end of update 

export function resetGame(boardWidth, boardHeight) {
    gameOver = false;
    score = 0;
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = 3;
    ball.velocityY = 2;
    createBlocks();
}
