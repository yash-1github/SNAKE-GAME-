var callcanv = document.getElementById("canv");
var permission = callcanv.getContext("2d");
var ground = new Image( );
var direc , limit;
ground.src = "ground.png";
var foodimg = new Image();
foodimg.src ="food.png";
snake = [];
snake[0] = {x : (32*9) , y : (32*7)}

var food = {x: Math.round(Math.random()*17+1)*32 , y: Math.round(Math.random()*15+3)*32};
var score = 0;

document.addEventListener("keydown" , mouse);

function mouse(event){
//left to down in clockwise.....37, 38 ,39,40
if(event.keyCode === 37 && direc!== "right"){
direc = "left";
}else if(event.keyCode === 38 && direc!== "down"){
    direc = "up";
}else if(event.keyCode === 39 && direc !== "left"){
    direc = "right";
}else if(event.keyCode === 40 && direc!== "up"){
    direc = "down";
}

}

function collision(head, arr){
for(var i = 0; i<arr.length;i++ ){
    if(head.x === arr[i].x &&head.y === arr[i].y){
        return true;
        console.log("hit");
    }
}

}

function call(){
    
    permission.drawImage(ground , 0,0);
    permission.drawImage(foodimg , food.x , food.y);
    permission.font = "30px  ariel";
    permission.fillText("SCORE :: " +score ,9*32 ,50);

    for(var i =0; i<snake.length ; i++){
        permission.fillStyle = "black";
        permission.fillRect(snake[i].x , snake[i].y , 32,32);
    }
    //you can even use let for declaring a var

    let oldsnakex= snake[0].x;
    let oldsnakey = snake[0].y;
   

  
   if(direc === "left"){
       oldsnakex  -= 16;
   }else if(direc === "right"){
       oldsnakex +=16;
   }else if(direc === "up"){
       oldsnakey -=16;
   }else if(direc === "down"){
       oldsnakey += 16;
   }

   if(oldsnakex > 608){
       oldsnakex = 0;
   }
   if(oldsnakex < 0){
       oldsnakex = 608;
   }
   if(oldsnakey <0){
       oldsnakey = 608;
       }
    if(oldsnakey >608){
        oldsnakey = 0;
    }

   let newhead = { x :oldsnakex, y:oldsnakey};
   

   if(oldsnakex === food.x && oldsnakey === food.y){
    food = {x: Math.round(Math.random()*17+1)*32 , y: Math.round(Math.random()*15+3)*32};
    score +=  10;
   
   }else(snake.pop());

if(score % 50== 0){
    permission.fillText(" 🐍 i want food...🍲;" ,200,302 );
}

if(collision(newhead , snake)){
   clearInterval(variable);
   permission.fillText("OOPS..!!! THE 🐍 HAS TOUCHED ITSELF;" ,20,302 );
   permission.fillText("TRY AGAIN" ,200,340 );
   
}
snake.unshift(newhead);


}


 let variable = setInterval( call , 100);



