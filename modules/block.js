export const blockWidth = 80;
export const blockHeight = 22;
 export let blockColumns = 8;
export  let blockRows = 3;
export let blockArray = [];

export function createBlocks(difficulty) {
    console.log('====================================');
    console.log('Difficulty:', difficulty);  
    
    blockColumns = getColumnsByDifficulty(difficulty);
    blockRows = getRowsByDifficulty(difficulty);

    console.log('Columns:', blockColumns);
    console.log('Rows:', blockRows);

    blockArray = [];

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

    console.log(`Blocks Created: Rows=${blockRows}, Columns=${blockColumns}`);
}

export function getRowsByDifficulty(difficulty) {
    switch(difficulty) {
        case 'easy': return 8;
        case 'medium': return 12;
        case 'hard': return 15;
        default: return 8;
    }
}

export function getColumnsByDifficulty(difficulty) {
    switch(difficulty) {
        case 'easy': return 8;
        case 'medium': return 12;
        case 'hard': return 16;
        default: return 8;
    }
}

function createUniformGrid() {
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            blockArray.push(createBlock(c, r));
        }
    }
}

function createStaggeredGrid() {
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockColumns; c++) {
            const block = createBlock(c, r);

            const offsetX = (r % 2) * (blockWidth / 2 + 5);
            block.x += offsetX;

            if (r % 2 === 1 && c === blockColumns - 1) continue;

            blockArray.push(block);
        }
    }
}

function createCheckerboardGrid() {
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockColumns; c++) {
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
        hits: 0,
        color: r % 2 === 0 ? "#77dd77" : "#c19a6b" // Soft green & warm brown

    };
}
