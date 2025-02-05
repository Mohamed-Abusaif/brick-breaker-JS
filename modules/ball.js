import {  player , movePlayer, createPlayer } from "./player.js";

export let ballWidth = 20;
export let ballHeight = 20;
export let ballVelocityX = 3;
export let ballVelocityY = 2;

export let ball = {
    x: 900 / 2,
    // y: 900 / 2,
    y: 900 - ballHeight - 80, //  ball starts above bottom ya aya :(
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
};

export let lives = 3;
export let score = 0;

export function setDifficulty(difficulty) {
    if (difficulty === "easy") {
        ballVelocityX = 2;
        ballVelocityY = 2;
        ballWidth = 30;
        ballHeight = 10;
    } else if (difficulty === "medium") {
        ballVelocityX = 4;
        ballVelocityY = 4;
        ballWidth = 25;
        ballHeight = 5;
    } else if (difficulty === "hard") {
        ballVelocityX = 6;
        ballVelocityY = 6;
        ballWidth = 30;
        ballHeight = 5;
    }

    ball.velocityX = ballVelocityX;
    ball.velocityY = ballVelocityY;
    ball.width = ballWidth;
    ball.height = ballHeight;
}

export function updateBall(canvasWidth, canvasHeight) {
    if (lives <= 0) return; 
    
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.x <= 0 || ball.x + ball.width >= canvasWidth) {
        ball.velocityX *= -1;
    }
    if (ball.y <= 0) {
        ball.velocityY *= -1;
    }
    if (ball.y + ball.height >= canvasHeight) {
        lives -= 1;
        updateLivesDisplay();
        if (lives <= 0) {
            lose();
        } else {
            restartBallPosition(canvasWidth, canvasHeight);
        }
    }
}

export function lose() {
    const loseMessage = document.getElementById("loseMessage");
    const restartButton = document.getElementById("restartButton");

    if (loseMessage && restartButton) {
        loseMessage.style.display = "flex";
        loseMessage.style.flexDirection = "column";
        loseMessage.style.alignItems = "center";
        restartButton.style.display = "block";
    }
}

export function restartGame(difficulty) {
    lives = 3;
    score = 0;
    setDifficulty(difficulty);
    updateLivesDisplay();
    updateScoreDisplay();
    restartBallPosition(500, 500);
    document.getElementById("loseMessage").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
}

export function updateLivesDisplay() {
    const livesElement = document.getElementById("livesDisplay");
    if (livesElement) {
        livesElement.textContent = `Lives: ${lives}`;
    }
}

export function updateScoreDisplay() {
    const scoreElement = document.getElementById("scoreDisplay");
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}

export function restartBallPosition(canvasWidth, canvasHeight) {
  //  ball.x = canvasWidth / 2;
    ball.x = player.x + player.width / 2 - ball.width / 2;  // Center above player
    //ball.y = canvasHeight - ball.height - 80; //  ball starts above bottom ya aya :(
     ball.y = player.y - ball.height - 5; // Ball starts just above the player ya aya :(

    
     ball.velocityX = 0;
     ball.velocityY = 0;

    setTimeout(() => {
        ball.velocityX = ballVelocityX;
        ball.velocityY = ballVelocityY;
    }, 200);
}
