// player.js
export const playerVelocityX = 15;

export let player;

export function createPlayer(difficulty) {
    let playerWidth, playerHeight, playerColor;

    switch (difficulty) {
        case 'easy':
            playerWidth = 180;
            playerHeight = 20;
            playerColor = "#c19a6b"; // Warm brown
            break;
        case 'medium':
            playerWidth = 120;
            playerHeight = 20;
            playerColor = "#77dd77"; // Soft green
            break;
        case 'hard':
            playerWidth = 80;
            playerHeight = 20;
            playerColor = "#ff6961"; // Soft red
            break;
        default:
            playerWidth = 180;
            playerHeight = 20;
            playerColor = "#c19a6b"; // Default color
    }

    player = {
        x: 750 / 2 - playerWidth / 2,
        y: 750 - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX: playerVelocityX,
        color: playerColor,
    };

    return player;
}

export function movePlayer(e, boardWidth) {
    if (e.code === "ArrowLeft" && player.x > 0) {
        player.x -= player.velocityX;
    } else if (e.code === "ArrowRight" && player.x + player.width < boardWidth) {
        player.x += player.velocityX;
    }
}
