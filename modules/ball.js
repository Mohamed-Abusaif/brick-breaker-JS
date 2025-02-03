export const ballWidth = 15;
export const ballHeight = 15;
export const ballVelocityX = 3;
export const ballVelocityY = 2;

export let ball = {
    x: 500 / 2,
    y: 500 / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
};

export let lives = 3;
export let score = 0;

export function updateBall(canvasWidth, canvasHeight) {
    if (lives <= 0) return; // Prevent further actions if lives are zero or negative
    
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

export function restartGame() {
    lives = 3;
    score = 0;
    updateLivesDisplay();
    updateScoreDisplay();
    ball.x = 500 / 2;
    ball.y = 500 / 2;
    ball.velocityX = ballVelocityX;
    ball.velocityY = ballVelocityY;
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
    ball.x = canvasWidth / 2;
    ball.y = canvasHeight / 2;
    ball.velocityX = ballVelocityX;
    ball.velocityY = ballVelocityY;
}
