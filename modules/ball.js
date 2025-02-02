// ball.js
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

export function updateBall(canvasWidth, canvasHeight) {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Wall collision
    if (ball.x <= 0 || ball.x + ball.width >= canvasWidth) {
        ball.velocityX *= -1;
    }
    if (ball.y <= 0) {
        ball.velocityY *= -1;
    }
    if (ball.y + ball.height >= canvasHeight) {
        lose();
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
    ball.x = 500 / 2;
    ball.y = 500 / 2;
    ball.velocityX = ballVelocityX;
    ball.velocityY = ballVelocityY;
    document.getElementById("loseMessage").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
}
