const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
//Handles interval of the browser
let speed = 8;

let tileCount = 20; // 20 boxes for X and Y axis
let tileSize = 18; 

/* coordinates of the snake */
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 0;

/* coordinates of the food */
let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

/*              Sounds               */
const sounds = new Audio('eating.mp3')
const endSound = new Audio('game-ovah.mp3')

// Main Rendering Function
function drawGame(){
    changeSnakePosition()
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    checkAppleCollision()
    drawApple()
    drawSnake();
    drawScore(); 

   
    setTimeout(drawGame, 1000/speed);
}

function isGameOver(){
    let gameOver = false;
    
    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }
    if(headX < 0){ // if snake bump on the left 
        gameOver = true;
    }

    else if(headX === tileCount){ // if snake bump on the right 
        gameOver = true;
    }

    else if( headY < 0){ // if snake bump on the top
        gameOver = true;
    } 
    else if(headY === tileCount){ // if snake bump at the bottom
        gameOver = true;
    }


    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y ===headY){
            gameOver = true;
            break;
        }
    }
    
    if (gameOver){
        ctx.fillStyle = 'white'
        ctx.font = '20px Verdana'

        ctx.fillText(`Game Over! Your Score is: ${score}`, canvas.width / 6.5, canvas.height / 2)
        endSound.play();
    }

    return gameOver;

}

function drawScore(){
    ctx.fillStyle = 'white'
    ctx.font = '15px Verdana'
    ctx.fillText('Score: ' + score, 10, 20)
} 
 
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height)
}

function drawSnake(){
    
    ctx.fillStyle = 'green'
    for(let i = 0; i < snakeParts.length; i++){
         let part = snakeParts[i]; // get part on the array
         ctx.fillRect (part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY)) //put item at the end of the list next to head
    if(snakeParts.length > tailLength){
    snakeParts.shift();
    }
    
    ctx.fillStyle = '#7cfc00';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);

}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

// Food of the Snake
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)

}
/*          SNAKE AND FOOD WILL NOT COLLIDE           */
function checkAppleCollision(){
    if( appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++;
        score++;
        sounds.play();
    }
}

/*                  APPEND EVENT TO THE BODY                    */
document.body.addEventListener('keydown', keyDown);

function keyDown(e){
    
    //up
    if(e.keyCode == 38){
        if( yVelocity == 1) // stop from moving opposite direction
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(e.keyCode == 40){
        if( yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(e.keyCode == 37){
        if( xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(e.keyCode == 39){
        if( xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}



drawGame();

/*                 Buttons of the Game                  */

function startGame() {
    window.location.href='index.html';
}

function resetGame() {
    window.location.href='index.html';
}

function backGame() {
    window.location.href='index1.html';
}

