/// ball
let ballwidth = 10;
let ballheight = 10;
let ballvelocityx = 3;
let ballvelocityy = 2;

let ball={
    x : boardwidth/2 ,
    y : boardheight/2 ,
    width : ballwidth,
    height : ballheight,
    velocityx : ballvelocityx,
    velocityy : ballvelocityy,
}



window.onload = function(){
    
    requestAnimationFrame(update); 
    

}
   


function update(){
    requestAnimationFrame(update); 
    context.clearRect(0,0,board.width,board.height); //clear board


    /// ball
    context.fillStyle ="white";
    ball.x = ball.x + ball.velocityx;
    ball.y = ball.y + ball.velocityy;  
    context.fillRect(ball.x,ball.y,ball.width,ball.height);  

    ///bounce ball off walls 
    if(ball.y <=0 ){ //ball touch top canvas
      ball.velocityy *=-1; //reverse y
    }
    else if(ball.x <= 0 ||(ball.x + ball.width) >= boardwidth ){ //touch left or right of canvas
      ball.velocityx *= -1; //reverse x
    }
    else if(ball.y + ball.height >= boardheight ){ 
        //gameover

    }


 /// bounce ball of player
 if(topCollision(ball,player) || bottomCollision(ball,player)){
  ball.velocityy *= -1;
 }else if(leftCollision(ball,player) ||rightCollision(ball,player)){
   ball.velocityx*= -1;
 }


 //blocks

 for (let i = 0; i < blockArray.length; i++) 
  {
    let block = blockArray[i];
    if (!block.break) {
        context.fillRect(block.x, block.y, block.width, block.height); // Draw the block

        // Check for collisions
        if (topCollision(ball, block) || bottomCollision(ball, block)) {
            ball.velocityy *= -1; // Reverse ball's vertical direction
            block.break = true; // Mark the block as broken
            blockCount -= 1; // Decrease the block count
        } else if (leftCollision(ball, block) || rightCollision(ball, block)) {
            ball.velocityx *= -1; // Reverse ball's horizontal direction
            block.break = true; // Mark the block as broken
            blockCount -= 1; // Decrease the block count
        }
    }

  }


}


function outOfBounds(xposition){
    return (xposition < 0 || xposition + playerwidth > boardwidth);
}

function movePlayer(e){
    if(e.code =="ArrowLeft"){
       // player.x -= player.velocityx;
       let nextplayerx = player.x - player.velocityx;
        if(!outOfBounds(nextplayerx))
        {
            player.x = nextplayerx;
        }
    }
    else if(e.code =="ArrowRight"){
       // player.x += player.velocityx;
       let nextplayerx = player.x + player.velocityx;
        if(!outOfBounds(nextplayerx))
        {
            player.x = nextplayerx;
        }
    }
}


function detectCollision(a,b)
{
    return a.x < b.x + b.width &&   // a top left corner dont reach b top right corner
           a.x + a.width > b.x &&   // a top right corner passes b top left corner 
           a.y < b.y + b.height &&  // a top left corner dont reach b bottom left corner 
           a.y +a.height > b.y ;    // a bottom left corner pass b top left corner 
}

function topCollision(ball,block){  // ball above block
  return detectCollision(ball,block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball,block){  // ball below block
    return detectCollision(ball,block) && (block.y + block.height) >= ball.y;
}

function leftCollision(ball,block){  // ball left block
    return detectCollision(ball,block) && (ball.x + ball.width) >= block.x;
}


function rightCollision(ball,block){  // ball right block
    return detectCollision(ball,block) && (block.x + block.width) >= ball.x;
}



