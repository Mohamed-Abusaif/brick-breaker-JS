// block.js
export const blockWidth = 50;
export const blockHeight = 10;
export const blockColumns = 8;
export let blockRows = 3;
export const blockMaxRows = 10;
export let blockArray = [];

export function createBlocks() {
    blockArray = [];
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            blockArray.push({
                x: 15 + c * blockWidth + c * 10,
                y: 45 + r * blockHeight + r * 10,
                width: blockWidth,
                height: blockHeight,
                break: false
            });
        }
    }
}