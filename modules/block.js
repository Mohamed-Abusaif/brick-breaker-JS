// block.js
export const blockWidth = 80;
export const blockHeight = 15;
export const blockColumns = 8;
export let blockRows = 3;
export const blockMaxRows = 10;
export let blockArray = [];

// export function createBlocks() {
//     blockArray = [];
//     for (let c = 0; c < blockColumns; c++) {
//         for (let r = 0; r < blockRows; r++) {
//             blockArray.push({
//                 x: 15 + c * blockWidth + c * 10,
//                 y: 45 + r * blockHeight + r * 10,
//                 width: blockWidth,
//                 height: blockHeight,
//                 break: false
//             });
//         }
//     }
// }

export function createBlocks(difficulty) {
    blockArray = [];
    blockRows = getRowsByDifficulty(difficulty);

    switch(difficulty) {
        case 'easy':
            createUniformGrid();
            break;
        case 'medium':
            createStaggeredGrid();
            break;
        case 'hard':
            createCheckerboardGrid();
            break;
        default:
            createUniformGrid();
    }
}

function getRowsByDifficulty(difficulty) {
    switch(difficulty) {
        case 'easy': return 3;
        case 'medium': return 5;
        case 'hard': return 8;
        default: return 3;
    }
}

function createUniformGrid() {
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            blockArray.push(createBlock(c, r));
        }
    }
}

// function createStaggeredGrid() {
//     for (let r = 0; r < blockRows; r++) {
//         for (let c = 0; c < blockColumns; c++) {
//             // Offset every other row by half the column width
//             const offsetX = (r % 2) * (blockWidth / 2 + 5); // +5 for spacing
//             // Skip last column in odd rows to prevent overflow
//             if (r % 2 === 1 && c === blockColumns - 1) continue;
//             blockArray.push({
//                 x: 15 + c * (blockWidth + 10) + offsetX,
//                 y: 45 + r * (blockHeight + 10),
//                 width: blockWidth,
//                 height: blockHeight,
//                 break: false
//             });
//         }
//     }
// }

function createStaggeredGrid() {
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockColumns; c++) {
            // Use createBlock to inherit color logic
            const block = createBlock(c, r);
            
            // Apply staggered offset
            const offsetX = (r % 2) * (blockWidth / 2 + 5);
            block.x += offsetX;

            // Skip last column in odd rows to prevent overflow
            if (r % 2 === 1 && c === blockColumns - 1) continue;

            blockArray.push(block);
        }
    }
}

function createCheckerboardGrid() {
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockColumns; c++) {
            // Skip every other block in a checkerboard pattern
            if ((r + c) % 2 === 0) continue;
            blockArray.push(createBlock(c, r));
        }
    }
}


function createBlock(c, r) {
    return {
        x: 15 + c * (blockWidth + 10),
        y: 45 + r * (blockHeight + 10),
        width: blockWidth,
        height: blockHeight,
        //break: false,
        hits: 0,
        color: r % 2 === 0 ? "#B76E79" : "#9370DB" // Row-based color alternation
    };
}