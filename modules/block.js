export const blockWidth = 80;
export const blockHeight = 20;
export let blockColumns = 8;
export let blockRows = 3;
export let blockArray = [];

export function createBlocks(difficulty) {
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

    addRandomUnbreakableBlocks(); // Add unbreakable blocks randomly after grid is created

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
    return 8; // Columns remain the same across difficulties
}

function createUniformGrid() {
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            blockArray.push(createBlock(c, r, false));
        }
    }
}

function createStaggeredGrid() {
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockColumns; c++) {
            const block = createBlock(c, r, false);
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
            blockArray.push(createBlock(c, r, false));
        }
    }
}

function addRandomUnbreakableBlocks() {
    const numUnbreakable = Math.floor(Math.random() * (blockRows * blockColumns * 0.1)) + 3; // 3 to 10% of total blocks
    const positions = new Set();

    while (positions.size < numUnbreakable) {
        const col = Math.floor(Math.random() * blockColumns);
        const row = Math.floor(Math.random() * blockRows);
        positions.add(`${col},${row}`);
    }

    positions.forEach(pos => {
        const [col, row] = pos.split(',').map(Number);
        blockArray.push(createBlock(col, row, true));
    });
}

function createBlock(c, r, unbreakable) {
    return {
        x: 15 + c * (blockWidth + 10),
        y: 45 + r * (blockHeight + 10),
        width: blockWidth,
        height: blockHeight,
        hits: unbreakable ? -1 : 0,
        color: unbreakable ? 'black' : '#00ff90',
        borderRadius: 30,
    };
}
