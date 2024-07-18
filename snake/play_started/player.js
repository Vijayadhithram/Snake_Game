var cellS = document.getElementsByClassName("cell");
var sbody = [{x:3 , y:4},{x:3 , y:3},{x:3 , y:2}];
const snake = 'snake';
const snakehead = 'snakehead';

// Set the total number of rows and columns
var speedX = 0;  //speed of snake in x coordinate.
var speedY = 0;  //speed of snake in Y coordinate.
var foodX
var foodY
let removeSnakeBody;

let lastRenderTime = 0;
const SNAKE_SPEED = 1;

 
var hdirection = [];
hdirection[0] = 'downhead';

let inputDirection = 0;
var lastInputDirection = 0;
var loopArray = 0;
var getDriectioncode;
var start = 0;



function main(currentTime) {
    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    
    // Assuming getInputDirection is defined somewhere in your code
    const getDriectioncode = getInputDirection();
    console.log(getDriectioncode);

    loop(getDriectioncode);
    
}
window.requestAnimationFrame(main)

 

function setupEventListener() {
    window.addEventListener('keydown', e => {
        console.log('key pressed:', e.key);
        switch (e.key) {
            case 'w':
                if(lastInputDirection[0] === 0 && lastInputDirection[1] === -1)
                break;
                else{
                inputDirection = upmovementArray();
                break;}
            case 's':
                if(lastInputDirection[0] === 0 && lastInputDirection[1] === 1)
                break;
                else{
                inputDirection = downmovementArray();
                break;}
            case 'a':
                if(lastInputDirection[0] === 1 && lastInputDirection[1] === 0)
                break;
                else{
                inputDirection = leftmovementArray();
                break;}
            case 'd':
                if(lastInputDirection[0] === -1 && lastInputDirection[1] === 0)
                break;
                else{
                inputDirection = rightmovementArray();
                break;}
            default:
                // Handle other keys if needed
        }
    });
}
 setupEventListener();


function getInputDirection(){
    lastInputDirection = inputDirection;
    return inputDirection
}

function upmovementArray(){
    loopArray = [0,1]
    return loopArray;
}

function downmovementArray(){
    loopArray = [0,-1]
    return loopArray;
}

function leftmovementArray(){
    loopArray = [-1,0]
    return loopArray;
}

function rightmovementArray(){
    loopArray = [1,0]
    return loopArray;
}
function loop(getDriectioncode) {
        if (getDriectioncode[0] === 0 && getDriectioncode[1] === 1) {
            upmovement();

        } else if (getDriectioncode[0] === 0 && getDriectioncode[1] === -1) {
            downmovement();
            
        } else if (getDriectioncode[0] === 1 && getDriectioncode[1] === 0) {
            rightmovement();
            
        } else if (getDriectioncode[0] === -1 && getDriectioncode[1] === 0) {
            leftmovement();
            
        }
}

//Creating the board W.R.T the number of peices and width of the boar
function CreateBoard(){
   var wb = 80/bsize;
   var snakeboard = document.querySelector('.container1');
   for (var i = 0; i < bsize; i++){
      for (var j = 0; j < bsize; j++) {
         var snakeSquare = document.createElement('div');
         snakeSquare.setAttribute("id",j+"/"+i);
         snakeSquare.className = 'cell';
         if ((i + j) % 2 == 0) {
            snakeSquare.className = 'twocell';
         }
         snakeboard.appendChild(snakeSquare);
      }
   }
   for (var i = 0; i < cellS.length; i++) {
    cellS[i].style.width = wb + 'vmin';
    cellS[i].style.height = wb + 'vmin';
   }
   var grid = document.querySelector('.container1');
   grid.style["grid-template-columns"] = "repeat("+bsize+", 1fr)";
   grid.style["grid-template-rows"] = "repeat("+bsize+", 1fr)";
}


function placeFood() {
    
    // in x coordinates.
    foodX = Math.floor(Math.random() * bsize); 
     
    //in y coordinates.
    foodY = Math.floor(Math.random() * bsize); 

    var playboard = document.querySelector('.container1');
    if (playboard) {
        var sf = `${foodX.toString()}/${foodY.toString()}`;
        let foodElement = document.getElementById(sf);
        if (foodElement) {
            foodElement.className= 'food';
            document.querySelector(".food").innerHTML = "*";
        } else {
            console.log('Element not found');
        }
    }
}



function draw(){
    if(start!=0){
    let drawsnake = document.getElementById(`${sbody[0].x.toString()}/${sbody[0].y.toString()}`);
    drawsnake.classList.add(snakehead);
    drawsnake.classList.add(hdirection[0]);
    drawsnake = document.getElementById(`${sbody[1].x.toString()}/${sbody[1].y.toString()}`);
    drawsnake.classList.remove(hdirection[1])
    drawsnake.classList.remove(snakehead)
    let i = 1;
    while (i < sbody.length) {
        let drawsnake = document.getElementById(`${sbody[i].x.toString()}/${sbody[i].y.toString()}`);
        drawsnake.classList.add(snake);
        i++;
    }
    hdirection[1] = hdirection[0]
    drawsnake = document.getElementById(removeSnakeBody)
    drawsnake.classList.remove(snake)
}
}


function upmovement(){
    hdirection[0] = 'uphead'
    let temp = sbody[0].y;
    
    sbody[0].y--;
    let n = sbody.length;
    removeSnakeBody = `${sbody[n-1].x.toString()}/${sbody[n-1].y.toString()}`;
    for(let i = n-1; i> 0 ; i--){
        sbody[i].y = sbody[i-1].y;
        sbody[i].x = sbody[i-1].x;
    }
    sbody[1].y = temp;
    console.log(sbody);
    draw();
}

function downmovement(){ 
    hdirection[0] = 'downhead'
    let temp = sbody[0].y;
    sbody[0].y++;
    let n = sbody.length;
    removeSnakeBody = `${sbody[n-1].x.toString()}/${sbody[n-1].y.toString()}`;
    for(let i = n-1; i> 0 ; i--){
        sbody[i].x = sbody[i-1].x;
        sbody[i].y = sbody[i-1].y;
    }
    sbody[1].y = temp;
    console.log(sbody);
    draw();
}

function rightmovement(){
    hdirection[0] = 'righthead'
    let temp = sbody[0].x;
    sbody[0].x++;
    let n = sbody.length;
    removeSnakeBody = `${sbody[n-1].x.toString()}/${sbody[n-1].y.toString()}`;
    for(let i = n-1; i> 0 ; i--){
        sbody[i].x = sbody[i-1].x;
        sbody[i].y = sbody[i-1].y;
    }
    sbody[1].x = temp;
    draw();
}

function leftmovement(){
    hdirection[0] = 'lefthead'
    let temp = sbody[0].x;
    sbody[0].x--;
    let n = sbody.length;
    removeSnakeBody = `${sbody[n-1].x.toString()}/${sbody[n-1].y.toString()}`;
    for(let i = n-1; i> 0 ; i--){
        sbody[i].x = sbody[i-1].x;
        sbody[i].y = sbody[i-1].y;
    }
    sbody[1].x = temp;
    draw();
}




window.onload = function(){
    // PromptForSize();
    
    document.getElementById('play').onclick = function(){
        bsize = document.getElementById("boardsize").value;
        pname = document.getElementById('name').value;
        if (bsize=='' || pname ==''){
            alert('!!!Enter Name and BoardSize!!!')
            window.location.reload()
        }
        document.getElementById("init_dialog").close()
        start = 1;
        CreateBoard();
        placeFood();
        draw();
    }
    document.getElementById("init_dialog").showModal()   
}