// player.js
export const playerWidth = 120;
export const playerHeight = 20;
export const playerVelocityX = 10;

export let player = {
    x: 750 / 2 - playerWidth / 2,
    y: 750 - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX
};

export function movePlayer(e, boardWidth) {
    if (e.code === "ArrowLeft" && player.x > 0) {
        player.x -= player.velocityX;
    } else if (e.code === "ArrowRight" && player.x + player.width < boardWidth) {
        player.x += player.velocityX;
    }
}