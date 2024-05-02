/* Constants for bricks */
const NUM_ROWS = 8;
const BRICK_TOP_OFFSET = 10;
const BRICK_SPACING = 2;
const NUM_BRICKS_PER_ROW = 10;
const BRICK_HEIGHT = 10;
const SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
const BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;

/* Constants for ball and paddle */
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 15;
const PADDLE_OFFSET = 10;

const BALL_RADIUS = 15;

function main() {
	drawBricks();
}

function getBrickColor(rowIndex) {
    const colorCycle = ["red","red",'orange',"orange",'green','green',"blue","blue"];
    return colorCycle[rowIndex % colorCycle.length];
}

function drawBrick(x,y,color){
    const brick = new Rectangle(BRICK_WIDTH,BRICK_HEIGHT);
    brick.setPosition(x,y);
    brick.setColor(color);
    add(brick);
}

function drawBrickRow(rowIndex){
    const y = BRICK_TOP_OFFSET + rowIndex * (BRICK_HEIGHT + BRICK_SPACING);
    const color = getBrickColor(rowIndex);
    for (let i = 0; i < NUM_BRICKS_PER_ROW; i++){
        const x = BRICK_SPACING + i * (BRICK_WIDTH + BRICK_SPACING);
        drawBrick(x,y,color)
    }
}

function drawBricks() {
    for (let i = 0; i < NUM_ROWS; i++){
        drawBrickRow(i);
    }
}
main();
