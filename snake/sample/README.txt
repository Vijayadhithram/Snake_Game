
var cellS = document.getElementsByClassName("cell");
    


// Set the total number of rows and columns
var speedX = 0;  //speed of snake in x coordinate.
var speedY = 0;  //speed of snake in Y coordinate.

var blockSize = 25;
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;


var foodX = 10;
var foodY = 10;
var sf = `${foodX}/${foodY}`;

var blockSize = 25;





//Creating the board W.R.T the number of peices and width of the boar
function CreateBoard(){
   var wb = 80/bsize;
   var snakeboard = document.querySelector('.container1');
   for (var i = 0; i < bsize; i++){
      for (var j = 0; j < bsize; j++) {
         var snakeSquare = document.createElement('div');
         snakeSquare.setAttribute("id",i+"/"+j);
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
    foodX = Math.floor(Math.random() * bsize) * blockSize; 
     
    //in y coordinates.
    foodY = Math.floor(Math.random() * bsize) * blockSize; 

    var playboard = document.querySelector('.container1');
    if (playboard) {
        let foodElement = document.getElementById(sf);
        foodElement.className = 'food';
        document.querySelector(".food").innerHTML = "🔥";
    }
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
        CreateBoard();
        placeFood();
    }
    document.getElementById("init_dialog").showModal()   
}