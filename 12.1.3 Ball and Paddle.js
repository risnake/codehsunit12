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
let paddle;
let ball;
let ballSpeedX = 5;
let ballSpeedY = 5;

function main() {
	paddle = new Rectangle(PADDLE_WIDTH,PADDLE_HEIGHT);
	paddle.setPosition(getWidth()/2 - PADDLE_WIDTH/2, getHeight() - PADDLE_HEIGHT - PADDLE_OFFSET);
	paddle.setColor("black");
	add(paddle);
	
	ball = new Circle(BALL_RADIUS);
	ball.setPosition(getWidth()/2,getHeight()/2);
	ball.setColor("red");
	add(ball);
	
	mouseMoveMethod(movePaddle);
	setTimer(moveBall,30);
}

function movePaddle(e) {
    let mouseX = e.getX();
    let paddleX = mouseX - PADDLE_WIDTH / 2;
    paddle.setPosition(paddleX , getHeight() - PADDLE_HEIGHT - PADDLE_OFFSET);
}

function moveBall(){
    let ballX = ball.getX();
    let ballY = ball.getY();
    
    if (ballX < 0 || ballX > getWidth() - BALL_RADIUS){
        ballSpeedX = -ballSpeedX;
    }
    if (ballY < BALL_RADIUS){
        ballSpeedY = -ballSpeedY;
    } else if (ballY > getHeight() - BALL_RADIUS){
        resetBall();
    }
    ball.move(ballSpeedX,ballSpeedY);
}

function resetBall() {
    ball.setPosition(getWidth() / 2, getHeight() / 2);
    ballSpeedX = 5;
    ballSpeedY = 5;
}

main();
