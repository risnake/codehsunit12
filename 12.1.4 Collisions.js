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

/* Variables for ball, paddle, and bricks */
let paddle;
let ball;
let ballSpeedX = 5;
let ballSpeedY = 5;
let bricks = [];

function main() {
    drawBricks();
    setupPaddleAndBall();
    setTimer(moveBall, 50);
}

function getBrickColor(rowIndex) {
    const colorCycle = ["red", "red", "orange", "orange", "green", "green", "blue", "blue"];
    return colorCycle[rowIndex % colorCycle.length];
}

function drawBrick(x, y, color) {
    const brick = new Rectangle(BRICK_WIDTH, BRICK_HEIGHT);
    brick.setPosition(x, y);
    brick.setColor(color);
    add(brick);
    bricks.push(brick);
}

function drawBrickRow(rowIndex) {
    const y = BRICK_TOP_OFFSET + rowIndex * (BRICK_HEIGHT + BRICK_SPACING);
    const color = getBrickColor(rowIndex);
    for (let i = 0; i < NUM_BRICKS_PER_ROW; i++) {
        const x = BRICK_SPACING + i * (BRICK_WIDTH + BRICK_SPACING);
        drawBrick(x, y, color);
    }
}

function drawBricks() {
    for (let i = 0; i < NUM_ROWS; i++) {
        drawBrickRow(i);
    }
}

function setupPaddleAndBall() {
    /* Create the paddle */
    paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
    paddle.setPosition(getWidth() / 2 - PADDLE_WIDTH / 2, getHeight() - PADDLE_HEIGHT - PADDLE_OFFSET);
    paddle.setColor(Color.BLACK);
    add(paddle);

    /* Create the ball */
    ball = new Circle(BALL_RADIUS);
    ball.setPosition(getWidth() / 2, getHeight() / 2);
    ball.setColor(Color.RED);
    add(ball);

    /* Set up mouse callback */
    mouseMoveMethod(movePaddle);
}

function movePaddle(event) {
    let mouseX = event.getX();
    let paddleX = mouseX - PADDLE_WIDTH / 2;
    paddle.setPosition(paddleX, getHeight() - PADDLE_HEIGHT - PADDLE_OFFSET);
}

const BALL_SPEED_FACTOR = 0.8; // Adjust this value between 0 and 1 as needed

function moveBall() {
    let ballX = ball.getX();
    let ballY = ball.getY();

    /* Check for wall collisions */
    if (ballX < BALL_RADIUS || ballX > getWidth() - BALL_RADIUS) {
        ballSpeedX = -ballSpeedX; // Reverse horizontal direction
    }
    if (ballY < BALL_RADIUS) {
        ballSpeedY = -ballSpeedY; // Reverse vertical direction
    } else if (ballY > getHeight() - BALL_RADIUS) {
        /* Handle ball going off the bottom of the screen */
        resetBall();
    }

    /* Check for brick collisions */
    for (let i = bricks.length - 1; i >= 0; i--) {
        const brick = bricks[i];
        if (ball.getX() + BALL_RADIUS > brick.getX() &&
            ball.getX() - BALL_RADIUS < brick.getX() + BRICK_WIDTH &&
            ball.getY() + BALL_RADIUS > brick.getY() &&
            ball.getY() - BALL_RADIUS < brick.getY() + BRICK_HEIGHT) {
            ballSpeedY = -ballSpeedY; // Reverse vertical direction
            remove(brick);
            bricks.splice(i, 1); // Remove the brick from the array
        }
    }

    /* Check for paddle collision */
    if (isColliding(ball, paddle)) {
        ballSpeedY = -ballSpeedY; // Reverse vertical direction
    }

    /* Move the ball */
    ball.move(ballSpeedX, ballSpeedY);
}

function resetBall() {
    ball.setPosition(getWidth() / 2, getHeight() / 2);
    ballSpeedX = 5;
    ballSpeedY = 5;
}

function isColliding(obj1, obj2) {
    const obj1Left = obj1.getX() - obj1.getWidth() / 2;
    const obj1Right = obj1.getX() + obj1.getWidth() / 2;
    const obj1Top = obj1.getY() - obj1.getHeight() / 2;
    const obj1Bottom = obj1.getY() + obj1.getHeight() / 2;

    const obj2Left = obj2.getX() - obj2.getWidth() / 2;
    const obj2Right = obj2.getX() + obj2.getWidth() / 2;
    const obj2Top = obj2.getY() - obj2.getHeight() / 2;
    const obj2Bottom = obj2.getY() + obj2.getHeight() / 2;

    return (
        obj1Right > obj2Left &&
        obj1Left < obj2Right &&
        obj1Bottom > obj2Top &&
        obj1Top < obj2Bottom
    );
}

main();
