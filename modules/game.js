// game.js
import { player, movePlayer } from "./player.js";
import { ball, updateBall } from "./ball.js";
import { blockArray, createBlocks } from "./block.js";
import { detectCollision } from "./utils.js";

const difficulty = localStorage.getItem('selectedDifficulty') || 'easy';

 
let score = 0;
let gameOver = false;
let gameWon = false;
let ballSpeedx = 3;
let ballSpeedy = 2;


// Adjust parameters based on difficulty
if (difficulty === "easy") {
    ballSpeedx = 2;
    ballSpeedy = 2;
} else if (difficulty === "medium") {
    ballSpeedx = 6;
    ballSpeedy = 5;
} else if (difficulty === "hard") {
    ballSpeedx = 9;
    ballSpeedy = 10;
}

// Apply ball speed blnsbaa lel Diffculty level
ball.velocityX = ballSpeedx;
ball.velocityY = ballSpeedy;




export function updateGame(context, boardWidth, boardHeight) {
    if (gameOver) {
        context.clearRect(0, 0, boardWidth, boardHeight);
        
        // Draw win/lose message
        context.fillStyle = "black";
        context.font = "30px Arial";
        const message = gameWon ? "You Win! 🎉" : "Game Over! 💀";
        const scoreText = `Final Score: ${score}`;
        
        context.fillText(message, boardWidth/2 - 80, boardHeight/2 - 20);
        context.fillText(scoreText, boardWidth/2 - 100, boardHeight/2 + 20);
        
        return;
    }
    
    context.clearRect(0, 0, boardWidth, boardHeight);
    
    // Draw player (paddle)
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);

     // Update and draw ball
    if (updateBall(boardWidth, boardHeight)) {
        gameOver = true; // Set game over flag
        return; // Stop further updates
    }
    

    // Draw ball as a circle
    context.beginPath();
    context.arc(ball.x + ball.width / 2, ball.y + ball.height / 2, ball.width / 2, 0, Math.PI * 2);
    context.fillStyle = "#FFD700"; 
    context.fill();
    context.closePath();

    // Check collision between ball and paddle
    if (detectCollision(ball, player)) {
        ball.velocityY *= -1;
        ball.y = player.y - ball.height; // Prevent getting stuck
    }
    
    
    // Check collision between ball and blocks
    for (let block of blockArray) {
        if (detectCollision(ball, block) && block.hits<2) {
            block.hits+=1;
            ball.velocityY *= -1;
            
            if(block.hits == 2){
                score += 100;
            }
        }

        // Always draw unbroken blocks
        if (block.hits < 2) {
            context.fillStyle = block.hits === 1 ? "white" : block.color;
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    const allBlocksDestroyed = blockArray.every(block => block.hits >= 2);
    if (allBlocksDestroyed) {
        gameWon = true;
        gameOver = true;
    }
}/// end of update 

export function resetGame(boardWidth, boardHeight) {
    gameOver = false;
    gameWon = false;
    score = 0;
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = 3;
    ball.velocityY = 2;
    createBlocks(difficulty);
}
